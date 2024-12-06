package com.fpt.java.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.fpt.java.backend.dto.CommentDTO;
import com.fpt.java.backend.entities.Comment;
import com.fpt.java.backend.entities.Product;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.mapper.CommentMapper;
import com.fpt.java.backend.repository.CommentJPA;
import com.fpt.java.backend.repository.ProductJPA;
import com.fpt.java.backend.repository.UserJPA;

@Service
public class CommentService {

    private final CommentJPA commentJPA;
    private final UserJPA userJPA;
    private final ProductJPA productJPA;
    private final CommentMapper commentMapper;

    public CommentService(CommentJPA commentJPA, UserJPA userJPA, CommentMapper commentMapper, ProductJPA productJPA) {
        this.commentJPA = commentJPA;
        this.userJPA = userJPA;
        this.commentMapper = commentMapper;
        this.productJPA = productJPA;
    }

    public ArrayList<CommentDTO> getCommentProduct(Integer productId) {
        ArrayList<Comment> comments = commentJPA.getCommentsByProductId(productId);
        return comments.stream()
                .map(commentMapper::toDTO)
                .sorted(Comparator.comparing(CommentDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public ArrayList<CommentDTO> getTop2Comment() {
        ArrayList<Comment> comments = commentJPA.getTop2Comment();
        return comments.stream()
                .map(commentMapper::toDTO)
                .sorted(Comparator.comparing(CommentDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public CommentDTO add(String username, Integer productId, String noted) {
        User user = userJPA.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user"));

        Product product = productJPA.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy product"));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setProduct(product);
        comment.setNoted(noted);
        comment.setCreateAt(new Date());
        comment.setUpdateAt(new Date());
        return commentMapper.toDTO(commentJPA.save(comment));
    }

    public CommentDTO update(Integer id, String noted) {
        Comment comment = commentJPA.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy id"));
        comment.setCreateAt(comment.getCreateAt());
        comment.setNoted(noted);
        comment.setUpdateAt(new Date());

        comment = commentJPA.save(comment);

        return commentMapper.toDTO(comment);

    }

    public CommentDTO delete(Integer id) {
        Comment comment = commentJPA.findById(id).orElseThrow(() -> new IllegalArgumentException("không tìm thấy id"));
        commentJPA.delete(comment);
        return commentMapper.toDTO(comment);
    }

}
