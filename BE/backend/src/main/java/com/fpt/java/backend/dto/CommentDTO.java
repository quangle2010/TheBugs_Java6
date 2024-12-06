package com.fpt.java.backend.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Integer id;
    private Integer productId;
    private String noted;
    private Date createAt;
    private Date updateAt;
    private Integer userId;
    private String author;
}
