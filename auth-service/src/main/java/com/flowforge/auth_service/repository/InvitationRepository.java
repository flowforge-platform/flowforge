package com.flowforge.auth_service.repository;

import com.flowforge.auth_service.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation,String> {

    Optional<Invitation> findByToken(String token);

    @Modifying
    @Query("""
        UPDATE Invitation i SET i.status = 'EXPIRED'
        WHERE i.status = 'PENDING' AND i.expiresAt < :now
        """)
    int expireStale(@Param("now") Instant now);
}
