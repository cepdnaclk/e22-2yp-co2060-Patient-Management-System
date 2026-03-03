package com.pms.backend.doctor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDto {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String specialization;
    private String licenseNumber;
    private String hospital;
    private String department;
    private Double consultationFee;
    private String bio;
    private Boolean isAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

