package com.fpt.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fpt.java.backend.entities.OrderStatus;

public interface OrderStatusJPA extends JpaRepository<OrderStatus,Integer> {
}
