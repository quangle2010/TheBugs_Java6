package com.fpt.java.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.fpt.java.backend.beans.ConfirmOrderBean;
import com.fpt.java.backend.dto.OrderDTO;
import com.fpt.java.backend.entities.CartItem;
import com.fpt.java.backend.entities.Order;
import com.fpt.java.backend.entities.OrderDetail;
import com.fpt.java.backend.entities.OrderStatus;
import com.fpt.java.backend.entities.Product;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.repository.CartItemJPA;
import com.fpt.java.backend.repository.OrderDetailJPA;
import com.fpt.java.backend.repository.OrderJPA;
import com.fpt.java.backend.repository.OrderStatusJPA;
import com.fpt.java.backend.repository.ProductJPA;
import com.fpt.java.backend.repository.UserJPA;
import com.fpt.java.backend.mapper.OrderMapper;

@Service
public class OrderService {

    private final OrderJPA orderJPA;
    private final ProductJPA productJPA;
    private final OrderStatusJPA orderStatusJPA;
    private final OrderDetailJPA orderDetailJPA;
    private final CartItemJPA cartItemJPA;
    private final UserJPA userJPA;
    private final OrderMapper orderMapper;

    public OrderService(OrderJPA orderJPA, ProductJPA productJPA, OrderStatusJPA orderStatusJPA,
            OrderDetailJPA orderDetailJPA, CartItemJPA cartItemJPA, UserJPA userJPA, OrderMapper orderMapper) {
        this.orderJPA = orderJPA;
        this.productJPA = productJPA;
        this.orderStatusJPA = orderStatusJPA;
        this.orderDetailJPA = orderDetailJPA;
        this.cartItemJPA = cartItemJPA;
        this.userJPA = userJPA;
        this.orderMapper = orderMapper;
    }

    public ArrayList<OrderDTO> getAllOrder() {
        ArrayList<Order> orders = (ArrayList<Order>) orderJPA.findAll();
        return orders.stream()
                .map(OrderMapper.INSTANCE::toDTO)
                .sorted(Comparator.comparing(OrderDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public OrderDTO updatePaymentById(String id, boolean paymentMethod) {

        try {
            int ids = Integer.parseInt(id);
            Optional<Order> order = orderJPA.findById(ids);
            order.get().setPaymentMethod(paymentMethod);
            return orderMapper.toDTO(orderJPA.save(order.get()));
        } catch (Exception e) {
            return new OrderDTO();
        }
    }

    public Order save(ConfirmOrderBean confirmOrderBean) {
        Order order = orderJPA.findById(confirmOrderBean.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy order"));

        OrderStatus orderStatus = orderStatusJPA.findById(confirmOrderBean.getStatus())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy order"));

        if (order.getOrderStatus().getId() == 2) {
            throw new IllegalStateException("Đơn hàng đã bị hủy, không thể thay đổi trạng thái.");
        }
        if (!checkStatus(order, confirmOrderBean.getStatus())) {
            throw new IllegalStateException("Trạng thái không hợp lệ để thay đổi.");
        }
        order.setOrderStatus(orderStatus);
        orderJPA.save(order);
        if (order.getOrderStatus().getId() == 3) {
            boolean sufficientStock = true;
            ArrayList<String> nameproduct = new ArrayList<>();
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = orderDetail.getProduct();
                int newQuantity = product.getQuantity() - orderDetail.getQuantity();
                if (newQuantity < 0) {
                    sufficientStock = false;
                    nameproduct.add(product.getName());
                }
            }

            if (sufficientStock) {
                for (OrderDetail orderDetail : order.getOrderDetails()) {
                    Optional<Product> optProduct = productJPA.findById(orderDetail.getProduct().getId());
                    if (optProduct.isPresent()) {
                        Product product = optProduct.get();
                        int newQuantity = product.getQuantity() - orderDetail.getQuantity();
                        product.setQuantity(newQuantity);
                        productJPA.save(product);
                    }
                }
            } else {
                order.setOrderStatus(orderStatusJPA.findById(1).get());
                orderJPA.save(order);
                throw new IllegalArgumentException(
                        "Số lượng sản phẩm " + String.join(", ", nameproduct) + " không đủ trong kho.");
            }
        }
        return order;

    }

    private boolean checkStatus(Order order, Integer newStatusId) {
        if (order.getOrderStatus().getId() == 1 && (newStatusId == 2 || newStatusId == 3)) {
            return true; // Chờ duyệt -> Đã duyệt
        } else if (order.getOrderStatus().getId() == 3 && newStatusId == 4) {
            return true; // Đã duyệt -> Đã giao
        } else if (order.getOrderStatus().getId() == 4 && newStatusId == 5) {
            return true; // Đã giao -> Đã nhận
        }
        return false;
    }

    public OrderDTO ordered(String username, Order order) {
        User user = userJPA.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user"));
        order.setUser(user);
        order.setCreateAt(new Date());
        order.setOrderStatus(orderStatusJPA.findById(1)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy orderStatus")));

        Order saveOrdered = orderJPA.save(order);
        List<CartItem> cartItems = user.getCart().getCartItems();
        for (CartItem cartItem : cartItems) {
            OrderDetail orderDetail = new OrderDetail();
            Product product = productJPA.findById(cartItem.getProduct().getId())
                    .orElseThrow(() -> new IllegalArgumentException("không tìm thấy product"));
            orderDetail.setOrder(saveOrdered);
            orderDetail.setProduct(product);
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setPrice(product.getPrice());
            orderDetailJPA.save(orderDetail);
            cartItemJPA.delete(cartItem);
        }
        return orderMapper.toDTO(saveOrdered);
    }

    public ArrayList<OrderDTO> getOrderUser(String username) {
        User user = userJPA.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("không tìm thấy user"));

        List<Order> orders = user.getOrders();

        return orders.stream()
                .map(orderMapper::toDTO)
                .sorted(Comparator.comparing(OrderDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

}
