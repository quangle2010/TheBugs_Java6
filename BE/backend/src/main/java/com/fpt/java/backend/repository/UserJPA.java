package com.fpt.java.backend.repository;

import com.fpt.java.backend.entities.User;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserJPA extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.username = ?1 AND u.active = true")
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.active = true")
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.roles = false ORDER BY u.id DESC")
    ArrayList<User> pageAllUserByRolesFalse();

    @Query("SELECT u FROM User u  WHERE u.username = ?2 AND (u.id <> ?1 OR ?1 IS NULL)")
    Optional<User> findByUsernameExist(Integer id, String username);

    @Query("SELECT u FROM User u  WHERE u.email = ?2 AND (u.id <> ?1 OR ?1 IS NULL)")
    Optional<User> findByEmailExist(Integer id, String email);

    @Query("SELECT u FROM User u  WHERE u.phone = ?2 AND (u.id <> ?1 OR ?1 IS NULL)")
    Optional<User> findByPhoneExist(Integer id, String phone);
}
