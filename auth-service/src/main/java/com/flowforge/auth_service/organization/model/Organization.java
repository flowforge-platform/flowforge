package com.flowforge.auth_service.organization.model;

import com.flowforge.auth_service.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "organizations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String name;

    @CreationTimestamp
    private Instant createdAt;

    @OneToMany(mappedBy = "organization",cascade = CascadeType.ALL)
    private List<User> users =new ArrayList<>();
}
