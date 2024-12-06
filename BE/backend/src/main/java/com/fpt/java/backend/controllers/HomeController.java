package com.fpt.java.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.resp.HomePageResponse;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.CommentService;
import com.fpt.java.backend.service.ProductService;

@RestController
public class HomeController {

    private final ProductService productService;
    private final CommentService commentService;

    public HomeController(ProductService productService, CommentService commentService) {
        this.productService = productService;
        this.commentService = commentService;
    }

    @GetMapping("/home")
    public ResponseEntity<ResponseData> getHomePage() {
        try {

            // Tạo phản hồi thành công
            ResponseData responseData = new ResponseData();
            responseData.setStatus(true);
            responseData.setMessage("Dữ liệu trang chủ được tải thành công");
            responseData.setData(new HomePageResponse(productService.findTop5(), null, productService.getTop1(),
                    commentService.getTop2Comment()));
            return ResponseEntity.ok(responseData);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();

            // Tạo phản hồi lỗi
            ResponseData responseData = new ResponseData();
            responseData.setStatus(false);
            responseData.setMessage("Đã xảy ra lỗi khi tải dữ liệu trang chủ");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
        }
    }
}
