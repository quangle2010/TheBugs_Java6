package com.fpt.java.backend.beans;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderBean {
    private String fullName;
    private String phone;
    private String address;
    private boolean paymentMethod;
}
