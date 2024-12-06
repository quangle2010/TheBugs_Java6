package com.fpt.java.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

    private Integer userId;
    private List<CartItemDTO> cartItemDTOs;
    private Double total;
}
