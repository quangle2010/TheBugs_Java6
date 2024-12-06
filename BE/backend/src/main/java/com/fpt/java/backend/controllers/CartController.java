package com.fpt.java.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.dto.CartItemDTO;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.CartItemService;
import com.fpt.java.backend.service.CartService;
import com.fpt.java.backend.utils.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/user/cart")
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;
    private final JwtUtil jwtUtil;

    public CartController(CartService cartService, CartItemService cartItemService, JwtUtil jwtUtil) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseData> pageCart(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.startsWith("Bearer ")
                    ? authorizationHeader.substring(7)
                    : authorizationHeader;
            String username = jwtUtil.extractUsername(token);
            return ResponseEntity.ok(new ResponseData(true, "Load cart user",
                    cartService.getCartDetails(username)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/update-to-cart")
    public ResponseEntity<ResponseData> updateCartItem(@RequestParam Integer cartItemId,
            @RequestParam Integer quantity) {
        try {
            return ResponseEntity.ok(new ResponseData(true,
                    "update cart user", cartItemService.updateCart(cartItemId, quantity)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity<ResponseData> addCartItem(@RequestHeader("Authorization") String authorizationHeader,
            @RequestParam Integer productId,
            @RequestParam Integer quantity) {
        try {
            String token = authorizationHeader.startsWith("Bearer ")
                    ? authorizationHeader.substring(7)
                    : authorizationHeader;
            String username = jwtUtil.extractUsername(token);
            CartItemDTO addCartItem = cartItemService.addToCart(username, productId, quantity);
            return ResponseEntity.ok(new ResponseData(true,
                    "Sản phẩm được thêm vào giỏ", addCartItem));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<ResponseData> deleteCartItem(@RequestParam Integer id) {
        try {
            CartItemDTO deletedItem = cartItemService.remove(id);
            return ResponseEntity.ok(new ResponseData(true,
                    "delete cartitem user", deletedItem));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

}
