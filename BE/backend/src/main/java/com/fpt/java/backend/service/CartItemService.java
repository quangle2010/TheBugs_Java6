package com.fpt.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.fpt.java.backend.dto.CartItemDTO;
import com.fpt.java.backend.entities.CartItem;
import com.fpt.java.backend.entities.Product;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.mapper.CartItemMapper;
import com.fpt.java.backend.repository.CartItemJPA;
import com.fpt.java.backend.repository.ProductJPA;
import com.fpt.java.backend.repository.UserJPA;

@Service
public class CartItemService {

    private final UserJPA userJPA;
    private final CartItemJPA cartItemJPA;
    private final ProductJPA productJPA;
    private final CartItemMapper cartItemMapper;

    public CartItemService(UserJPA userJPA, CartItemMapper cartItemMapper, CartItemJPA cartItemJPA,
            ProductJPA productJPA) {
        this.userJPA = userJPA;
        this.cartItemMapper = cartItemMapper;
        this.cartItemJPA = cartItemJPA;
        this.productJPA = productJPA;
    }

    public CartItemDTO updateCart(Integer cartItemId, Integer quantity) {
        CartItem cartItem = cartItemJPA.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy CartItem"));
        Product product = productJPA.findById(cartItem.getProduct().getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Không tìm thấy sản phẩm với ID: " + cartItem.getProduct().getId()));

        if (product.getQuantity() < quantity) {
            throw new IllegalArgumentException("Số lượng sản phẩm không đủ để thêm vào giỏ hàng.");
        }

        if (quantity <= 1) {
            cartItem.setQuantity(1);
        } else {
            cartItem.setQuantity(quantity);
        }
        return cartItemMapper.toDTO(cartItemJPA.save(cartItem));
    }

    public CartItemDTO addToCart(String username, Integer productId, Integer quantity) {

        User user = userJPA.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user: " + username));
        List<CartItem> cartItems = user.getCart().getCartItems();

        Product product = productJPA.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm với ID: " + productId));

        if (product.getQuantity() < quantity) {
            throw new IllegalArgumentException("Số lượng sản phẩm trong kho không đủ để thêm vào giỏ hàng.");
        }

        CartItem cartItem = cartItems.stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setCart(user.getCart());
        }
        return cartItemMapper.toDTO(cartItemJPA.save(cartItem));
    }

    public CartItemDTO remove(Integer id) {
        CartItem cartItem = cartItemJPA.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy CartItem"));
        cartItemJPA.delete(cartItem);
        return cartItemMapper.toDTO(cartItem);
    }

}
