package com.fpt.java.backend.service;

import org.springframework.stereotype.Service;
import com.fpt.java.backend.dto.CartDTO;
import com.fpt.java.backend.entities.Cart;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.mapper.CartMapper;

import com.fpt.java.backend.repository.UserJPA;

@Service
public class CartService {
    private final UserJPA userJPA;
    private final CartMapper cartMapper;

    public CartService(UserJPA userJPA, CartMapper cartMapper) {
        this.userJPA = userJPA;
        this.cartMapper = cartMapper;
    }

    public CartDTO getCartDetails(String username) {
        User user = userJPA.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user"));
        Cart cart = user.getCart();
        if (cart == null) {
            throw new RuntimeException("Không tìm thấy giỏ hàng cho người dùng: " + username);
        }
        return cartMapper.toDTO(cart);
    }

}
