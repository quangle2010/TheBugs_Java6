package com.fpt.java.backend.resp;

import java.util.List;

import com.fpt.java.backend.entities.Comment;
import com.fpt.java.backend.entities.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailResponse {
    private Product productInfo;
    private List<Comment> comments;
}
