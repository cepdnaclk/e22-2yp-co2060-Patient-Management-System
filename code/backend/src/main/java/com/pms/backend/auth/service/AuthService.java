package com.pms.backend.auth.service;


import com.pms.backend.auth.dto.AuthResponse;
import com.pms.backend.auth.dto.LoginRequest;
import com.pms.backend.auth.dto.SignupRequest;
import com.pms.backend.common.exception.AppException;
import com.pms.backend.role.entity.Role;
import com.pms.backend.user.dto.UserDto;
import com.pms.backend.user.entity.User;
import com.pms.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository  userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil         jwtUtil;

    // ── SIGNUP ──────────────────────────────────────────────────────
    public AuthResponse signup(SignupRequest req) {

        // 1. Check email not already taken
        if (userRepo.existsByEmail(req.getEmail())) {
            throw AppException.conflict("This email is already registered");
        }


        if (userRepo.existsByMobileNumber(req.getMobileNumber())) {
            throw AppException.conflict("This mobile number is already registered");
        }

        // 2. Build the user
        User.UserBuilder builder = User.builder();
        builder.firstName(req.getFirstName());
        builder.lastName(req.getLastName());
        builder.email(req.getEmail());
        builder.mobileNumber(req.getMobileNumber());
        builder.passwordHash(passwordEncoder.encode(req.getPassword()));
        builder.role(Role.PATIENT);
        builder.isActive(true);

        User user = builder.build();

        // 3. Save to database
        User saved = userRepo.save(user);

        // 4. Generate JWT token for the new user
        String token = jwtUtil.generateToken(saved);

        // 5. Return token + safe user info
        return new AuthResponse(token, UserDto.from(saved));
    }

    // ── LOGIN ────────────────────────────────────────────────────────
    public AuthResponse login(LoginRequest req) {

        // 1. Find user by email
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() ->
                                AppException.unauthorized("Invalid email or password")
                        // SECURITY: Same error message whether email not found OR password wrong.
                        // If we said "email not found" — attacker learns which emails exist.
                        // This is called "user enumeration" — we prevent it here.
                );

        // 2. Check account is active
        if (!user.isActive()) {
            throw AppException.unauthorized("Account deactivated. Contact admin.");
        }

        // 3. Check password
        // passwordEncoder.matches(plainText, storedHash)
        // BCrypt hashes the plainText and compares with the stored hash.
        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw AppException.unauthorized("Invalid email or password");
        }

        // 4. Credentials correct — generate token
        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token, UserDto.from(user));
    }
}
