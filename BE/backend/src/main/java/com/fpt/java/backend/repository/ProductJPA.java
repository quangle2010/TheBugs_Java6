package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.Product;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductJPA extends JpaRepository<Product, Integer> {

        @Query("SELECT p FROM Product p WHERE p.active = true AND p.category.active = true")
        ArrayList<Product> findAllByProductActiveAndCategoryActive();

        @Query(value = "select top 5 * from products\n" + //
                        "where id != (SELECT TOP 1 id\n" + //
                        "FROM products \n" + //
                        "ORDER BY id DESC)\n" + //
                        "ORDER BY id DESC;", nativeQuery = true)
        ArrayList<Product> findTop5ExcludingMaxId();

        @Query(value = "SELECT TOP 1 * \n" + //
                        "FROM products \n" + //
                        "ORDER BY id DESC;", nativeQuery = true)
        Product getMaxIdProduct();
}
