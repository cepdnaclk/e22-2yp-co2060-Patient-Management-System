import React from 'react';

const ReportAndAnalytics = ({ patientName = "Rajesh Kumar", patientId = "PMS-00421" }) => {

  return (
    <div>
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Reports & Analytics</h1>
            <p className="text-slate-500">February 2026 Performance Overview • Kandy General Hospital</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-slate-200 rounded-3xl px-4 py-2 text-sm">
              <i className="fa-solid fa-calendar mr-2 text-slate-400"></i>
              <span>1 Feb - 24 Feb 2026</span>
            </div>
            <button onClick={() => alert("Generate New Report clicked!")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium">
              <i className="fa-solid fa-file-circle-plus"></i> Generate New Report
            </button>
            <button onClick={() => alert("Export All clicked!") }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium">
              <i className="fa-solid fa-download"></i> Export All
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-4 rounded shadow g-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Total Visits</p>
                <p className="text-4xl font-semibold mt-2">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">👥</div>
            </div>
            <p className="text-emerald-600 text-sm mt-4 flex items-center gap-1"><i className="fa-solid fa-arrow-trend-up"></i> +22%</p>
          </div>

          <div className="bg-white p-4 rounded shadow g-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Avg. Length of Stay</p>
                <p className="text-4xl font-semibold mt-2">3.2 <span className="text-base font-normal text-slate-400">days</span></p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl">🛏️</div>
            </div>
            <p className="text-amber-600 text-sm mt-4">−0.4 days vs last month</p>
          </div>

          <div className="bg-white p-4 rounded shadow g-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">Patient Satisfaction</p>
                <p className="text-4xl font-semibold mt-2">94% <span className="text-2xl">★★★★☆</span></p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">⭐</div>
            </div>
            <p className="text-emerald-600 text-sm mt-4">Based on 892 responses</p>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">

          <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm p-6">
            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-xl">Daily Patient Visits</h2>
              <select className="bg-slate-100 border-0 rounded-2xl text-sm px-4 py-2">
                <option>Last 30 days</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-80 flex items-end gap-1 pt-6 border-t border-slate-100 relative">

              <div className="flex-1 h-32 bg-gradient-to-t from-blue-500/20 to-transparent rounded-t"></div>
              <div className="flex-1 h-48 bg-gradient-to-t from-blue-500/30 to-transparent rounded-t"></div>
              <div className="flex-1 h-52 bg-gradient-to-t from-blue-500/40 to-transparent rounded-t"></div>
              <div className="flex-1 h-64 bg-gradient-to-t from-blue-500/60 to-transparent rounded-t"></div>
              <div className="flex-1 h-80 bg-gradient-to-t from-blue-500 to-transparent rounded-t relative">
                <div className="absolute -top-2 left-1/2 w-3 h-3 bg-white border-4 border-blue-600 rounded-full"></div>
              </div>
              <div className="flex-1 h-68 bg-gradient-to-t from-blue-500/70 to-transparent rounded-t"></div>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200"></div>
              <div className="text-[10px] text-slate-400 absolute -bottom-6 left-0 w-full flex justify-between px-2">
                <span>1 Feb</span><span>8 Feb</span><span>15 Feb</span><span>24 Feb</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6">
            <h2 className="font-semibold text-xl mb-6">Top Conditions (Feb 2026)</h2>
            <div className="flex items-center justify-center h-80 relative">

              <div className="w-64 h-64 rounded-full"
                   style={{ background: 'conic-gradient(#1e40af 0deg 120deg, #3b82f6 120deg 200deg, #60a5fa 200deg 260deg, #93c5fd 260deg 310deg, #bfdbfe 310deg 360deg)' }}></div>
              <div className="absolute w-36 h-36 bg-white rounded-full flex items-center justify-center text-center">
                <div>
                  <p className="text-4xl font-semibold">1,247</p>
                  <p className="text-xs text-slate-500">Total Cases</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mt-6">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-600 rounded"></div>Diabetes <span className="ml-auto font-medium">34%</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-400 rounded"></div>Hypertension <span className="ml-auto font-medium">27%</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-300 rounded"></div>Pregnancy <span className="ml-auto font-medium">18%</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-200 rounded"></div>Cardiac <span className="ml-auto font-medium">12%</span></div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex justify-between mb-6">
            <h2 className="font-semibold text-xl">Recent Generated Reports</h2>
            <button className="text-blue-600 text-sm hover:underline">View all reports →</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b">
                <th className="py-4 px-6 text-left">Report Name</th>
                <th className="py-4 px-6 text-left">Period</th>
                <th className="py-4 px-6 text-left">Generated By</th>
                <th className="py-4 px-6 text-left">Date</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="w-32"></th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y">
              <tr className="hover:bg-slate-50">
                <td className="py-5 px-6 font-medium">Monthly Revenue Summary</td>
                <td className="py-5 px-6 text-slate-500">Feb 2026</td>
                <td className="py-5 px-6">Dr. A. Perera</td>
                <td className="py-5 px-6 text-slate-500">24 Feb 2026</td>
                <td><span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-3xl text-xs">Completed</span></td>
                <td className="text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-700">📄 PDF</button>
                  <button className="text-emerald-600 hover:text-emerald-700">📊 Excel</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-5 px-6 font-medium">Patient Admission Trends</td>
                <td className="py-5 px-6 text-slate-500">Jan - Feb 2026</td>
                <td className="py-5 px-6">Admin</td>
                <td className="py-5 px-6 text-slate-500">23 Feb 2026</td>
                <td><span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-3xl text-xs">Completed</span></td>
                <td className="text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-700">📄 PDF</button>
                  <button className="text-emerald-600 hover:text-emerald-700">📊 Excel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <script>
      function generateReport() {
        alert("🎉 New report generation started!\n(You can connect this to your backend later)");
      }
      function exportAll() {
        alert("📤 All reports exported as ZIP!");
      }
      </script> */}

    </div>
  );
}
export default ReportAndAnalytics;
