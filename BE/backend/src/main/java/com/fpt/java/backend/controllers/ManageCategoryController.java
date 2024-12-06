package com.fpt.java.backend.controllers;

import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.CategoryBean;
import com.fpt.java.backend.entities.Category;
import com.fpt.java.backend.mapper.CategoryMapper;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.CategoryService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/admin/api/categories")
public class ManageCategoryController {

    private final CategoryService categoryService;

    public ManageCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseData> findAll() {
        try {
            return ResponseEntity.ok(new ResponseData(true, "Load danh sách loại sản phẩm thành công",
                    categoryService.getAllCategory()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseData> saveCategory(@RequestBody @Valid CategoryBean categoryBean,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                String errorMessages = result.getAllErrors().stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .collect(Collectors.joining(", "));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseData(false, errorMessages, null));
            }
            Category category = new Category();
            category.setId(categoryBean.getId());
            category.setName(categoryBean.getName());
            category.setActive(categoryBean.getActive());
            Category savedCategory = categoryService.save(category);
            return ResponseEntity.ok(new ResponseData(true, "Danh mục đã được lưu thành công", CategoryMapper.INSTANCE.toDTO(savedCategory)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }

    }

    @PostMapping("/delete")
    public ResponseEntity<ResponseData> delete(@RequestParam Integer id) {
        try {
            Category deletedCategory = categoryService.delete(id);
            return ResponseEntity.ok(new ResponseData(true, "Đã xóa thành công danh mục", CategoryMapper.INSTANCE.toDTO(deletedCategory)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

}
