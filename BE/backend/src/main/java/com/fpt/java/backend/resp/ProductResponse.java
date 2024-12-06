package com.fpt.java.backend.resp;

import java.util.ArrayList;

import com.fpt.java.backend.dto.CategoryDTO;
import com.fpt.java.backend.dto.ProductDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private ArrayList<ProductDTO> products;
    private ArrayList<CategoryDTO> categories;
}
