package com.fpt.java.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.fpt.java.backend.dto.CartDTO;
import com.fpt.java.backend.entities.Cart;

@Mapper(componentModel = "spring", uses = CartItemMapper.class)
public interface CartMapper {

    @Mapping(target = "cartItemDTOs", source = "cartItems")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "total", expression = "java(calculateTotal(cart))")
    CartDTO toDTO(Cart cart);

    default Double calculateTotal(Cart cart) {
        return cart.getCartItems().stream()
                .mapToDouble(cartItem -> cartItem.getQuantity() * cartItem.getProduct().getPrice())
                .sum();
    }
}
