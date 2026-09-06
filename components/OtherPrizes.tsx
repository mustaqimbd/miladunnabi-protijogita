import { Watch, Book } from "lucide-react";

export default function OtherPrizes() {
  return (
    <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full text-center md:text-left">
        <ul className="space-y-4 text-xl font-bold text-gray-700">
          <li className="flex items-center justify-center md:justify-start gap-3 hover:text-green-600 transition-colors">
            <Watch className="w-6 h-6 text-green-500" />
            <span className="text-gray-500 font-medium">৬ষ্ঠ-১০ম:</span> স্মার্ট ওয়াচ
          </li>
          <li className="flex items-center justify-center md:justify-start gap-3 hover:text-green-600 transition-colors">
            <Watch className="w-6 h-6 text-green-500" />
            <span className="text-gray-500 font-medium">১১তম-৩০তম:</span> ঘড়ি
          </li>
          <li className="flex items-center justify-center md:justify-start gap-3 hover:text-green-600 transition-colors">
            <Book className="w-6 h-6 text-green-500" />
            <span className="text-gray-500 font-medium">৩১তম-৫০তম:</span> বই
          </li>
        </ul>
      </div>

      <div className="flex-shrink-0 relative group cursor-default">
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative w-48 h-48 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl border-4 border-white transform transition-transform hover:scale-105">
          <div className="text-lg font-bold opacity-90 mb-1">মোট</div>
          <div className="text-6xl font-black drop-shadow-md leading-none mb-1">৫০</div>
          <div className="text-xl font-bold">টি পুরস্কার</div>
        </div>
      </div>

      <div className="flex-1 w-full md:w-auto text-center md:text-right flex flex-col items-center md:items-end">
         <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
            <div className="bg-green-600 px-6 py-2 text-sm font-bold tracking-widest uppercase text-white/90">
              রেজিস্ট্রেশন ফি
            </div>
            <div className="px-8 py-4 font-black text-4xl flex items-center justify-center gap-2">
              ১০০ <span className="text-xl font-bold">টাকা</span>
            </div>
         </div>
      </div>
    </div>
  );
}
