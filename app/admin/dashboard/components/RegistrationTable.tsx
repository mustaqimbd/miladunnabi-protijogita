"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, CheckCircle, XCircle, Clock, Edit2, Phone, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function RegistrationTable({ initialRegistrations }: { initialRegistrations: any[] }) {
  const router = useRouter();
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  const handleVerify = async (id: string, status: string) => {
    setIsVerifying(id);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, paymentStatus: status }),
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations(registrations.map(r => r._id === id ? data.data : r));
        router.refresh();
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setIsVerifying(null);
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      (reg.fullName || '').toLowerCase().includes(searchLower) ||
      (reg.phone || '').includes(searchTerm) ||
      (reg.transactionId || '').toLowerCase().includes(searchLower) ||
      (reg.serialNumber || '').toLowerCase().includes(searchLower);
      
    const actualStatus = reg.paymentStatus || 'pending';
    const matchesStatus = statusFilter === "all" || actualStatus === statusFilter;
    const matchesGroup = groupFilter === "all" || reg.identity === groupFilter;

    return matchesSearch && matchesStatus && matchesGroup;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, groupFilter]);

  const totalPages = Math.ceil(filteredRegistrations.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Filters & Search */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search name, phone, TrxID, Roll No..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
            className="w-full pl-10 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex w-full md:w-auto gap-4">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>

          <select 
            value={groupFilter} 
            onChange={(e) => setGroupFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Groups</option>
            <option value="group1">Group 1</option>
            <option value="group2">Group 2</option>
            <option value="group3">Group 3</option>
            <option value="group4">Group 4</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr className="divide-x divide-gray-200">
              <th className="px-6 py-4">SL / Roll</th>
              <th className="px-6 py-4">Name & Contact</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Profession & Group</th>
              <th className="px-6 py-4">Payment & Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border-b border-gray-200">
            {paginatedRegistrations.map((reg, index) => (
              <tr key={reg._id} className="hover:bg-gray-50 transition-colors divide-x divide-gray-100">
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5 items-start">
                    <span className="text-base font-bold text-gray-700 leading-none mb-1">
                      {startIndex + index + 1}.
                    </span>
                    {reg.serialNumber ? (
                      <div className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded inline-block">
                        {reg.serialNumber}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No Roll No</span>
                    )}
                    <span className="text-xs font-bold text-indigo-600 mt-1">
                      {reg.identity === 'group1' ? 'গ্রুপ-ক' :
                       reg.identity === 'group2' ? 'গ্রুপ-খ' :
                       reg.identity === 'group3' ? 'গ্রুপ-গ' :
                       reg.identity === 'group4' ? 'গ্রুপ-ঘ' : ''}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{reg.fullName}</div>
                  <div className="text-gray-900 font-medium mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {reg.phone}
                  </div>
                  {reg.whatsapp && reg.whatsapp !== reg.phone && (
                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-1.5 font-medium">
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      {reg.whatsapp}
                    </div>
                  )}
                  {reg.email && <div className="text-xs text-gray-400 mt-1">{reg.email}</div>}
                </td>

                <td className="px-6 py-4">
                  <div className="text-xs text-gray-500 truncate max-w-[200px]" title={reg.currentAddress}>
                    {reg.currentAddress}, {reg.upazila}
                  </div>
                  <div className="text-gray-900 mt-1">
                    {reg.district}, {reg.division}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div 
                    className="text-gray-900 font-medium truncate max-w-[200px] cursor-help"
                    title={reg.identity === 'group1' ? 'ষষ্ঠ–দশম / শহরে বেকায়া / সমমান পর্যন্ত' : reg.identity === 'group2' ? 'একাদশ–দ্বাদশ / আলিম / হেদায়া সমমান পর্যন্ত' : reg.identity === 'group3' ? 'ডিগ্রি / ফাজিল / অনার্স / কামিল / মাস্টার্স / দাওরায়ে হাদিস সমমান পর্যন্ত' : reg.identity === 'group4' ? 'যেকোনো পেশাজীবী / অন্যান্য' : reg.identity}
                  >
                    {reg.identity === 'group1' ? 'ষষ্ঠ–দশম / শহরে বেকায়া / সমমান পর্যন্ত' :
                     reg.identity === 'group2' ? 'একাদশ–দ্বাদশ / আলিম / হেদায়া সমমান পর্যন্ত' :
                     reg.identity === 'group3' ? 'ডিগ্রি / ফাজিল / অনার্স / কামিল / মাস্টার্স / দাওরায়ে হাদিস সমমান পর্যন্ত' :
                     reg.identity === 'group4' ? 'যেকোনো পেশাজীবী / অন্যান্য' : reg.identity}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-gray-700 text-sm">
                      {reg.occupation === 'student' ? 'ছাত্র / ছাত্রী' :
                       reg.occupation === 'job' ? 'চাকরিজীবী' :
                       reg.occupation === 'business' ? 'ব্যবসায়ী' :
                       reg.occupation === 'housewife' ? 'গৃহিণী' :
                       reg.occupation === 'farmer' ? 'কৃষক' :
                       reg.occupation === 'other_occ' ? 'অন্যান্য' : reg.occupation}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {reg.gender === 'male' ? 'পুরুষ' : reg.gender === 'female' ? 'নারী' : 'অন্যান্য'}
                    </span>
                  </div>
                  {reg.institution && (
                    <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]" title={reg.institution}>
                      {reg.institution}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-blue-50 text-blue-700 mb-1">
                    {reg.paymentMethod}
                  </div>
                  <div className="text-sm text-gray-700 font-medium mt-1">Sender: <span className="font-mono">{reg.senderNumber}</span></div>
                  <div className="text-sm text-gray-700 mt-1">TrxID: <span className="font-mono text-indigo-600 bg-indigo-50 px-1 rounded">{reg.transactionId || "N/A"}</span></div>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(reg.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2 items-start">
                    {reg.paymentStatus === 'verified' ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200"><CheckCircle className="w-3 h-3"/> Verified</span>
                    ) : reg.paymentStatus === 'rejected' ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full border border-red-200"><XCircle className="w-3 h-3"/> Rejected</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full border border-amber-200"><Clock className="w-3 h-3"/> Pending</span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleVerify(reg._id, 'verified')}
                      disabled={isVerifying === reg._id || reg.paymentStatus === 'verified'}
                      className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Verify
                    </button>
                    <button 
                      onClick={() => handleVerify(reg._id, 'rejected')}
                      disabled={isVerifying === reg._id || reg.paymentStatus === 'rejected'}
                      className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRegistrations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No registrations found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredRegistrations.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredRegistrations.length)} of {filteredRegistrations.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
