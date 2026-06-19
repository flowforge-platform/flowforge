package com.flowforge.auth_service.auth.facade;

import com.flowforge.auth_service.auth.dto.AuthResponse;
import com.flowforge.auth_service.auth.dto.LoginRequest;
import com.flowforge.auth_service.auth.dto.RefreshTokenRequest;
import com.flowforge.auth_service.auth.dto.RegisterOrgRequest;
import com.flowforge.auth_service.auth.dto.RegisterWithInviteRequest;
import com.flowforge.auth_service.common.enums.InvitationStatus;
import com.flowforge.auth_service.common.enums.Role;
import com.flowforge.auth_service.invitation.model.Invitation;
import com.flowforge.auth_service.invitation.service.InvitationService;
import com.flowforge.auth_service.organization.model.Organization;
import com.flowforge.auth_service.organization.service.OrganizationService;
import com.flowforge.auth_service.security.JwtService;
import com.flowforge.auth_service.user.model.User;
import com.flowforge.auth_service.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class AuthFacade {
    private final UserService userService;
    private final OrganizationService organizationService;
    private final InvitationService invitationService;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse registerOrganization(RegisterOrgRequest request){
        if (organizationService.existsByName(request.organizationName())){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Organization name already register");
        }
        if (userService.existsByEmail(request.email())){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already registered");
        }
        Organization org=new Organization();
        org.setName(request.organizationName());
        Organization savedOrg=organizationService.save(org);

        User user=new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(userService.encodePassword(request.password()));
        user.setRole(Role.ADMIN);
        user.setOrganization(savedOrg);
        userService.save(user);

        return buildAuthResponse(user,"Organization created");
    }

    @Transactional
    public AuthResponse registerWithInvite(RegisterWithInviteRequest request){
        Invitation invitation=invitationService.findByToken(request.token())
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Invalid invite token"));
         validateInvitationUsable(invitation);

         if (!request.email().equalsIgnoreCase(invitation.getEmail())) {
             throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email does not match invitation email");
         }

         if (userService.existsByEmail(invitation.getEmail())){
             throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already registered");
         }

         User user=User.builder()
                 .fullName(request.fullName())
                 .email(invitation.getEmail())
                 .password(userService.encodePassword(request.password()))
                 .role(invitation.getRole())
                 .organization(invitation.getOrganization())
                 .build();
         userService.save(user);

         invitationService.markAccepted(invitation);
         return buildAuthResponse(user,"Register completed");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userService.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!userService.verifyPassword(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        return buildAuthResponse(user, "Login successful");
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String token = request.refreshToken();
        if (!jwtService.isValid(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired refresh token");
        }
        String email = jwtService.extractClaims(token).getSubject();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        return buildAuthResponse(user, "Token refreshed");
    }

    private AuthResponse buildAuthResponse(User user,String message){
        return AuthResponse.of(
                jwtService.generateAccessToken(user),
                jwtService.generateRefreshToken(user),
                message);
    }

    private void validateInvitationUsable(Invitation invitation){
        if (invitation.getStatus()== InvitationStatus.ACCEPTED){
            throw new ResponseStatusException(HttpStatus.GONE, "Invitation already used");
        }
        if (invitation.getStatus() == InvitationStatus.EXPIRED
                || invitation.getExpiresAt().isBefore(Instant.now())) {
            throw new ResponseStatusException(HttpStatus.GONE, "Invitation has expired");
        }
    }
}
