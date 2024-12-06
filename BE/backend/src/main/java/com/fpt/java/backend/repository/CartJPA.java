package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartJPA extends JpaRepository<Cart,Integer> {
}
