package com.flowforge.auth_service.security;

import com.flowforge.auth_service.enums.Role;
import com.flowforge.auth_service.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class UserPrincipal implements UserDetails {

    private final UUID id;
    private final String email;
    private final UUID organizationId;
    private final Role role;

    public UserPrincipal(User user){
        this.id=user.getId();
        this.email=user.getEmail();
        this.organizationId=user.getOrganization().getId();
        this.role=user.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+role.name()));
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }
    public UUID getId() {
        return id;
    }
    public UUID getOrganizationId() {
        return organizationId;
    }
}
