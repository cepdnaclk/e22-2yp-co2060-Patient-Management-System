import api from "./axiosClient";

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "N/A";
  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return "N/A";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
};

const formatPatient = (patient) => ({
  id: patient.id,
  displayId: `PMS-${String(patient.id).padStart(5, "0")}`,
  name: `${patient.firstName || ""} ${patient.lastName || ""}`.trim(),
  age: calculateAge(patient.dateOfBirth),
  gender: patient.gender || "N/A",
  bloodGroup: patient.bloodType || "N/A",
  admittedDate: patient.createdAt
    ? new Date(patient.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A",
  primaryDoctor: "Assigned Doctor",
  avatar: `https://i.pravatar.cc/160?u=patient-${patient.id}`,
  allergies: patient.allergies || "None",
});

const formatRecord = (record) => ({
  id: record.id,
  date: record.createdAt
    ? new Date(record.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A",
  type: record.recordType || "Record",
  title: record.diagnosis || record.testName || "Medical Record",
  description:
    record.description || record.treatment || record.testResult || "No details",
  doctor: record.doctorName || "Doctor",
});

export const patientRecordService = {
  async getAllPatients() {
    const { data } = await api.get("/api/patients");
    return (data || []).map(formatPatient);
  },

  async getPatientRecords(patientId) {
    if (!patientId) return [];
    const { data } = await api.get(`/api/medical-records/patient/${patientId}`);
    return (data || []).map(formatRecord);
  },
};
