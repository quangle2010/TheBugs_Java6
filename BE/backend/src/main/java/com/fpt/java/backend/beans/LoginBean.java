package com.fpt.java.backend.beans;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginBean {
    @NotBlank(message = "Username không được bỏ trống")
    private String username;
    @NotBlank(message = "Mật khẩu không được bỏ trống")
    private String password;
}
