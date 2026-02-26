package com.pms.backend.auth.dto;



import com.pms.backend.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class AuthResponse {
    private String  token;  // JWT — frontend stores in localStorage
    private UserDto user;   // Safe user info for display
}

// Example JSON the frontend receives:
// {
//   "token": "eyJhbGciOiJIUzI1NiJ9...",
//   "user": {
//     "id": 1,
//     "firstName": "John",
//     "lastName": "Smith",
//     "email": "john@hospital.com",
//     "role": "DOCTOR"
//   }
// }
