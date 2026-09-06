import { CalendarDays, CheckCircle2 } from "lucide-react";

export default function Timeline() {
  return (
    <div className="py-6 md:py-10 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-xl md:text-3xl font-black text-center text-gray-800 mb-6 md:mb-12 flex items-center justify-center gap-2 md:gap-3">
          <CalendarDays className="w-5 h-5 md:w-8 md:h-8 text-green-600" />
          গুরুত্বপূর্ণ তারিখসমূহ
        </h2>
        
        {/* Desktop Layout */}
        <div className="hidden md:block relative">
          
          {/* Top Text Row (Step 1 & Step 3) */}
          <div className="flex w-full items-end pb-2">
            <div className="flex-1 text-center">
              <div className="text-sm font-bold text-red-500 mb-1 uppercase tracking-wider">রেজিস্ট্রেশনের শেষ সময়</div>
              <div className="text-xl font-black text-gray-800">২৬ সেপ্টেম্বর ২০২৬</div>
            </div>
            <div className="flex-1 text-center opacity-0">.</div>
            <div className="flex-1 text-center">
              <div className="text-sm font-bold text-green-600 mb-1 uppercase tracking-wider">গ্র্যান্ড ফাইনাল: অফলাইন</div>
              <div className="text-xl font-black text-gray-800">৩১ অক্টোবর ২০২৬</div>
            </div>
          </div>

          {/* Line and Icons */}
          <div className="relative flex w-full items-center">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-green-200 -translate-y-1/2"></div>
            
            <div className="flex-1 flex justify-center z-10">
              <div className="w-12 h-12 bg-white border-4 border-red-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-default">
                <CheckCircle2 className="w-6 h-6 text-red-500" />
              </div>
            </div>
            
            <div className="flex-1 flex justify-center z-10">
              <div className="w-14 h-14 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-default">
                <CheckCircle2 className="w-7 h-7 text-yellow-500" />
              </div>
            </div>
            
            <div className="flex-1 flex justify-center z-10">
              <div className="w-12 h-12 bg-white border-4 border-green-600 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-default">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Bottom Text Row (Step 2) */}
          <div className="flex w-full items-start pt-2">
            <div className="flex-1 text-center opacity-0">.</div>
            <div className="flex-1 text-center">
              <div className="text-sm font-bold text-yellow-600 mb-1 uppercase tracking-wider">প্রথম রাউন্ড: অনলাইন</div>
              <div className="text-xl font-black text-gray-800 mb-1">১৬ অক্টোবর ২০২৬</div>
              <div className="text-xs font-medium text-gray-500">৫০টি MCQ | ৪০ মিনিট</div>
            </div>
            <div className="flex-1 text-center opacity-0">.</div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative border-l-4 border-green-200 ml-4 py-2 flex flex-col gap-5">
          
          <div className="relative pl-8">
            <div className="absolute left-[-22px] top-0 w-10 h-10 bg-white border-4 border-red-500 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-red-500" />
            </div>
            <div className="pt-1">
              <div className="text-sm font-bold text-red-500 mb-1 uppercase tracking-wider">রেজিস্ট্রেশনের শেষ সময়</div>
              <div className="text-lg font-black text-gray-800">২৬ সেপ্টেম্বর ২০২৬</div>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-[-22px] top-0 w-10 h-10 bg-white border-4 border-yellow-400 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="pt-1">
              <div className="text-sm font-bold text-yellow-600 mb-1 uppercase tracking-wider">প্রথম রাউন্ড: অনলাইন</div>
              <div className="text-lg font-black text-gray-800 mb-1">১৬ অক্টোবর ২০২৬</div>
              <div className="text-xs font-medium text-gray-500">৫০টি MCQ | ৪০ মিনিট</div>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-[-22px] top-0 w-10 h-10 bg-white border-4 border-green-600 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="pt-1">
              <div className="text-sm font-bold text-green-600 mb-1 uppercase tracking-wider">গ্র্যান্ড ফাইনাল: অফলাইন</div>
              <div className="text-lg font-black text-gray-800">৩১ অক্টোবর ২০২৬</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
