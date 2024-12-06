package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderJPA extends JpaRepository<Order,Integer> {
}
