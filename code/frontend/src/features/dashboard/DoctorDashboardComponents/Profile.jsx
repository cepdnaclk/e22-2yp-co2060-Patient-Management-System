import React from 'react';
// import { 
//   FaUser, FaPhone, FaEnvelope, FaCalendarAlt, 
//   FaPrescriptionBottleMedical, FaFlask, FaEdit, 
//   FaHeartbeat, FaThermometerHalf, FaLungs 
// } from 'react-icons/fa';

const PatientProfile = () => {
  return (
    <div className="flex-1 overflow-auto p-6 bg-slate-50">
      {/* Patient Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-2xl p-8 mb-10 flex items-center gap-8">
        <img 
          src="https://i.pravatar.cc/160?u=rajeshkumar" 
          alt="Rajesh Kumar"
          className="w-40 h-40 rounded-3xl object-cover ring-8 ring-white/30"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-bold">Rajesh Kumar</h1>
            <span className="bg-emerald-400 text-emerald-900 px-6 py-1.5 rounded-3xl text-sm font-semibold flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-900 rounded-full animate-pulse" />
              Active
            </span>
          </div>
          <p className="text-2xl mt-2 opacity-90">PMS-00421 • 52 years • Male • B+</p>
          <p className="mt-3 text-lg opacity-75">Admitted: 20 February 2026 • Primary Doctor: Dr. A. Perera</p>
        </div>

        {/* Quick Stats in Banner */}
        <div className="hidden lg:grid grid-cols-2 gap-8 text-sm">
          <div className="text-right">
            <div className="text-4xl font-semibold">172</div>
            <div className="opacity-75 text-xs">cm Height</div>
          </div>
          <div>
            <div className="text-4xl font-semibold">78</div>
            <div className="opacity-75 text-xs">kg Weight</div>
          </div>
          <div className="text-right col-span-2">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur px-6 py-3 rounded-3xl">
              <span>Allergies:</span>
              <span className="font-bold text-red-200">Penicillin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - All Info */}
        <div className="lg:col-span-8 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow p-8">
            <div className="flex items-center gap-4 mb-6">
              {/* <FaUser className="text-3xl text-blue-600" /> */}
              <h2 className="text-2xl font-semibold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-[15px]">
              <div>
                <p className="uppercase text-slate-400 text-xs tracking-widest mb-1">Address</p>
                <p className="font-medium">No. 45, Peradeniya Road,<br />Kandy, Sri Lanka</p>
              </div>
              <div>
                <p className="uppercase text-slate-400 text-xs tracking-widest mb-1">Phone</p>
                <a href="tel:+94712345678" className="font-medium flex items-center gap-2 hover:text-blue-600">
                  {/* <FaPhone /> +94 71 234 5678 */}+94 71 234 5678
                </a>
              </div>

              <div>
                <p className="uppercase text-slate-400 text-xs tracking-widest mb-1">Email</p>
                <a href="mailto:rajesh.kumar@email.com" className="font-medium hover:text-blue-600">
                  rajesh.kumar@email.com
                </a>
              </div>
              <div>
                <p className="uppercase text-slate-400 text-xs tracking-widest mb-1">Emergency Contact</p>
                <p className="font-medium">Priyanka Silva (Wife)<br />+94 77 123 4567</p>
              </div>
            </div>
          </div>

          {/* Current Vitals */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              {/* <FaHeartbeat className="text-red-500" /> */} Current Vitals
              <span className="text-xs text-slate-400 ml-auto">Last updated 2 hrs ago</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-semibold text-red-600">132/85</div>
                <div className="text-sm text-slate-500 mt-1">Blood Pressure</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-semibold">78</div>
                <div className="text-sm text-slate-500 mt-1">Heart Rate <span className="text-xs">bpm</span></div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-semibold">36.8</div>
                <div className="text-sm text-slate-500 mt-1">Temperature <span className="text-xs">°C</span></div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-semibold text-blue-600">97%</div>
                <div className="text-sm text-slate-500 mt-1">O₂ Saturation</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-7">
              <div className="flex gap-6">
                <div className="w-20 text-right text-xs text-slate-400 pt-1">23 Feb 2026</div>
                <div className="flex-1 border-l-2 border-blue-200 pl-6">
                  <p className="font-semibold">Follow-up Visit</p>
                  <p className="text-slate-600 text-sm mt-0.5">Diabetes review • HbA1c improved to 6.8%</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-20 text-right text-xs text-slate-400 pt-1">20 Feb 2026</div>
                <div className="flex-1 border-l-2 border-blue-200 pl-6">
                  <p className="font-semibold">Admitted</p>
                  <p className="text-slate-600 text-sm mt-0.5">Routine diabetes follow-up</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-20 text-right text-xs text-slate-400 pt-1">15 Feb 2026</div>
                <div className="flex-1 border-l-2 border-blue-200 pl-6">
                  <p className="font-semibold">Lab Test Completed</p>
                  <p className="text-slate-600 text-sm mt-0.5">CBC + Fasting Blood Sugar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Actions */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => alert('💊 New Prescription opened')}
                className="flex flex-col items-center justify-center gap-3 py-7 bg-blue-50 hover:bg-blue-100 rounded-3xl transition-all active:scale-95"
              >
                {/* <FaPrescriptionBottleMedical size={32} className="text-blue-600" /> */}
                <span className="font-medium text-sm">New Prescription</span>
              </button>

              <button 
                onClick={() => alert('📅 Booking new appointment')}
                className="flex flex-col items-center justify-center gap-3 py-7 bg-emerald-50 hover:bg-emerald-100 rounded-3xl transition-all active:scale-95"
              >
                {/* <FaCalendarAlt size={32} className="text-emerald-600" /> */}
                <span className="font-medium text-sm">Book Appointment</span>
              </button>

              <button 
                onClick={() => alert('🧪 Lab test request')}
                className="flex flex-col items-center justify-center gap-3 py-7 bg-violet-50 hover:bg-violet-100 rounded-3xl transition-all active:scale-95"
              >
                {/* <FaFlask size={32} className="text-violet-600" /> */}
                <span className="font-medium text-sm">Order Lab Test</span>
              </button>

              <button 
                onClick={() => alert('✏️ Edit profile modal')}
                className="flex flex-col items-center justify-center gap-3 py-7 bg-amber-50 hover:bg-amber-100 rounded-3xl transition-all active:scale-95"
              >
                {/* <FaEdit size={32} className="text-amber-600" /> */}
                <span className="font-medium text-sm">Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Next Appointment */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow">
            <p className="text-blue-200 text-sm mb-1">NEXT APPOINTMENT</p>
            <p className="text-3xl font-bold">Tomorrow<br />10:30 AM</p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center text-3xl">🩺</div>
              <div>
                <p className="font-medium">Dr. A. Perera</p>
                <p className="text-blue-100 text-sm">Diabetes Review</p>
              </div>
            </div>
          </div>

          {/* Insurance & Billing */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-xl font-semibold mb-6">Insurance &amp; Billing</h2>
            <div className="space-y-6 text-sm">
              <div>
                <p className="text-slate-400">Policy Status</p>
                <p className="font-semibold text-emerald-600">Active — ABC Health Insurance</p>
              </div>
              <div>
                <p className="text-slate-400">Last Bill</p>
                <p className="font-semibold">LKR 12,450 <span className="text-emerald-500 font-medium">(Paid 22 Feb)</span></p>
              </div>
            </div>
            <button className="mt-8 w-full py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl text-blue-600 font-medium transition">
              View Full Billing History →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;