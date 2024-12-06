package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.Comment;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentJPA extends JpaRepository<Comment, Integer> {
    @Query("SELECT m FROM Comment m WHERE m.product.id = ?1")
    ArrayList<Comment> getCommentsByProductId(Integer id);

    @Query(value = "select top 2 * from comments order by id desc;", nativeQuery = true)
    ArrayList<Comment> getTop2Comment();
}
