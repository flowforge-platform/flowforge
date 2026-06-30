package com.flowforge.auth_service.repository;

import com.flowforge.auth_service.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    @EntityGraph(attributePaths = {"organization"})
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
