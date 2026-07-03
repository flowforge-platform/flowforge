package com.flowforge.auth_service.service;

import com.flowforge.auth_service.dto.RegisterOrgRequest;
import com.flowforge.auth_service.dto.RegisterWithInviteRequest;
import com.flowforge.auth_service.mapper.OrganizationMapper;
import com.flowforge.auth_service.mapper.UserMapper;
import com.flowforge.auth_service.model.Invitation;
import com.flowforge.auth_service.model.Organization;
import com.flowforge.auth_service.model.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final OrganizationMapper organizationMapper;
    private final OrganizationService organizationService;
    private final UserMapper userMapper;
    private final InvitationService invitationService;

//repo
    @Transactional
    public User registerOrganization(RegisterOrgRequest request) {
        Organization org = organizationMapper.toEntity(request);
        Organization savedOrg=organizationService.save(org);

        User user = userMapper.toManagerEntity(request, savedOrg, userService.encodePassword(request.getPassword()));
        return userService.save(user);
    }

    @Transactional
    public User registerWithInvite(RegisterWithInviteRequest request, Invitation invitation) {
        User user = userMapper.toEntity(request, invitation, userService.encodePassword(request.getPassword()));
        userService.save(user);
        invitationService.markAccepted(invitation);
        return user;

    }
}
