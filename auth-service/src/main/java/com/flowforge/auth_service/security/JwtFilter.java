package com.flowforge.auth_service.security;

import com.flowforge.auth_service.service.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        extractBearerToken(request)
                .filter(jwtService::isValid)
                .ifPresent(token->{
                    Claims claims=jwtService.extractClaims(token);
                    userService.findByEmail(claims.getSubject()).ifPresent(user -> {
                        UserPrincipal principal=new UserPrincipal(user);
                        UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(principal,null,principal.getAuthorities());
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    });
                });
        filterChain.doFilter(request, response);
    }

    private Optional<String> extractBearerToken(HttpServletRequest request){
        String header=request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")){
            return Optional.of(header.substring(7));
        }
        return Optional.empty();
    }
}
