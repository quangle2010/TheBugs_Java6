package com.fpt.java.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.ProfileBean;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.mapper.UserMapper;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.UserService;
import com.fpt.java.backend.utils.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
public class ProfileController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    public ProfileController(UserService userService, UserMapper userMapper, JwtUtil jwtUtil) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.jwtUtil = jwtUtil;

    }

    @PostMapping("/user/profile")
    public ResponseEntity<ResponseData> postProfile(@RequestHeader("Authorization") String authorizationHeader,
            @RequestBody ProfileBean profileBean) {
        try {
            String token = authorizationHeader.startsWith("Bearer ")
                    ? authorizationHeader.substring(7)
                    : authorizationHeader;
            String username = jwtUtil.extractUsername(token);
            User user = userService.findByUser(username);
            user.setName(profileBean.getName());
            user.setEmail(profileBean.getEmail());
            user.setPhone(profileBean.getPhone());
            user.setAddress(profileBean.getAddress());
            userService.save(user);
            return ResponseEntity.ok(new ResponseData(true, "Cập nhật thành công", userMapper.toDTO(user)));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseData(false, e.getMessage(), null));
        }
    }

    @GetMapping("/user/profile")
    public ResponseEntity<ResponseData> getProfile(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.startsWith("Bearer ")
                    ? authorizationHeader.substring(7)
                    : authorizationHeader;
            String username = jwtUtil.extractUsername(token);
            User user = userService.findByUser(username);
            return ResponseEntity.ok(new ResponseData(true, "get dữ liệu thành công", userMapper.toDTO(user)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

}
