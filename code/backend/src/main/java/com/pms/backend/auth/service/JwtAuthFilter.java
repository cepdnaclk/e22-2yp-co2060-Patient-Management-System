package com.pms.backend.auth.service;


import com.pms.backend.config.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    // OncePerRequestFilter guarantees this runs exactly once per request

    private final JwtUtil                jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest  request,
            HttpServletResponse response,
            FilterChain         chain)
            throws ServletException, IOException {

        // ── STEP 1: Read Authorization header ──────────────────────
        // The frontend sends:  Authorization: Bearer eyJhbGci...
        String authHeader = request.getHeader("Authorization");

        // ── STEP 2: Skip if no header or wrong format ───────────────
        // /api/auth/login, /api/auth/signup have no token — skip them.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return; // exit the filter
        }

        // ── STEP 3: Extract token (remove "Bearer " prefix) ─────────
        // "Bearer eyJhbGci..." → "eyJhbGci..."
        String token = authHeader.substring(7);

        // ── STEP 4: Validate the token ──────────────────────────────
        if (!jwtUtil.isValid(token)) {
            chain.doFilter(request, response); // invalid token — no auth
            return;
        }

        // ── STEP 5: Load user from database ─────────────────────────
        // Extract email from token, then load full user from DB.
        // We load from DB to get the latest isActive status.
        String email = jwtUtil.getEmail(token);
        UserDetails user = userDetailsService.loadUserByUsername(email);

        // ── STEP 6: Tell Spring Security who this user is ───────────
        // This is the critical step. After this line, @PreAuthorize works.
        var authToken = new UsernamePasswordAuthenticationToken(
                user,
                null,                  // no credentials needed — JWT already validated
                user.getAuthorities()  // [ROLE_DOCTOR] or [ROLE_PATIENT] etc.
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
        // SecurityContextHolder stores auth for the duration of this request.
        // Controllers and @PreAuthorize read from here.

        // ── STEP 7: Continue to next filter / controller ────────────
        chain.doFilter(request, response);
    }
}
