package com.fpt.java.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fpt.java.backend.dto.CategoryDTO;
import com.fpt.java.backend.entities.Category;
import com.fpt.java.backend.repository.CategoryJPA;
import com.fpt.java.backend.mapper.CategoryMapper;

@Service
public class CategoryService {
    
    private final CategoryJPA categoryJPA;


    public CategoryService(CategoryJPA categoryJPA) {
        this.categoryJPA = categoryJPA;
    }

    public ArrayList<CategoryDTO> getAllCategory() {
        ArrayList<Category> categories = (ArrayList<Category>) categoryJPA.findAll();
        return categories.stream()
                .map(CategoryMapper.INSTANCE::toDTO)
                .sorted(Comparator.comparing(CategoryDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public Category save(Category category) {
        Optional<Category> existingCategory = categoryJPA.findByNameExist(category.getId(), category.getName());
        if (existingCategory.isPresent()) {
            throw new IllegalArgumentException("Tên loại sản phẩm đã tồn tại.");
        }
        return categoryJPA.save(category);
    }

    public Category delete(Integer id) {
        Optional<Category> optCategory = categoryJPA.findById(id);
        if (!optCategory.isPresent()) {
            throw new IllegalArgumentException("Danh mục không tồn tại.");
        }
        optCategory.get().setActive(false);
        return  categoryJPA.save(optCategory.get());
    }
}
