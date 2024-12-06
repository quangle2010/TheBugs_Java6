package com.fpt.java.backend.controllers;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.ChangedPasswordBean;

import com.fpt.java.backend.repository.UserJPA;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.UserService;
import com.fpt.java.backend.utils.JwtUtil;

import jakarta.validation.Valid;


@RestController
public class ChangedPasswordController {
    @Autowired
    UserJPA userJPA;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    UserService userService;

    @PostMapping("/changedpassword")
    public ResponseEntity<ResponseData> changedPasswordPage(@RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody ChangedPasswordBean resetBean, BindingResult result) {
        String token = authorizationHeader.startsWith("Bearer ")
                ? authorizationHeader.substring(7)
                : authorizationHeader;
        
        String username = jwtUtil.extractUsername(token);
        
        if(username == null) {
        	
        	return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        			.body(new ResponseData(false , "Token không hợp lệ", null));
        }
        
        if (result.hasErrors()) {
            String errorMess = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(";"));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseData(false, errorMess, null));
        }

        try {
            Boolean user = userService.changedPassword(username, resetBean.getOldpassword(),
                    resetBean.getNewpassword(), resetBean.getConfirmpassword());
            if (user) {
                return ResponseEntity.ok(new ResponseData(true, "Thay Đổi Mật Khẩu Thành Công", null));
          
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED ).body(new ResponseData(false, "Lỗi thay đổi mật khẩu không thành công", null));
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData(false, e.getMessage(), null));
        }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseData(false, "Đã xảy ra lỗi"+e.getMessage(),null));
		}

    }
}
