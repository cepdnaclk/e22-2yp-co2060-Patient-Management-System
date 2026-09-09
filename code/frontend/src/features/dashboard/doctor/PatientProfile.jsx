import React, { useState, useEffect } from "react";
import PatientSearch from "./PatientSearch.jsx";
import PatientRecordList from "./PatientRecordList.jsx";
import MedicalRecordForm from "./MedicalRecordForm.jsx";
import New_Prescription from "../DoctorDashboardComponents/Pharmacy.jsx";
import { patientRecordService } from "../../../services/patientRecordService";
import { fileUploadService } from "../../../services/fileUploadService";
import { useAuth } from "../../auth/AuthContext";
import { Card, CardContent } from "../../../components/ui/Card.jsx";
import { Badge } from "../../../components/ui/Badge.jsx";
import { Activity, Droplet, Ruler, Weight, AlertTriangle } from "lucide-react";

export default function PatientProfile({ onUpdate, initialPatient }) {
  const { user, isNurse } = useAuth();
  const doctorName = user ? `Dr. ${user.firstName} ${user.lastName}` : "System";
  const doctorId = user?.id || null;

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [savingPrescription, setSavingPrescription] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [labTestName, setLabTestName] = useState("");
  const [labTestNotes, setLabTestNotes] = useState("");
  const [labAttachment, setLabAttachment] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [editedVitals, setEditedVitals] = useState({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    oxygenSaturation: "",
    height: "",
    weight: "",
    allergies: "",
  });
  const [savingVitals, setSavingVitals] = useState(false);

  // Auto-select a patient when navigated from the critical alerts panel
  useEffect(() => {
    if (initialPatient) {
      handleSelectPatient(initialPatient);
    }
  }, [initialPatient?.id]);

  const handleOrderLabTest = async () => {
    if (!selectedPatient || !labTestName.trim()) return;

    setUploadingFile(true);
    try {
      let attachmentUrl = null;
      if (labAttachment) {
        const uploadResult = await fileUploadService.uploadFile(labAttachment);
        attachmentUrl = uploadResult.fileName;
      }

      const createdRecord = await patientRecordService.createMedicalRecord(
        selectedPatient.id,
        {
          date: new Date().toISOString().slice(0, 10),
          type: "LAB_TEST",
          title: labTestName,
          description: labTestNotes || "No clinical notes provided",
          isFulfilled: false,
          attachmentUrl,
        },
        doctorId
      );

      setRecords((prev) => [createdRecord, ...prev]);
      setShowLabModal(false);
      setLabTestName("");
      setLabTestNotes("");
      setLabAttachment(null);
      alert("Lab Test ordered successfully.");
    } catch (err) {
      alert("Failed to order Lab Test.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setLoadingRecords(true);
    try {
      const [fetchedRecords, detailedPatient] = await Promise.all([
        patientRecordService.getPatientRecords(patient.id),
        patientRecordService.getPatientDetails(patient.id),
      ]);

      if (detailedPatient) {
        setSelectedPatient(detailedPatient);
      }
      setRecords(fetchedRecords || []);
    } catch (error) {
      console.error("Failed to load patient details", error);
      setRecords([]);
    } finally {
      setLoadingRecords(false);
    }
  };

  const handleToggleCritical = async () => {
    if (!selectedPatient) return;
    try {
      const updatedPatient = await patientRecordService.toggleCriticalStatus(
        selectedPatient.id,
        !selectedPatient.criticalStatus
      );
      setSelectedPatient(updatedPatient);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      alert("Failed to update critical status.");
    }
  };

  const handleSaveVitals = async () => {
    setSavingVitals(true);
    try {
      const updatedPatient = await patientRecordService.updatePatientVitals(
        selectedPatient.id,
        editedVitals
      );
      setSelectedPatient(updatedPatient);
      setIsEditingVitals(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update vitals.");
    } finally {
      setSavingVitals(false);
    }
  };

  const handleSaveRecord = async (newRecord) => {
    if (!selectedPatient) return;

    // newRecord should contain 'type', 'title', 'description'
    const createdRecord = await patientRecordService.createMedicalRecord(
      selectedPatient.id,
      newRecord,
      doctorId
    );

    if (createdRecord) {
      setRecords((prev) => [createdRecord, ...prev]);
    }
  };

  const handleSavePrescription = async (medicines) => {
    if (!selectedPatient?.id) return;

    const normalizedMedicines = medicines.filter(
      (m) => m.name?.trim() || m.dosage?.trim() || m.frequency?.trim() || m.duration?.trim() || m.notes?.trim()
    );

    if (normalizedMedicines.length === 0) {
      alert("Please add at least one medicine before saving.");
      return;
    }

    const title = normalizedMedicines.map((m) => m.name?.trim()).filter(Boolean).slice(0, 2).join(", ") || "Prescription";
    const description = normalizedMedicines
      .map((m, i) => {
        const parts = [
          m.name?.trim(),
          m.dosage?.trim(),
          m.frequency?.trim(),
          m.duration?.trim(),
          m.notes?.trim() ? `Notes: ${m.notes.trim()}` : "",
        ].filter(Boolean);
        return `${i + 1}. ${parts.join(" | ")}`;
      })
      .join("\n");

    setSavingPrescription(true);
    try {
      const createdRecord = await patientRecordService.createMedicalRecord(
        selectedPatient.id,
        {
          date: new Date().toISOString().slice(0, 10),
          type: "PRESCRIPTION",
          title,
          description,
        },
        doctorId
      );

      setRecords((prev) => [createdRecord, ...prev]);
      alert("Prescription saved successfully.");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to save prescription.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setSavingPrescription(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Records</h1>
          <p className="text-sm text-slate-500 mt-1">Search patients to view or update their medical profiles.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Find Patient</h3>
          <PatientSearch onSelectPatient={handleSelectPatient} />
        </div>

        {selectedPatient && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
            {/* Patient Header Card */}
            <div className={`rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden transition-colors duration-500 text-white ${selectedPatient.criticalStatus ? 'bg-gradient-to-r from-red-600 to-rose-700 shadow-red-200/50' : 'bg-gradient-to-r from-blue-600 to-indigo-700'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold ring-4 ring-white/30 shrink-0 z-10 backdrop-blur-sm">
                {selectedPatient.name?.charAt(0).toUpperCase() || "?"}
              </div>

              <div className="flex-1 text-center sm:text-left z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-3xl sm:text-4xl font-bold">{selectedPatient.name}</h2>
                    {selectedPatient.admissionStatus === "ADMITTED" ? (
                      <Badge className="bg-amber-400 text-amber-900 border-amber-300">In-Patient</Badge>
                    ) : (
                      <Badge className="bg-emerald-400 text-emerald-900 border-emerald-300">Out-Patient</Badge>
                    )}
                    {selectedPatient.criticalStatus && (
                      <Badge className="bg-red-900 text-red-100 border-red-800 animate-pulse flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> CRITICAL
                      </Badge>
                    )}
                  </div>

                  <button
                    onClick={handleToggleCritical}
                    className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 ${selectedPatient.criticalStatus ? 'bg-white text-red-700 hover:bg-red-50' : 'bg-red-500 hover:bg-red-400 text-white border border-red-400'}`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {selectedPatient.criticalStatus ? "Remove Critical Flag" : "Mark as Critical"}
                  </button>
                </div>
                <p className="text-blue-100 text-lg mb-4">
                  {selectedPatient.displayId || selectedPatient.patientId || `ID: ${selectedPatient.id}`} • {selectedPatient.age || "N/A"} years • {selectedPatient.gender || "N/A"}
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-red-300" /> Blood: <span className="font-semibold">{selectedPatient.bloodGroup || "N/A"}</span>
                  </div>
                  
                  {!isNurse && (
                    <button
                      onClick={() => setShowLabModal(true)}
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl flex items-center gap-2 transition-all font-semibold"
                    >
                      <Activity className="w-4 h-4" />
                      Order Lab Test
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 lg:flex-none w-full lg:w-[480px] bg-white/10 rounded-2xl p-4 sm:p-5 mt-4 sm:mt-0 relative backdrop-blur-sm border border-white/10 shadow-inner z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-blue-50 text-sm tracking-wide uppercase">Patient Vitals & Info</h3>
                  {!isEditingVitals ? (
                    <button
                      onClick={() => {
                        setEditedVitals({
                          bloodPressure: selectedPatient.bloodPressure || "",
                          heartRate: selectedPatient.heartRate || "",
                          temperature: selectedPatient.temperature || "",
                          oxygenSaturation: selectedPatient.oxygenSaturation || "",
                          height: selectedPatient.height || "",
                          weight: selectedPatient.weight || "",
                          allergies: selectedPatient.allergies || ""
                        });
                        setIsEditingVitals(true);
                      }}
                      className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition font-medium text-white"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setIsEditingVitals(false)} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition text-white">Cancel</button>
                      <button onClick={handleSaveVitals} disabled={savingVitals} className="text-xs bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-full transition font-bold text-white shadow-lg shadow-emerald-500/20">{savingVitals ? "Saving..." : "Save"}</button>
                    </div>
                  )}
                </div>

                {!isEditingVitals ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 text-sm">
                    <div><span className="text-blue-200/80 text-[11px] uppercase tracking-wider block mb-0.5">BP</span><span className="font-semibold text-base">{selectedPatient.bloodPressure || "N/A"}</span></div>
                    <div><span className="text-blue-200/80 text-[11px] uppercase tracking-wider block mb-0.5">HR</span><span className="font-semibold text-base">{selectedPatient.heartRate ? `${selectedPatient.heartRate} bpm` : "N/A"}</span></div>
                    <div><span className="text-blue-200/80 text-[11px] uppercase tracking-wider block mb-0.5">Temp</span><span className="font-semibold text-base">{selectedPatient.temperature ? `${selectedPatient.temperature} °C` : "N/A"}</span></div>
                    <div><span className="text-blue-200/80 text-[11px] uppercase tracking-wider block mb-0.5">O2 Sat</span><span className="font-semibold text-base">{selectedPatient.oxygenSaturation ? `${selectedPatient.oxygenSaturation}%` : "N/A"}</span></div>
                    <div><span className="text-blue-200/80 text-[11px] uppercase tracking-wider block mb-0.5">Height</span><span className="font-semibold text-base">{selectedPatient.height ? `${selectedPatient.height} cm` : "N/A"}</span></div>
                    <div><span className="text-blue-200/80 text-[11px] uppercase tracking-wider block mb-0.5">Weight</span><span className="font-semibold text-base">{selectedPatient.weight ? `${selectedPatient.weight} kg` : "N/A"}</span></div>
                    <div className="col-span-2"><span className="text-blue-200/80 text-[11px] uppercase tracking-wider block mb-0.5">Allergies</span><span className="font-semibold text-base text-red-200">{selectedPatient.allergies || "None"}</span></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-3 text-sm">
                    <div>
                      <span className="text-blue-200/80 text-[10px] uppercase tracking-wider block mb-1">BP</span>
                      <input type="text" value={editedVitals.bloodPressure} onChange={e => setEditedVitals({ ...editedVitals, bloodPressure: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="120/80" />
                    </div>
                    <div>
                      <span className="text-blue-200/80 text-[10px] uppercase tracking-wider block mb-1">HR (bpm)</span>
                      <input type="number" value={editedVitals.heartRate} onChange={e => setEditedVitals({ ...editedVitals, heartRate: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="80" />
                    </div>
                    <div>
                      <span className="text-blue-200/80 text-[10px] uppercase tracking-wider block mb-1">Temp (°C)</span>
                      <input type="number" step="0.1" value={editedVitals.temperature} onChange={e => setEditedVitals({ ...editedVitals, temperature: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="37.0" />
                    </div>
                    <div>
                      <span className="text-blue-200/80 text-[10px] uppercase tracking-wider block mb-1">O2 Sat (%)</span>
                      <input type="number" value={editedVitals.oxygenSaturation} onChange={e => setEditedVitals({ ...editedVitals, oxygenSaturation: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="98" />
                    </div>
                    <div>
                      <span className="text-blue-200/80 text-[10px] uppercase tracking-wider block mb-1">Height (cm)</span>
                      <input type="number" value={editedVitals.height} onChange={e => setEditedVitals({ ...editedVitals, height: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="170" />
                    </div>
                    <div>
                      <span className="text-blue-200/80 text-[10px] uppercase tracking-wider block mb-1">Weight (kg)</span>
                      <input type="number" value={editedVitals.weight} onChange={e => setEditedVitals({ ...editedVitals, weight: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="70" />
                    </div>
                    <div className="col-span-2">
                      <span className="text-blue-200/80 text-[10px] uppercase tracking-wider block mb-1">Allergies</span>
                      <input type="text" value={editedVitals.allergies} onChange={e => setEditedVitals({ ...editedVitals, allergies: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="Peanuts, Penicillin" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-6">
                <div className="h-[600px]">
                  <PatientRecordList records={records} loading={loadingRecords} />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <MedicalRecordForm
                  patient={selectedPatient}
                  onSaveRecord={handleSaveRecord}
                  doctorName={doctorName}
                  isNurse={isNurse}
                />

              </div>
            </div>

            {!isNurse && (
              <div id="prescription-section" className="w-full mt-6">
                <New_Prescription
                  patientName={selectedPatient.name}
                  patientId={selectedPatient.displayId || selectedPatient.patientId}
                  onSavePrescription={handleSavePrescription}
                  saving={savingPrescription}
                />
              </div>
            )}
          </div>
        )}

        {showLabModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowLabModal(false)} />
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">Order Lab Test</h3>
                <p className="text-sm text-slate-500 mt-1">Request a laboratory test for {selectedPatient?.name}</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Test Name / Panel</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. Complete Blood Count (CBC)"
                    value={labTestName}
                    onChange={(e) => setLabTestName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Clinical Notes / Instructions</label>
                  <textarea
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-24 resize-none"
                    placeholder="e.g. Fasting required for 12 hours..."
                    value={labTestNotes}
                    onChange={(e) => setLabTestNotes(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Attachment (PDF / Image)</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 transition-colors text-sm text-slate-500">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.gif"
                        className="hidden"
                        onChange={(e) => setLabAttachment(e.target.files[0] || null)}
                      />
                      {labAttachment ? labAttachment.name : "Choose file..."}
                    </label>
                    {labAttachment && (
                      <button
                        onClick={() => setLabAttachment(null)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => setShowLabModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOrderLabTest}
                  disabled={!labTestName.trim() || uploadingFile}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploadingFile ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading...</>
                  ) : "Submit Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


