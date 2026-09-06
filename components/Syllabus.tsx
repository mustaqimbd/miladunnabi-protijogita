import { BookOpen, FileText, Download, Target } from "lucide-react";
import Image from "next/image";

export default function Syllabus() {
  return (
    <div className="bg-gray-50 px-4 md:px-8 py-6 md:py-10 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center justify-center gap-3">
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            প্রতিযোগিতার সিলেবাস ও নিয়মাবলী
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">যে বইটির উপর ভিত্তি করে অলিম্পিয়াড অনুষ্ঠিত হবে</p>
        </div>

        <div className="bg-white rounded-3xl p-5 md:p-8 shadow border border-green-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Book Image */}
          <div className="w-48 h-64 shrink-0 relative rounded-r-xl rounded-l-sm shadow-xl overflow-hidden transform -rotate-3 transition-transform hover:rotate-0 border-l-4 border-gray-300 bg-gray-200">
            <Image 
              src="/book.jpeg" 
              alt="ফিকহুস সিরাহ"
              fill
              className="object-cover"
              sizes="192px"
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <h3 className="text-lg md:text-2xl font-black text-gray-800 mb-2">অলিম্পিয়াডের জন্য “ফিকহুস সিরাহ” নির্ধারণ করা হয়েছে</h3>
              <div className="space-y-1">
                <p className="text-gray-600"><span className="font-bold text-gray-700">লেখক:</span> ড. সায়িদ রমাদান বুতী</p>
                <p className="text-gray-600"><span className="font-bold text-gray-700">অনুবাদক:</span> ইবনু আরিফ</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-left">
                <FileText className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">চিন্তার কিছু নেই সিলেবাসভুক্ত বইটির PDF রেজিস্ট্রেশন করা অংশগ্রহণকারীদের প্রদান করা হবে। তাই বই না থাকলেও আপনি প্রস্তুতি নিতে পারবেন।</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
