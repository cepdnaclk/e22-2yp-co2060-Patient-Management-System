import React, { useState, useEffect } from "react";
import { ClipboardList, CheckSquare, Square, Loader2 } from "lucide-react";
import { nurseDashboardService } from "../../../services/nurseDashboardService";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function ClinicalOrdersCard({ patient }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load clinical orders from the backend API
  useEffect(() => {
    async function loadOrders() {
      if (!patient?.id) {
        setOrders([]);
        return;
      }
      setLoading(true);
      try {
        const data = await nurseDashboardService.getPatientClinicalOrders(patient.id);
        setOrders(data || []);
      } catch (error) {
        console.error("Failed to fetch clinical orders", error);
        // Fallback to empty — nurse will see "No active orders"
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [patient?.id]);

  const toggleOrder = async (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order || order.status === "COMPLETED") return;

    // Optimistic UI update
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: "COMPLETED" } : o
      )
    );

    try {
      await nurseDashboardService.completeClinicalOrder(id, user?.id);
    } catch (error) {
      console.error("Failed to complete clinical order", error);
      // Revert on error
      setOrders(
        orders.map((o) =>
          o.id === id ? { ...o, status: order.status } : o
        )
      );
    }
  };

  const pendingCount = orders.filter((o) => o.status === "PENDING").length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4 border-b border-orange-100 flex items-center justify-between">
        <h3 className="font-bold text-orange-900 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-orange-600" />
          Clinical Orders
        </h3>
        <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {pendingCount} Pending
        </span>
      </div>

      <div className="p-2 flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center p-6 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            No active clinical orders for this patient.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              onClick={() => toggleOrder(order.id)}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <button className="mt-0.5 text-slate-400 group-hover:text-orange-500 transition-colors">
                {order.status === "COMPLETED" ? (
                  <CheckSquare className="w-5 h-5 text-orange-500" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
              <div>
                <p
                  className={`font-semibold text-sm ${
                    order.status === "COMPLETED"
                      ? "text-slate-500 line-through"
                      : "text-slate-800"
                  }`}
                >
                  {order.description || order.orderDescription || "Clinical Order"}
                </p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {order.type || order.orderType || "ORDER"} ORDER
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
