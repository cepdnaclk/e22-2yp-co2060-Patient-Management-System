package com.pms.backend.doctor.repository;

import com.pms.backend.doctor.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    List<Doctor> findBySpecialization(String specialization);

    List<Doctor> findByIsAvailableTrue();

    Optional<Doctor> findByLicenseNumber(String licenseNumber);
}

