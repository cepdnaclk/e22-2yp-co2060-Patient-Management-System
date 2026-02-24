import React, { useState } from "react";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMenuLabel, setNewMenuLabel] = useState("");
    const [customMenus, setCustomMenus] = useState([]);
  
    const addMenu = (e) => {
      e.preventDefault();
      const label = newMenuLabel.trim();
      if (!label) return;
      setCustomMenus((c) => [...c, label]);
      setNewMenuLabel("");
      setIsModalOpen(false);
    };
  
    const stats = [
      { id: 1, label: "Patients", value: 124 },
      { id: 2, label: "Appointments Today", value: 8 },
      { id: 3, label: "Critical Alerts", value: 5 },
      { id: 4, label: "Messages", value: 3 },
      
    ];
  
    const appointments = [
      { time: "09:00", patient: "John Doe", reason: "Follow-up" },
      { time: "10:30", patient: "Jane Smith", reason: "New complaint" },
      { time: "13:00", patient: "Ali Khan", reason: "Prescriptions" },
    ];
  

    return (
      <div>
       <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
        <p className="text-sm text-gray-600">Overview of today's activity</p>
      </div>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 ">
        {stats.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded shadow flex flex-col justify-between g-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden"
          >
            <div>
              <div className="text-sm text-gray-500">{s.label}</div>
              <div className="text-2xl font-bold">{s.value}</div>
            </div>
            <div className="text-xs text-green-600 mt-3">Updated now</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow g-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden">
          <h2 className="text-lg font-medium mb-3">Today's Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="py-2">Time</th>
                  <th className="py-2">Patient</th>
                  <th className="py-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, idx) => (
                  <tr key={idx} className="odd:bg-slate-50">
                    <td className="py-2">{a.time}</td>
                    <td className="py-2">{a.patient}</td>
                    <td className="py-2">{a.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow g-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden">
          <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
          <div className="flex flex-col space-y-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Create Prescription</button>
            <button className="px-4 py-2 border border-gray-300 rounded">Add Patient Note</button>
            <button className="px-4 py-2 border border-gray-300 rounded">Message Patient</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    );
        
}

export default Dashboard;