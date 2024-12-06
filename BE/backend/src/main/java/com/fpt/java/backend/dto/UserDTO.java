package com.fpt.java.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private String name;
    private String phone;
    private String address;
    private Boolean roles;
    private Boolean active;
}
