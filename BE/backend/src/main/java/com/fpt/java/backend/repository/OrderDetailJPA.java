package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailJPA extends JpaRepository<OrderDetail,Integer> {
}
