package com.pms.backend.patient.service;

import com.pms.backend.common.exception.AppException;
import com.pms.backend.patient.dto.PatientDto;
import com.pms.backend.patient.dto.PatientRegistrationRequest;
import com.pms.backend.patient.entity.Patient;
import com.pms.backend.patient.repository.PatientRepository;
import com.pms.backend.user.entity.User;
import com.pms.backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private PatientService patientService;

    @Test
    void testRegisterPatient_EmailAlreadyExists_ThrowsException() {
        // Arrange
        PatientRegistrationRequest request = new PatientRegistrationRequest();
        request.setEmail("duplicate@test.com");
        
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);

        // Act & Assert
        AppException exception = assertThrows(AppException.class, () -> {
            patientService.registerPatient(request);
        });
        assertEquals("This email is already registered", exception.getMessage());
        
        // Verify that we never tried to save anything
        verify(userRepository, never()).save(any());
        verify(patientRepository, never()).save(any());
    }

    @Test
    void testRegisterPatient_Success() {
        // Arrange
        PatientRegistrationRequest request = new PatientRegistrationRequest();
        request.setEmail("new@test.com");
        request.setMobileNumber("1234567890");
        request.setFirstName("John");
        request.setLastName("Doe");

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(userRepository.existsByMobileNumber(request.getMobileNumber())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
        
        User savedUser = new User();
        savedUser.setId(1L);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        Patient savedPatient = new Patient();
        savedPatient.setId(1L);
        savedPatient.setUser(savedUser);
        when(patientRepository.save(any(Patient.class))).thenReturn(savedPatient);

        // Act
        PatientDto result = patientService.registerPatient(request);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        
        // Verify both repositories were called once
        verify(userRepository, times(1)).save(any(User.class));
        verify(patientRepository, times(1)).save(any(Patient.class));
    }
}
