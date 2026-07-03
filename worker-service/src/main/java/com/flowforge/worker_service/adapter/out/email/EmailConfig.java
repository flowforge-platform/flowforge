package com.flowforge.worker_service.adapter.out.email;

public record EmailConfig(
        String to,
        String subject,
        String body
) {
}
