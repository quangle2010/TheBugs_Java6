package com.fpt.java.backend.controllers;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.RegisterBean;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.UserService;

import jakarta.validation.Valid;


@RestController
public class RegisterController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseData> registerUser(@Valid @RequestBody RegisterBean registerBean,
            BindingResult result) {

        if (result.hasErrors()) {
            String errorMess = result.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(";"));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData(false, errorMess, null));

        }
        if (registerBean.getUsername().equals(registerBean.getConfirmpassword())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseData(false, "Password và ConfirmPassword không giống nhau", null));
        }

        try {
            User user = new User();
            user.setUsername(registerBean.getUsername());
            user.setPassword(registerBean.getPassword());
            user.setName(registerBean.getName());

            User registerUser = userService.registerUser(user.getUsername(), user.getPassword(), user.getName());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseData(true, "User  registered successfully", registerUser));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseData(false, e.getMessage(), null));
        }

    }
}
