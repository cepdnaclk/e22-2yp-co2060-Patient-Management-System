package com.pms.backend.auth.controller;



import com.pms.backend.auth.dto.AuthResponse;
import com.pms.backend.auth.dto.LoginRequest;
import com.pms.backend.auth.dto.SignupRequest;
import com.pms.backend.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
// @RestController = @Controller + @ResponseBody
// Every method automatically serializes return values to JSON.

@RequestMapping("/api/auth")
// All routes in this controller start with /api/auth

@RequiredArgsConstructor

@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    // Maps POST http://localhost:8080/api/auth/signup
    public ResponseEntity<AuthResponse> signup(
            @Valid @RequestBody SignupRequest request) {
        // @Valid: triggers all @NotBlank, @Email, @Size checks in SignupRequest
        //         If any fail → GlobalExceptionHandler handles it automatically
        // @RequestBody: reads the JSON body and maps it to SignupRequest
        AuthResponse response = authService.signup(request);
        return ResponseEntity.status(201).body(response);
        // 201 Created = "resource was successfully created"
    }

    @PostMapping("/login")
    // Maps POST http://localhost:8080/api/auth/login
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
        // ResponseEntity.ok() = 200 OK
    }
}
