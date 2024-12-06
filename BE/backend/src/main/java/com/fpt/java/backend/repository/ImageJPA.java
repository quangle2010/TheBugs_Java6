package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageJPA extends JpaRepository<Image,Integer> {
}
