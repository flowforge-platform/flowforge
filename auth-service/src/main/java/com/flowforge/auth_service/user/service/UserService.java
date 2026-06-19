package com.flowforge.auth_service.user.service;

import com.flowforge.auth_service.user.model.User;
import com.flowforge.auth_service.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User save(User user){
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public String encodePassword(String raw){
        return passwordEncoder.encode(raw);
    }

    public boolean verifyPassword(String raw, String encoded){
        return passwordEncoder.matches(raw, encoded);
    }

}
