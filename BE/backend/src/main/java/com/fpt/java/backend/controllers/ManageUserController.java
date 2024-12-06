package com.fpt.java.backend.controllers;

import java.util.stream.Collectors;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.beans.UserBean;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.mapper.UserMapper;
import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin/api/users")
public class ManageUserController {

    private final UserService userService;

    public ManageUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseData> findAll() {
        try {
            return ResponseEntity.ok(new ResponseData(true, "Load danh sách người dùng thành công",
                    userService.getAllUser()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseData> saveCategory(@RequestBody @Valid UserBean userBean,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                String errorMessages = result.getAllErrors().stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .collect(Collectors.joining(", "));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseData(false, errorMessages, null));
            }
            if (userBean.getId() != null) {
                User user = userService.findById(userBean.getId());
                user.setName(userBean.getName());
                user.setEmail(userBean.getEmail());
                user.setPhone(userBean.getPhone());
                user.setAddress(userBean.getAddress());
                user.setActive(userBean.getActive());
                User savedUser = userService.save(user);
                return ResponseEntity.ok(
                        new ResponseData(true, "Người dùng được lưu thành công", UserMapper.INSTANCE.toDTO(savedUser)));
            }
            return ResponseEntity.ok(new ResponseData(false, "Lỗi khi lưu ", null));

        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }

    }

    @PostMapping("/delete")
    public ResponseEntity<ResponseData> delete(@RequestParam Integer id) {
        try {
            User userDelete=userService.delete(id);
            return ResponseEntity.ok(new ResponseData(true, "Đã xóa thành công người dùng", UserMapper.INSTANCE.toDTO(userDelete)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ResponseData(false, e.getMessage(), null));
        }
    }

}
