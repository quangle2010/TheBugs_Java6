package com.fpt.java.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.CommentService;
import com.fpt.java.backend.utils.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
public class CommentController {
    private final CommentService commentService;

    private final JwtUtil jwtUtil;

    public CommentController(CommentService commentService, JwtUtil jwtUtil) {
        this.commentService = commentService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/comment")
    public ResponseEntity<ResponseData> getComment(@RequestParam Integer productId) {
        try {
            return ResponseEntity
                    .ok(new ResponseData(true, "Load thành công", commentService.getCommentProduct(productId)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, "Không tải được comment", null));
        }
    }

    @PostMapping("/user/deleComment")
    public ResponseEntity<ResponseData> addComment(@RequestParam Integer id) {
        try {
            return ResponseEntity
                    .ok(new ResponseData(true, "Xóa thành công", commentService.delete(id)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, "Không tải được comment", null));
        }
    }

    @PostMapping("/user/updateComment")
    public ResponseEntity<ResponseData> updateComment(@RequestParam Integer id, @RequestParam String noted) {
        try {
            return ResponseEntity
                    .ok(new ResponseData(true, "Update thành công", commentService.update(id, noted)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, "Không tải được comment", null));
        }
    }

    @PostMapping("/user/addComment")
    public ResponseEntity<ResponseData> addComment(@RequestHeader("Authorization") String authorizationHeader,
            @RequestParam Integer productId, @RequestParam String noted) {
        try {
            String token = authorizationHeader.startsWith("Bearer ")
                    ? authorizationHeader.substring(7)
                    : authorizationHeader;
            String username = jwtUtil.extractUsername(token);
            return ResponseEntity
                    .ok(new ResponseData(true, "Update thành công", commentService.add(username, productId, noted)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, "Không tải được comment", null));
        }
    }

}
