package com.fpt.java.backend.mapper;

import java.util.ArrayList;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.fpt.java.backend.dto.OrderDTO;
import com.fpt.java.backend.dto.OrderDetailDTO;
import com.fpt.java.backend.dto.OrderStatusDTO;
import com.fpt.java.backend.entities.Order;
import com.fpt.java.backend.entities.OrderDetail;
import com.fpt.java.backend.entities.OrderStatus;
import com.fpt.java.backend.entities.Product;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "orderStatus.id", target = "orderStatus.id")
    @Mapping(target = "total", expression = "java(calculateTotal(order))")
    OrderDTO toDTO(Order order);

    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product", target = "productImage", qualifiedByName = "mapFirstImageName")
    OrderDetailDTO toDTO(OrderDetail orderDetail);

    @Named("mapFirstImageName")
    default String mapFirstImageName(Product product) {
        if (product != null && product.getImages() != null && !product.getImages().isEmpty()) {
            return product.getImages().get(0).getName();
        }
        return null;
    }

    OrderStatusDTO toStatusDTO(OrderStatus orderStatus);

    ArrayList<OrderDetailDTO> toDetailDTOList(ArrayList<OrderDetail> orderDetails);

    default Double calculateTotal(Order order) {
        return order.getOrderDetails().stream()
                .mapToDouble(detail -> detail.getPrice() * detail.getQuantity())
                .sum();
    }

}