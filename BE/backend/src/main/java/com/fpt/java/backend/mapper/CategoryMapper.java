package com.fpt.java.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.fpt.java.backend.dto.CategoryDTO;
import com.fpt.java.backend.entities.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);
    CategoryDTO toDTO(Category category);
}
