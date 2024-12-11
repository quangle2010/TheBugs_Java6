package com.fpt.java.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.fpt.java.backend.resp.ProductResponse;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.CategoryService;
import com.fpt.java.backend.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/products")
    public ResponseEntity<ResponseData> getAllProduct() {
        try {
            return ResponseEntity.ok(new ResponseData(true, "pass",
                    new ProductResponse(productService.gettAllProductActiveAndCategoryActive(),
                            categoryService.getAllCategory())));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

}
