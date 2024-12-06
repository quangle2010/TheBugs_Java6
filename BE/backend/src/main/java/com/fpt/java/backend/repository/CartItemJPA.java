package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemJPA extends JpaRepository<CartItem,Integer> {
    @Query("SELECT c FROM CartItem c WHERE c.cart.id =?1 AND c.product.id = ?2")
    CartItem findByCartUserAndProductID(Integer cartId,Integer prodId);

}
