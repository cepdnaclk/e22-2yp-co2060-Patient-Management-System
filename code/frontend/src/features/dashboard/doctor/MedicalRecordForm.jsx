import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { FileText, Save, Loader2, Keyboard, PenTool } from "lucide-react";
import DrawingPad from "../../../components/ui/DrawingPad.jsx";
import { fileUploadService } from "../../../services/fileUploadService.js";

export default function MedicalRecordForm({ patient, onSaveRecord, doctorName, loading, isNurse }) {
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: "Note",
    title: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [inputType, setInputType] = useState("TEXT");
  const drawingPadRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRecord.title) {
      alert("Please fill out Title.");
      return;
    }

    if (inputType === "TEXT" && !newRecord.description) {
      alert("Please fill out Description.");
      return;
    }

    setSaving(true);
    try {
      let finalAttachmentUrl = null;
      let finalDescription = newRecord.description;

      if (inputType === "DRAW" && drawingPadRef.current) {
        const blob = await drawingPadRef.current.getCanvasBlob();
        if (blob) {
          const file = new File([blob], `handwritten_note_${Date.now()}.png`, { type: "image/png" });
          const uploadResult = await fileUploadService.uploadFile(file);
          finalAttachmentUrl = uploadResult.fileName;
          finalDescription = newRecord.description || "Handwritten Note";
        }
      }

      const recordToSave = {
        ...newRecord,
        description: finalDescription,
      };

      if (finalAttachmentUrl) {
        recordToSave.attachmentUrl = finalAttachmentUrl;
      }

      await onSaveRecord(recordToSave);
      
      setNewRecord({
        date: new Date().toISOString().slice(0, 10),
        type: "Note",
        title: "",
        description: "",
      });
      setInputType("TEXT");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!patient) return null;

  return (
    <Card className="border-none shadow-md shadow-slate-200/50">
      <CardHeader title={isNurse ? "Add Nursing Note" : "Add New Clinical Record"} />
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Record Type</label>
              <select
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                disabled={isNurse}
              >
                {isNurse ? (
                  <option value="Note">Clinical Note</option>
                ) : (
                  <>
                    <option value="Diagnosis">Diagnosis</option>
                    <option value="Note">Clinical Note</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Allergy">Allergy Update</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              placeholder={isNurse ? "e.g. Patient Observation" : "e.g. Follow-up Checkup"}
              value={newRecord.title}
              onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 gap-2">
              <label className="block text-sm font-medium text-slate-700">Detailed Notes</label>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setInputType("TEXT")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    inputType === "TEXT" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Keyboard className="w-3.5 h-3.5" /> Type
                </button>
                <button
                  type="button"
                  onClick={() => setInputType("DRAW")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    inputType === "DRAW" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" /> Draw
                </button>
              </div>
            </div>
            
            {inputType === "TEXT" ? (
              <textarea
                placeholder={isNurse ? "Describe your observations about the patient's condition..." : "Enter clinical observations, diagnosis, or procedure details..."}
                value={newRecord.description}
                onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-32 resize-y focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                required={inputType === "TEXT"}
              />
            ) : (
              <DrawingPad ref={drawingPadRef} className="w-full h-[240px]" />
            )}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={saving || loading}
              icon={saving ? Loader2 : Save}
              className={saving ? "opacity-70" : ""}
            >
              {saving ? "Saving Record..." : "Save Record"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
