import React, { useState, useEffect } from "react";
import { Pill, CheckCircle, Clock, AlertCircle, Plus, X, Calendar, Check } from "lucide-react";
import { nurseDashboardService } from "../../../services/nurseDashboardService";

// Helper: Parse frequency into scheduled dose slots for the day
const getScheduleSlots = (frequency) => {
  const f = (frequency || "").toLowerCase();
  if (f.includes("bid") || f.includes("twice") || f.includes("two times") || f.includes("12 hour")) {
    return [
      { id: "morning", label: "Morning", time: "09:00 AM" },
      { id: "night", label: "Night", time: "09:00 PM" },
    ];
  }
  // q8h: exactly every 8 hours in a 24-hour cycle (06:00 AM -> 02:00 PM -> 10:00 PM)
  if (f.includes("q8h") || f.includes("8 hour")) {
    return [
      { id: "dose1", label: "Dose 1", time: "06:00 AM" },
      { id: "dose2", label: "Dose 2", time: "02:00 PM" },
      { id: "dose3", label: "Dose 3", time: "10:00 PM" },
    ];
  }
  if (f.includes("tid") || f.includes("three times")) {
    return [
      { id: "morning", label: "Morning", time: "08:00 AM" },
      { id: "afternoon", label: "Afternoon", time: "02:00 PM" },
      { id: "night", label: "Night", time: "08:00 PM" },
    ];
  }
  if (f.includes("qid") || f.includes("four times") || f.includes("q6h") || f.includes("6 hour")) {
    return [
      { id: "morning", label: "Morning", time: "06:00 AM" },
      { id: "noon", label: "Noon", time: "12:00 PM" },
      { id: "evening", label: "Evening", time: "06:00 PM" },
      { id: "night", label: "Night", time: "10:00 PM" },
    ];
  }
  if (f.includes("prn") || f.includes("as needed")) {
    return [
      { id: "prn", label: "As Needed", time: "PRN", isPrn: true },
    ];
  }
  return [
    { id: "daily", label: "Daily Dose", time: "09:00 AM" },
  ];
};

// Helper: Filter administrations recorded today
const getTodayAdmins = (administrations) => {
  const today = new Date().toDateString();
  return (administrations || []).filter((a) => {
    if (!a.administeredAt) return false;
    const aDate = new Date(a.administeredAt).toDateString();
    return aDate === today && (a.status === "GIVEN" || a.status === "given");
  });
};

// Helper: Format ISO time string into clean 12-hour format
const formatAdminTime = (isoString) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Helper: Safely map administrations to slots 1-to-1 without cross-contaminating slots
const matchSlotsToAdmins = (slots, todayAdmins) => {
  const claimedAdminIds = new Set();
  const slotAdminMap = {};

  // Pass 1: Strict match by slot id or slot label in notes
  slots.forEach((slot) => {
    const matched = todayAdmins.find(
      (a) =>
        !claimedAdminIds.has(a.id) &&
        (
          (a.notes || "").toLowerCase().includes(slot.id.toLowerCase()) ||
          (a.notes || "").toLowerCase().includes(slot.label.toLowerCase())
        )
    );
    if (matched) {
      claimedAdminIds.add(matched.id);
      slotAdminMap[slot.id] = matched;
    }
  });

  // Pass 2: Match unassigned administrations that don't belong to any other specific slot
  const otherSlotKeywords = slots.flatMap((s) => [s.id.toLowerCase(), s.label.toLowerCase()]);
  const unclaimedAdmins = todayAdmins.filter((a) => !claimedAdminIds.has(a.id));

  slots.forEach((slot) => {
    if (!slotAdminMap[slot.id] && unclaimedAdmins.length > 0) {
      const otherNames = otherSlotKeywords.filter(
        (k) => k !== slot.id.toLowerCase() && k !== slot.label.toLowerCase()
      );
      const genericIdx = unclaimedAdmins.findIndex((a) => {
        const notes = (a.notes || "").toLowerCase();
        return !otherNames.some((name) => notes.includes(name));
      });

      if (genericIdx !== -1) {
        const admin = unclaimedAdmins.splice(genericIdx, 1)[0];
        claimedAdminIds.add(admin.id);
        slotAdminMap[slot.id] = admin;
      }
    }
  });

  return slotAdminMap;
};

export default function MARCard({ patient }) {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [administeringId, setAdministeringId] = useState(null);
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "Daily",
    icd10Code: ""
  });

  useEffect(() => {
    async function loadMeds() {
      if (!patient?.id) {
        setMeds([]);
        return;
      }
      setLoading(true);
      try {
        const [orders, prescriptions] = await Promise.all([
          nurseDashboardService.getPatientMedications(patient.id),
          nurseDashboardService.getPatientPrescriptions(patient.id),
        ]);

        const orderMeds = (orders || []).map((o) => ({
          id: o.id,
          source: "order",
          medicationName: o.medicationName || o.name,
          dosage: o.dosage || o.dose,
          frequency: o.frequency,
          dueTime: o.dueTime || o.frequency,
          urgency: o.urgency || "normal",
          currentStatus: o.currentStatus || "pending",
          prescriber: o.doctorName || null,
          administrations: o.administrations || [],
        }));

        const rxMeds = (prescriptions || []).map((r) => ({
          id: `rx-${r.id}`,
          source: "prescription",
          medicationName: r.treatment || r.description?.split("\n")[0] || "Prescription",
          dosage: "As prescribed",
          frequency: "As prescribed",
          dueTime: "—",
          urgency: "normal",
          currentStatus: r.isFulfilled ? "given" : "pending",
          prescriber: r.doctorName || "Doctor",
          description: r.description,
          administrations: [],
        }));

        setMeds([...orderMeds, ...rxMeds]);
      } catch (error) {
        console.error("Failed to fetch meds", error);
      } finally {
        setLoading(false);
      }
    }
    loadMeds();
  }, [patient?.id]);

  // Administer a specific scheduled dose slot (Morning, Night, etc.)
  const handleAdministerSlot = async (medId, slot) => {
    const med = meds.find((m) => m.id === medId);
    if (!med || med.source !== "order") return;

    const slotLabel = slot?.label || "Dose";
    const slotTime = slot?.time || "";
    const noteText = `${slot?.id || "dose"}:${slotLabel} (${slotTime})`;

    setAdministeringId(`${medId}-${slot?.id || "default"}`);

    const newAdmin = {
      id: Date.now(),
      orderId: medId,
      status: "GIVEN",
      notes: noteText,
      administeredAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setMeds((prev) =>
      prev.map((m) => {
        if (m.id !== medId) return m;
        return {
          ...m,
          administrations: [...(m.administrations || []), newAdmin],
        };
      })
    );

    try {
      await nurseDashboardService.administerMedication({
        orderId: medId,
        status: "GIVEN",
        notes: noteText,
      });

      // Sync from backend
      const updatedOrders = await nurseDashboardService.getPatientMedications(patient.id);
      if (updatedOrders) {
        setMeds((prev) =>
          prev.map((m) => {
            const found = updatedOrders.find((uo) => uo.id === m.id);
            return found ? { ...m, administrations: found.administrations || [] } : m;
          })
        );
      }
    } catch (error) {
      console.error("Failed to record administration", error);
      // Revert on failure
      setMeds((prev) =>
        prev.map((m) => {
          if (m.id !== medId) return m;
          return {
            ...m,
            administrations: (m.administrations || []).filter((a) => a.id !== newAdmin.id),
          };
        })
      );
      alert("Failed to record administration. Please try again.");
    } finally {
      setAdministeringId(null);
    }
  };

  const handleAddMedication = async (e) => {
    e.preventDefault();
    if (!patient?.id) return;
    try {
      const newOrder = await nurseDashboardService.createMedicationOrder({
        patientId: patient.id,
        ...formData,
      });

      const mappedOrder = {
        id: newOrder.id,
        source: "order",
        medicationName: newOrder.medicationName,
        dosage: newOrder.dosage,
        frequency: newOrder.frequency,
        dueTime: newOrder.dueTime || newOrder.frequency,
        urgency: newOrder.urgency || "normal",
        currentStatus: newOrder.currentStatus || "pending",
        prescriber: null,
        administrations: [],
      };
      setMeds([mappedOrder, ...meds]);
      setIsModalOpen(false);
      setFormData({ medicationName: "", dosage: "", frequency: "Daily", icd10Code: "" });
    } catch (error) {
      console.error("Failed to add medication", error);
      alert("Failed to add medication order.");
    }
  };

  // Calculate total doses due today across all orders using exact slot mapping
  const totalDosesDue = meds.reduce((total, med) => {
    if (med.source !== "order") return total + (med.currentStatus === "pending" ? 1 : 0);
    const slots = getScheduleSlots(med.frequency);
    if (slots[0]?.isPrn) return total; // PRN doses are as-needed, not scheduled
    const todayAdmins = getTodayAdmins(med.administrations);
    const slotMap = matchSlotsToAdmins(slots, todayAdmins);
    const remaining = Math.max(0, slots.length - Object.keys(slotMap).length);
    return total + remaining;
  }, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-blue-900 flex items-center gap-2 text-base">
            <Pill className="w-5 h-5 text-blue-600" />
            Medication Administration Record (MAR)
          </h3>
          <p className="text-xs text-blue-700 mt-0.5 font-medium">
            {patient ? `Active prescriptions & orders for ${patient.firstName || patient.name}` : "No patient selected"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!patient}
            className="flex items-center gap-1.5 text-xs font-bold bg-white text-blue-700 px-3.5 py-2 rounded-xl border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" /> Add Medication
          </button>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${
            totalDosesDue > 0 ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-emerald-100 text-emerald-800"
          }`}>
            {totalDosesDue} Dose{totalDosesDue !== 1 ? "s" : ""} Due Today
          </span>
        </div>
      </div>

      {/* Medication Table */}
      <div className="p-0 flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3.5 min-w-[200px]">Medication & Details</th>
              <th className="px-5 py-3.5 min-w-[120px]">Dose / Route</th>
              <th className="px-6 py-3.5 min-w-[200px]">Daily Schedule</th>
              <th className="px-6 py-3.5 min-w-[240px] text-right sm:text-left">Administration (Today)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {meds.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Pill className="w-8 h-8 opacity-30" />
                    <p className="text-sm font-medium">
                      {loading ? "Loading medications..." : "No active medications found for this patient."}
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {meds.map((med) => {
              const slots = getScheduleSlots(med.frequency);
              const todayAdmins = getTodayAdmins(med.administrations);
              const slotAdminMap = matchSlotsToAdmins(slots, todayAdmins);
              const givenCount = Object.keys(slotAdminMap).length;
              const isAllGiven = !slots[0]?.isPrn && givenCount >= slots.length;

              return (
                <tr
                  key={med.id}
                  className={`transition-colors hover:bg-slate-50/70 ${
                    isAllGiven ? "bg-slate-50/40 opacity-75" : ""
                  }`}
                >
                  {/* Column 1: Medication Name & Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isAllGiven
                            ? "bg-slate-100 text-slate-400"
                            : med.source === "prescription"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <Pill className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className={`font-bold text-sm ${isAllGiven ? "text-slate-600" : "text-slate-900"}`}>
                          {med.medicationName || med.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {med.source === "prescription" ? (
                            <span className="text-[11px] text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md font-medium">
                              {med.prescriber ? `Prescribed by Dr. ${med.prescriber}` : "Doctor Rx"}
                            </span>
                          ) : (
                            <span className="text-[11px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md font-medium">
                              {med.prescriber ? `Dr. ${med.prescriber}` : "Nurse Order"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Dose / Route */}
                  <td className="px-5 py-4 align-top">
                    <p className="font-semibold text-slate-800">{med.dosage || med.dose}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {med.source === "prescription" ? "Oral / Rx" : "Oral (PO)"}
                    </p>
                  </td>

                  {/* Column 3: Daily Schedule & Progress */}
                  <td className="px-6 py-4 align-top">
                    <div className="flex flex-col gap-1.5">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-xs text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {med.frequency}
                      </span>
                      {med.source === "order" && !slots[0]?.isPrn && (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isAllGiven
                              ? "bg-emerald-100 text-emerald-800"
                              : givenCount > 0
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {givenCount} of {slots.length} given today
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Column 4: Schedule Dose Buttons (Morning, Night, etc.) */}
                  <td className="px-6 py-4 align-top">
                    {med.source === "order" ? (
                      <div className="flex flex-col gap-2">
                        {slots[0]?.isPrn ? (
                          // PRN: As-Needed Administration
                          <div className="flex flex-col gap-1.5">
                            <button
                              onClick={() => handleAdministerSlot(med.id, { id: "prn", label: "PRN Dose", time: "Now" })}
                              disabled={administeringId === `${med.id}-prn`}
                              className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm self-start flex items-center gap-1.5"
                            >
                              <Plus className="w-3.5 h-3.5" /> Give PRN Dose
                            </button>
                            {todayAdmins.length > 0 && (
                              <span className="text-[11px] text-slate-500">
                                Given {todayAdmins.length} time{todayAdmins.length > 1 ? "s" : ""} today (last at{" "}
                                {formatAdminTime(todayAdmins[todayAdmins.length - 1].administeredAt)})
                              </span>
                            )}
                          </div>
                        ) : (
                          // Scheduled Slots (Morning, Night, etc.)
                          <div className="flex flex-wrap gap-2">
                            {slots.map((slot) => {
                              // Safely check if this specific slot was administered
                              const slotAdmin = slotAdminMap[slot.id];
                              const isSlotGiven = Boolean(slotAdmin);
                              const isSubmitting = administeringId === `${med.id}-${slot.id}`;

                              return isSlotGiven ? (
                                <div
                                  key={slot.id}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs"
                                  title={`Administered at ${formatAdminTime(slotAdmin?.administeredAt)}`}
                                >
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{slot.label}:</span>
                                  <span className="text-emerald-700 font-bold">
                                    Given ({formatAdminTime(slotAdmin?.administeredAt)})
                                  </span>
                                </div>
                              ) : (
                                <button
                                  key={slot.id}
                                  onClick={() => handleAdministerSlot(med.id, slot)}
                                  disabled={isSubmitting}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white transition-all shadow-sm hover:shadow"
                                >
                                  <Pill className="w-3.5 h-3.5" />
                                  <span>Give {slot.label} ({slot.time})</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Prescriptions from Doctors
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold ${
                            med.currentStatus === "given"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {med.currentStatus === "given" ? "✓ Fulfilled" : "Pending Doctor Rx"}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Medication Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800">Add Medication Order</h3>
                <p className="text-xs text-slate-500 mt-0.5">Schedule new medication for this patient</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMedication} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Medication Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Paracetamol, Amoxicillin"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                  value={formData.medicationName}
                  onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Dosage</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 500mg, 10ml"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Schedule / Frequency</label>
                  <select
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  >
                    <option value="Daily">Daily (Once daily - 09:00 AM)</option>
                    <option value="BID (Twice daily)">BID (Twice daily - Morning & Night)</option>
                    <option value="TID (Three times daily)">TID (Three times - Morning, Afternoon, Night)</option>
                    <option value="q8h (Every 8 hours)">q8h (Every 8 hours - 06:00 AM, 02:00 PM, 10:00 PM)</option>
                    <option value="PRN (As needed)">PRN (As needed)</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/20"
                >
                  Save & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
