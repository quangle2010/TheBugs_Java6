package com.fpt.java.backend.controllers;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.UserService;

@RestController
public class ForgotpasswordController {

    private final UserService userService;

    public ForgotpasswordController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<ResponseData> postMethodName(@RequestParam String email) {
        try {
            boolean check = userService.forgotpass(email);
            if (check) {
                return ResponseEntity.ok(new ResponseData(true,
                        "Gửi mail thành công", null));
            } else {
                return ResponseEntity.status(401).body(new ResponseData(false, "Lỗi", null));
            }

        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, "Lỗi", null));
        }

    }
}
