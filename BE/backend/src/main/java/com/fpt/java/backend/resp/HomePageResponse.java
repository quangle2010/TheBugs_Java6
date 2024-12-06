package com.fpt.java.backend.resp;

import com.fpt.java.backend.dto.CommentDTO;
import com.fpt.java.backend.dto.ProductDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HomePageResponse {
    private ArrayList<ProductDTO> newProducts;
    private ArrayList<ProductDTO> specialProducts;
    private ProductDTO producMaxId;
    private ArrayList<CommentDTO> userComments;
}
