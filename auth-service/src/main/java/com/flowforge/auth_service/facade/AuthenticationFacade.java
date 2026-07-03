package com.flowforge.auth_service.facade;

import com.flowforge.auth_service.dto.AuthResponse;
import com.flowforge.auth_service.dto.LoginRequest;
import com.flowforge.auth_service.dto.RefreshTokenRequest;
import com.flowforge.auth_service.dto.RegisterOrgRequest;
import com.flowforge.auth_service.dto.RegisterWithInviteRequest;
import com.flowforge.auth_service.enums.InvitationStatus;
import com.flowforge.auth_service.exception.*;
import com.flowforge.auth_service.model.Invitation;
import com.flowforge.auth_service.service.AuthenticationService;
import com.flowforge.auth_service.service.InvitationService;
import com.flowforge.auth_service.model.Organization;
import com.flowforge.auth_service.service.OrganizationService;
import com.flowforge.auth_service.security.JwtService;
import com.flowforge.auth_service.mapper.OrganizationMapper;
import com.flowforge.auth_service.mapper.UserMapper;
import com.flowforge.auth_service.model.User;
import com.flowforge.auth_service.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class AuthenticationFacade {
    private final UserService userService;
    private final OrganizationService organizationService;
    private final InvitationService invitationService;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthResponse registerOrganization(RegisterOrgRequest request){
        if (organizationService.existsByName(request.getOrganizationName())){
            throw new OrganizationAlreadyExistsException("Organization name already register");
        }
        if (userService.existsByEmail(request.getEmail())){
            throw new EmailAlreadyExistsException("Email already registered");
        }
        return buildAuthResponse(authenticationService.registerOrganization(request),"Organization created");
    }

    public AuthResponse registerWithInvite(RegisterWithInviteRequest request){
        Invitation invitation=invitationService.findByToken(request.getToken())
                .orElseThrow(()->new InvalidInviteTokenException("Invalid invite token"));
         validateInvitationUsable(invitation);

         if (!request.getEmail().equalsIgnoreCase(invitation.getEmail())) {
             throw new EmailMismatchException("Email does not match invitation email");
         }

         if (userService.existsByEmail(invitation.getEmail())){
             throw new EmailAlreadyExistsException("Email already registered");
         }
         return buildAuthResponse(authenticationService.registerWithInvite(request,invitation),"Register completed");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));
        if (!userService.verifyPassword(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        return buildAuthResponse(user, "Login successful");
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String token = request.getRefreshToken();
        if (!jwtService.isValid(token)) {
            throw new InvalidRefreshTokenException("Invalid or expired refresh token");
        }
        String email = jwtService.extractClaims(token).getSubject();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
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
            throw new InvitationAlreadyUsedException("Invitation already used");
        }
        if (invitation.getStatus() == InvitationStatus.EXPIRED
                || invitation.getExpiresAt().isBefore(Instant.now())) {
            throw new InvitationExpiredException("Invitation has expired");
        }
    }
}
