package com.fpt.java.backend.beans;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangedPasswordBean {
    @NotBlank(message = "Mật khẩu cũ không được để trống.")
    private String oldpassword;

    @NotBlank(message = "Mật khẩu mới không được để trống.")
    @Size(min = 6, message = "Mật khẩu mới phải có ít nhất 6 ký tự.")
    private String newpassword;

    @NotBlank(message = "Xác nhận mật khẩu không được để trống.")
    private String confirmpassword;
}
