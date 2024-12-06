package com.fpt.java.backend.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    private String name;
    private int quantity;
    private Double price;
    private String flavor;
    private String descriptions;
    private String ingredients;
    private Boolean active;
    private Integer categoryId;
    private List<ImagesDTO> images = new ArrayList<>();
}
