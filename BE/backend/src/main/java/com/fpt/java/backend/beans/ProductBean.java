package com.fpt.java.backend.beans;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductBean {
    private Integer id;
    private String name;
    private String flavor;
    private String ingredients;
    private String descriptions;
    private Integer quantity;
    private Double price;
    private Boolean active;
    private Integer categoryId;
    private List<MultipartFile> images;
}
