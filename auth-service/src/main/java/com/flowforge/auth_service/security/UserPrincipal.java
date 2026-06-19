package com.flowforge.auth_service.security;

import com.flowforge.auth_service.common.enums.Role;
import com.flowforge.auth_service.user.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private final String id;
    private final String email;
    private final String organizationId;
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
    public String getId() {
        return id;
    }
    public String getOrganizationId() {
        return organizationId;
    }
}
