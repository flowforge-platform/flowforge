package com.flowforge.auth_service.mail.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    @Async
    public void sendInvitationEmail(String toEmail, String token, String orgName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("You have been invited to join " + orgName);
            message.setText("""
                You've been invited to join %s.
                Click the link below to complete your registration:
                
                %s/register?token=%s
                
                This link expires in 72 hours.
                """.formatted(orgName, baseUrl, token));
            mailSender.send(message);
            log.info("Invitation email sent successfully to {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send invitation email to {}: {}. Dev invitation token: {}", toEmail, e.getMessage(), token);
        }
    }
}