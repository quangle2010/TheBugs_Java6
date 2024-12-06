package com.fpt.java.backend.controllers;

import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.LoginBean;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.LoginService;

import jakarta.validation.Valid;

@RestController
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseData> login(@RequestBody @Valid LoginBean loginBean, BindingResult result) {
        try {
            if (result.hasErrors()) {
                String errorMessages = result.getAllErrors().stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .collect(Collectors.joining(", "));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseData(false, errorMessages, null));
            }
            String token = loginService.login(loginBean.getUsername(), loginBean.getPassword());
            return ResponseEntity.ok(new ResponseData(true, "Login susscess", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData(true, e.getMessage(), null));
        }
    }

}
