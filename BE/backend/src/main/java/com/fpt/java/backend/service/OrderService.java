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

    public Order save(ConfirmOrderBean confirmOrderBean) {
        Optional<Order> opOrder = orderJPA.findById(confirmOrderBean.getId());
        if (!opOrder.isPresent()) {
            throw new IllegalArgumentException("Không tìm thấy order!");
        }
        Order order = opOrder.get();
        if (order.getOrderStatus().getId() == 2) {
            return order;
        }
        Optional<OrderStatus> opOrderStatus = orderStatusJPA.findById(confirmOrderBean.getStatus());
        if (!opOrderStatus.isPresent()) {
            throw new IllegalArgumentException("Không tìm thấy orderStatus!");
        }
        order.setOrderStatus(opOrderStatus.get());
        orderJPA.save(order);
        if (order.getOrderStatus().getId() >= 3) {
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

    public OrderDTO ordered(String username, Order order) {
        User user = userJPA.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user"));

        Order ordered = new Order();
        ordered.setUser(user);

        ordered.setFullName(order.getFullName());
        ordered.setPhone(order.getPhone());
        ordered.setAddress(order.getAddress());

        ordered.setCreateAt(new Date());
        ordered.setOrderStatus(orderStatusJPA.findById(1)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy orderStatus")));
        Order saveOrdered = orderJPA.save(ordered);
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
