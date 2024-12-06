package com.fpt.java.backend.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBean {
    private Integer id;
    private String username;
    private String passwrord;
    private String email;
    private String name;
    private String phone;
    private String address;
    private Boolean roles;
    private Boolean active;
}
