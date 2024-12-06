package com.fpt.java.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.fpt.java.backend.dto.CartItemDTO;

import com.fpt.java.backend.entities.CartItem;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    @Mapping(target = "productDTO", source = "product")
    CartItemDTO toDTO(CartItem cartItem);

}
