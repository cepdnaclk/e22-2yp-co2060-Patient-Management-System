package com.pms.backend.patient.service;

import com.pms.backend.common.exception.AppException;
import com.pms.backend.patient.dto.PatientDto;
import com.pms.backend.patient.entity.Patient;
import com.pms.backend.patient.repository.PatientRepository;
import com.pms.backend.user.entity.User;
import com.pms.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientDto createPatient(Long userId, PatientDto patientDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

        if (patientRepository.existsByUserId(userId)) {
            throw new AppException("Patient profile already exists for this user", HttpStatus.CONFLICT);
        }

        Patient patient = Patient.builder()
                .user(user)
                .dateOfBirth(patientDto.getDateOfBirth())
                .gender(patientDto.getGender())
                .bloodType(patientDto.getBloodType())
                .emergencyContactName(patientDto.getEmergencyContactName())
                .emergencyContactPhone(patientDto.getEmergencyContactPhone())
                .medicalHistory(patientDto.getMedicalHistory())
                .allergies(patientDto.getAllergies())
                .currentMedications(patientDto.getCurrentMedications())
                .build();

        Patient savedPatient = patientRepository.save(patient);
        return convertToDto(savedPatient);
    }

    public PatientDto getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));
        return convertToDto(patient);
    }

    public PatientDto getPatientByUserId(Long userId) {
        Patient patient = patientRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException("Patient profile not found", HttpStatus.NOT_FOUND));
        return convertToDto(patient);
    }

    public List<PatientDto> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PatientDto updatePatient(Long id, PatientDto patientDto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));

        if (patientDto.getDateOfBirth() != null) {
            patient.setDateOfBirth(patientDto.getDateOfBirth());
        }
        if (patientDto.getGender() != null) {
            patient.setGender(patientDto.getGender());
        }
        if (patientDto.getBloodType() != null) {
            patient.setBloodType(patientDto.getBloodType());
        }
        if (patientDto.getEmergencyContactName() != null) {
            patient.setEmergencyContactName(patientDto.getEmergencyContactName());
        }
        if (patientDto.getEmergencyContactPhone() != null) {
            patient.setEmergencyContactPhone(patientDto.getEmergencyContactPhone());
        }
        if (patientDto.getMedicalHistory() != null) {
            patient.setMedicalHistory(patientDto.getMedicalHistory());
        }
        if (patientDto.getAllergies() != null) {
            patient.setAllergies(patientDto.getAllergies());
        }
        if (patientDto.getCurrentMedications() != null) {
            patient.setCurrentMedications(patientDto.getCurrentMedications());
        }

        Patient updatedPatient = patientRepository.save(patient);
        return convertToDto(updatedPatient);
    }

    public void deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));
        patientRepository.delete(patient);
    }

    private PatientDto convertToDto(Patient patient) {
        return PatientDto.builder()
                .id(patient.getId())
                .userId(patient.getUser().getId())
                .firstName(patient.getUser().getFirstName())
                .lastName(patient.getUser().getLastName())
                .email(patient.getUser().getEmail())
                .dateOfBirth(patient.getDateOfBirth())
                .gender(patient.getGender())
                .bloodType(patient.getBloodType())
                .mobileNumber(patient.getUser().getMobileNumber())
                .emergencyContactName(patient.getEmergencyContactName())
                .emergencyContactPhone(patient.getEmergencyContactPhone())
                .medicalHistory(patient.getMedicalHistory())
                .allergies(patient.getAllergies())
                .currentMedications(patient.getCurrentMedications())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }
}

