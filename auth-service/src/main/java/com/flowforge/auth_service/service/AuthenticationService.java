package com.flowforge.auth_service.service;

import com.flowforge.auth_service.dto.RegisterOrgRequest;
import com.flowforge.auth_service.dto.RegisterWithInviteRequest;
import com.flowforge.auth_service.mapper.OrganizationMapper;
import com.flowforge.auth_service.mapper.UserMapper;
import com.flowforge.auth_service.model.Invitation;
import com.flowforge.auth_service.model.Organization;
import com.flowforge.auth_service.model.User;
import com.flowforge.auth_service.repository.InvitationRepository;
import com.flowforge.auth_service.repository.OrganizationRepository;
import com.flowforge.auth_service.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final OrganizationMapper organizationMapper;

    private final UserMapper userMapper;
    private final InvitationService invitationService;

    @Transactional
    public User registerOrganization(RegisterOrgRequest request) {
        Organization org = organizationMapper.toEntity(request);
        Organization savedOrg=organizationRepository.save(org);

        User user = userMapper.toManagerEntity(request, savedOrg, userService.encodePassword(request.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    public User registerWithInvite(RegisterWithInviteRequest request, Invitation invitation) {
        User user = userMapper.toEntity(request, invitation, userService.encodePassword(request.getPassword()));
        userRepository.save(user);
        invitationService.markAccepted(invitation);
        return user;

    }
}
