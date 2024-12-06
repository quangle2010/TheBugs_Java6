package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.ArrayList;
import java.util.Optional;

public interface CategoryJPA extends JpaRepository<Category,Integer> {
    @Query("SELECT cat FROM Category cat WHERE cat.active=true")
    ArrayList<Category> getAllCategoryByActive();


    @Query("SELECT cat FROM Category cat WHERE cat.name = ?2 AND (cat.id <> ?1 OR ?1 IS NULL)")
    Optional<Category> findByNameExist(Integer id,String name);
}
