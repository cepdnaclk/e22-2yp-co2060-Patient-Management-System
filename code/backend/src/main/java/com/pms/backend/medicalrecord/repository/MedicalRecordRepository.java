package com.pms.backend.medicalrecord.repository;

import com.pms.backend.medicalrecord.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatientId(Long patientId);

    List<MedicalRecord> findByDoctorId(Long doctorId);

    List<MedicalRecord> findByRecordType(String recordType);

    List<MedicalRecord> findByPatientIdAndRecordType(Long patientId, String recordType);
}

