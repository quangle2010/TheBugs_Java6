package com.fpt.java.backend.mapper;

import com.fpt.java.backend.dto.OrderStatusDTO;
import com.fpt.java.backend.entities.OrderStatus;

public class OrderStatusMapper {
    public static OrderStatusDTO convertToDTO(OrderStatus orderStatus) {
        return new OrderStatusDTO(
            orderStatus.getId(),
            orderStatus.getStatus()
        );
    }
}
