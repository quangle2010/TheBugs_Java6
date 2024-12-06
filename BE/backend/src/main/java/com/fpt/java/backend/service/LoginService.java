package com.fpt.java.backend.service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.repository.UserJPA;
import com.fpt.java.backend.utils.JwtUtil;

@Service
public class LoginService {
    private final UserJPA userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginService(UserJPA userRepository, JwtUtil jwtUtil) {
	this.userRepository = userRepository;
	this.passwordEncoder = new BCryptPasswordEncoder();
	this.jwtUtil = jwtUtil;
    }

    public String login(String username, String password) {
	User user = userRepository.findByUsername(username)
		.orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

	if (!passwordEncoder.matches(password, user.getPassword())) {
	    throw new IllegalArgumentException("Invalid username or password");
	}

	return jwtUtil.generateToken(username);
    }

}
