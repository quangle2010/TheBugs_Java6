package com.fpt.java.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fpt.java.backend.dto.UserDTO;
import com.fpt.java.backend.entities.Cart;
import com.fpt.java.backend.entities.User;
import com.fpt.java.backend.repository.CartJPA;
import com.fpt.java.backend.repository.UserJPA;
import com.fpt.java.backend.mapper.UserMapper;

@Service
public class UserService {

    private final UserJPA userJPA;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserJPA userJPA, BCryptPasswordEncoder passwordEncoder, CartJPA cartJPA) {
        this.userJPA = userJPA;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.cartJPA = cartJPA;
    }

    private final CartJPA cartJPA;

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

}
