"use client";

import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AnalyticsCards({ registrations }: { registrations: any[] }) {
  const total = registrations.length;
  const verified = registrations.filter(r => r.paymentStatus === 'verified').length;
  const pending = registrations.filter(r => r.paymentStatus === 'pending').length;
  const rejected = registrations.filter(r => r.paymentStatus === 'rejected').length;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium shadow-sm">
        <Users className="w-4 h-4 text-gray-500" />
        Total: <span className="font-bold">{total}</span>
      </div>
      
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm font-medium shadow-sm">
        <Clock className="w-4 h-4 text-amber-600" />
        Pending: <span className="font-bold">{pending}</span>
      </div>
      
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm font-medium shadow-sm">
        <CheckCircle className="w-4 h-4 text-green-600" />
        Verified: <span className="font-bold">{verified}</span>
      </div>
      
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm font-medium shadow-sm">
        <XCircle className="w-4 h-4 text-red-600" />
        Rejected: <span className="font-bold">{rejected}</span>
      </div>
    </div>
  );
}
