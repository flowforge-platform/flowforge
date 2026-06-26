package com.flowforge.auth_service.invitation.facade;

import com.flowforge.auth_service.auth.dto.CreateInvitationRequest;
import com.flowforge.auth_service.common.enums.InvitationStatus;
import com.flowforge.auth_service.invitation.dto.InvitationInfoResponse;
import com.flowforge.auth_service.invitation.model.Invitation;
import com.flowforge.auth_service.invitation.service.InvitationService;
import com.flowforge.auth_service.mail.service.MailService;
import com.flowforge.auth_service.organization.model.Organization;
import com.flowforge.auth_service.organization.service.OrganizationService;
import com.flowforge.auth_service.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import com.flowforge.auth_service.common.exception.*;

@Component
@RequiredArgsConstructor
public class InvitationFacade {

    private final InvitationService invitationService;
    private final OrganizationService organizationService;
    private final MailService mailService;

    public void createInvitation(CreateInvitationRequest request, UserPrincipal userPrincipal){
        Organization org=organizationService.findById(userPrincipal.getOrganizationId())
                .orElseThrow(()->new OrganizationNotFoundException("Organization not found"));

        Invitation invitation=Invitation.builder()
                .email(request.email())
                .role(request.role())
                .organization(org).build();
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
