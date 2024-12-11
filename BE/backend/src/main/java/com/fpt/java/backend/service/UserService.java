package com.fpt.java.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fpt.java.backend.dto.UserDTO;
import com.fpt.java.backend.entities.Cart;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.repository.CartJPA;
import com.fpt.java.backend.repository.UserJPA;
import com.fpt.java.backend.utils.JwtUtil;

import jakarta.mail.internet.MimeMessage;

import com.fpt.java.backend.mapper.UserMapper;

@Service
public class UserService {

    private final UserJPA userJPA;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CartJPA cartJPA;
    private final JwtUtil jwtUtil;
    @Autowired
    private JavaMailSender mailSender;

    public UserService(UserJPA userJPA, BCryptPasswordEncoder passwordEncoder, CartJPA cartJPA, JwtUtil jwtUtil) {
        this.userJPA = userJPA;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.cartJPA = cartJPA;
        this.jwtUtil = jwtUtil;
    }

    public ArrayList<UserDTO> getAllUser() {
        ArrayList<User> users = (ArrayList<User>) userJPA.pageAllUserByRolesFalse();
        return users.stream()
                .map(UserMapper.INSTANCE::toDTO)
                .sorted(Comparator.comparing(UserDTO::getId).reversed())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public User save(User user) {
        Optional<User> checkUsername = userJPA.findByUsernameExist(user.getId(), user.getUsername());
        Optional<User> checkEmai = userJPA.findByEmailExist(user.getId(), user.getEmail());
        Optional<User> checkphone = userJPA.findByPhoneExist(user.getId(), user.getPhone());
        if (checkUsername.isPresent()) {
            throw new IllegalArgumentException("Username đã tồn tại.");
        }
        if (checkEmai.isPresent()) {
            throw new IllegalArgumentException("Email đã tồn tại.");
        }
        if (checkphone.isPresent()) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại.");
        }
        return userJPA.save(user);
    }

    public User delete(Integer id) {
        Optional<User> optUser = userJPA.findById(id);
        if (!optUser.isPresent()) {
            throw new IllegalArgumentException("Người dùng không tồn tại.");
        }
        optUser.get().setActive(false);
        userJPA.save(optUser.get());
        return optUser.get();
    }

    public User findByUser(String username) {
        Optional<User> optUser = userJPA.findByUsername(username);
        if (!optUser.isPresent()) {
            throw new IllegalArgumentException("Người dùng không tồn tại.");
        }
        return optUser.get();
    }

    public User findById(Integer id) {
        Optional<User> optUser = userJPA.findById(id);
        if (!optUser.isPresent()) {
            throw new IllegalArgumentException("Người dùng không tồn tại.");
        }
        return optUser.get();
    }

    public User registerUser(String username, String password, String name) {
        Optional<User> existUser = userJPA.findByUsernameExist(null, username);
        if (existUser.isPresent()) {
            throw new IllegalArgumentException("Username đã tồn tại");
        }
        if (password.length() < 6) {
            throw new IllegalArgumentException("Password lớn hơn 6 số");
        }

        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(hashedPassword);
        newUser.setName(name);
        newUser.setRoles(false);
        newUser.setActive(true);
        User user = userJPA.save(newUser);
        Cart cart = new Cart();
        cart.setUser(user);
        cartJPA.save(cart);
        return userJPA.save(newUser);

    }

    public Boolean changedPassword(String username, String oldpassword, String newpassword, String confirmpassword) {

        User user = userJPA.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(oldpassword, user.getPassword())) {
            throw new IllegalArgumentException("Password cũ không đúng");
        }

        if (!newpassword.equals(confirmpassword)) {
            throw new IllegalArgumentException("Xac nhan khong dung!");
        }

        user.setPassword(passwordEncoder.encode(newpassword));
        userJPA.save(user);
        return true;

    }

    public User finByEmail(String email) {
        User user = userJPA.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user"));
        return user;
    }

    public boolean forgotpass(String email) {
        try {
            User u = finByEmail(email);
            String token = jwtUtil.generateToken(u.getUsername());
            String resetPasswordLink = "https://your-website.com/reset-password?token=" + token;
            String htmlContent = "<html><body>"
                    + "<h3>Xin chào,</h3>"
                    + "<p>Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu cho tài khoản của bạn.</p>"
                    + "<p>Nhấp vào nút dưới đây để đặt lại mật khẩu của bạn:</p>"
                    + "<a href='" + resetPasswordLink + "' style='"
                    + "background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; font-size: 16px;'>"
                    + "Đặt lại mật khẩu</a>"
                    + "<p>Trân trọng,</p>"
                    + "<p>Nhóm hỗ trợ của chúng tôi</p>"
                    + "</body></html>";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(u.getEmail());
            helper.setSubject("Đặt lại mật khẩu của bạn");
            helper.setText(htmlContent, true);
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
