package com.fpt.java.backend.utils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.java.backend.resp.ResponseData;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    public CustomAuthenticationEntryPoint() {
        this.objectMapper = new ObjectMapper(); // Initialize ObjectMapper
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");

        ResponseData responseData = new ResponseData(false, "Không có quyền truy cập", null);  // Custom response
        String jsonResponse = objectMapper.writeValueAsString(responseData); // Convert to JSON

        response.getWriter().write(jsonResponse);
    }
}