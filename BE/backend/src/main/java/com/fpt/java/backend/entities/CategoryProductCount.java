package com.fpt.java.backend.entities;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CategoryProductCount {
	private String categoryName;
    private Long totalProducts;
}