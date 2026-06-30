package com.flowforge.auth_service.facade;

import com.flowforge.auth_service.dto.CreateInvitationRequest;
import com.flowforge.auth_service.enums.InvitationStatus;
import com.flowforge.auth_service.dto.InvitationInfoResponse;
import com.flowforge.auth_service.exception.InvalidInviteTokenException;
import com.flowforge.auth_service.exception.InvitationExpiredException;
import com.flowforge.auth_service.exception.OrganizationNotFoundException;
import com.flowforge.auth_service.model.Invitation;
import com.flowforge.auth_service.service.InvitationService;
import com.flowforge.auth_service.service.MailService;
import com.flowforge.auth_service.mapper.InvitationMapper;
import com.flowforge.auth_service.model.Organization;
import com.flowforge.auth_service.service.OrganizationService;
import com.flowforge.auth_service.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InvitationFacade {

    private final InvitationService invitationService;
    private final OrganizationService organizationService;
    private final MailService mailService;
    private final InvitationMapper invitationMapper;

    public void createInvitation(CreateInvitationRequest request, UserPrincipal userPrincipal){
        Organization org=organizationService.findById(userPrincipal.getOrganizationId())
                .orElseThrow(()->new OrganizationNotFoundException("Organization not found"));

        Invitation invitation = invitationMapper.toEntity(request, org);
        Invitation saved = invitationService.save(invitation);

        mailService.sendInvitationEmail(saved.getEmail(), saved.getToken(), org.getName());
    }

    public InvitationInfoResponse validateToken(String token){
        Invitation invitation=invitationService.findByToken(token)
                .orElseThrow(()->new InvalidInviteTokenException("Invalid token"));

        if (invitation.getStatus()!= InvitationStatus.PENDING){
            throw new InvitationExpiredException("Token expired");
        }
        return new InvitationInfoResponse(invitation.getOrganization().getName(),invitation.getEmail(),invitation.getRole());
    }
}
