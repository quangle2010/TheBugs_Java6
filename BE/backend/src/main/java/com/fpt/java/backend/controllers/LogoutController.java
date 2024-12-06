package com.fpt.java.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.resp.ResponseData;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class LogoutController {

  @GetMapping("/logout")
  public ResponseEntity<ResponseData> logout(HttpServletRequest request, HttpServletResponse response) {
      // Tìm cookie JWT từ yêu cầu
      Cookie[] cookies = request.getCookies();
      
      // Nếu có cookie JWT, xóa nó
      if (cookies != null) {
          for (Cookie cookie : cookies) {
              if (cookie.getName().equals("JWT_TOKEN")) {
                  cookie.setValue(null); // Đặt giá trị cookie thành null để "hủy" cookie
                  cookie.setMaxAge(0);   // Đặt thời gian sống của cookie thành 0 để xóa
                  cookie.setPath("/");   // Đảm bảo cookie này được xóa trên toàn bộ ứng dụng
                  response.addCookie(cookie);  // Thêm cookie đã xóa vào phản hồi
                  break;
              }
          }
      }
  
      return ResponseEntity.ok(new ResponseData(true, "Đăng xuất thành công", null));
  }
  
}
  
    

