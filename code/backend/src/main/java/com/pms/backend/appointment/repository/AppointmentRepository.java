package com.pms.backend.appointment.repository;

import com.pms.backend.appointment.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByStatus(String status);

    List<Appointment> findByAppointmentDateTimeBetween(LocalDateTime start, LocalDateTime end);

    List<Appointment> findByDoctorIdAndAppointmentDateTimeBetween(Long doctorId, LocalDateTime start, LocalDateTime end);

    List<Appointment> findByPatientIdAndAppointmentDateTimeBetween(Long patientId, LocalDateTime start, LocalDateTime end);
}

