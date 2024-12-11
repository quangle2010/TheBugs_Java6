package com.fpt.java.backend.dto;

import java.util.ArrayList;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Integer id;
    private String fullName;
    private String phone;
    private String address;
    private Date createAt;
    private Double total;
    private boolean paymentMethod;
    private ArrayList<OrderDetailDTO> orderDetails;
    private OrderStatusDTO orderStatus;
}
