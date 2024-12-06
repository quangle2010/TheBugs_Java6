package com.fpt.java.backend.service;

import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.fpt.java.backend.dto.OrderStatusDTO;
import com.fpt.java.backend.entities.OrderStatus;
import com.fpt.java.backend.repository.OrderStatusJPA;
import com.fpt.java.backend.mapper.OrderMapper;

@Service
public class OrderStatusService {

    private final OrderStatusJPA orderStatusJPA;

    public OrderStatusService(OrderStatusJPA orderStatusJPA) {
        this.orderStatusJPA = orderStatusJPA;

    }

    public ArrayList<OrderStatusDTO> getAllOrderStatus() {
        ArrayList<OrderStatus> orderStatus = (ArrayList<OrderStatus>) orderStatusJPA.findAll();
        return orderStatus.stream()
                .map(OrderMapper.INSTANCE::toStatusDTO)
                .collect(Collectors.toCollection(ArrayList::new));
    }

}
