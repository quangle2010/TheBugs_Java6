package com.fpt.java.backend.resp;


import java.util.ArrayList;

import com.fpt.java.backend.dto.OrderDTO;
import com.fpt.java.backend.dto.OrderStatusDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private ArrayList<OrderDTO> orderDTOs;
    private ArrayList<OrderStatusDTO> statusDTOs;

    
}
