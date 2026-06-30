package com.flowforge.auth_service.service;

import com.flowforge.auth_service.enums.InvitationStatus;
import com.flowforge.auth_service.model.Invitation;
import com.flowforge.auth_service.repository.InvitationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvitationService {

    private final InvitationRepository invitationRepository;

    public Invitation save(Invitation invitation){
        return invitationRepository.save(invitation);
    }

    public Optional<Invitation> findByToken(String token){
        return invitationRepository.findByToken(token);
    }
    @Transactional
    public  void markAccepted(Invitation invitation){
        invitation.setStatus(InvitationStatus.ACCEPTED);
        invitationRepository.save(invitation);
    }

    @Transactional
    @Scheduled(cron = "0 0 * * * *")
    public void expireStaleInvitations(){
        invitationRepository.expireStale(Instant.now());
    }
}
