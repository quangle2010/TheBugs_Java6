package com.fpt.java.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController

public class ProductDetailController {
    private final ProductService productService;

    public ProductDetailController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/product-detail")
    public ResponseEntity<ResponseData> getProduct(@RequestParam Integer id) {
        try {
            return ResponseEntity.ok(new ResponseData(true, "Load thành công", productService.findById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }

    }

}
