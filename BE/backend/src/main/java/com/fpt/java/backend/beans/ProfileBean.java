package com.fpt.java.backend.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileBean {
    private String name;
    private String email;
    private String phone;
    private String address;
}
