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
              <h3 className="text-lg md:text-2xl font-black text-gray-800 mb-2">নির্ধারিত বই: ফিকহুস সিরাহ “ইহদিনা প্রকাশনী”</h3>
              <div className="space-y-1">
                <p className="text-gray-600"><span className="font-bold text-gray-700">অনুবাদক:</span> ইবনু আফির, মুসা আমান, উবাইদুল্লাহ তাসনিম।</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-left">
                <Target className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed"><strong>প্রথম রাউন্ডে</strong> ১ম খণ্ড এবং <strong>ফাইনাল রাউন্ডে</strong> উভয় খণ্ড।</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <FileText className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">পরীক্ষার আগে আমরা আমাদের পরীক্ষার ওয়েবসাইটের লিংক দিয়ে দিবো।</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <FileText className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">আমাদের অনলাইন পরীক্ষার পূর্বে সবাইকে Participant ID এবং একটি পাসওয়ার্ড দেওয়া হবে। সেটি দিয়ে লগইন করে পরীক্ষা দিতে হবে। একজন এক আইডি দিয়ে একবারই প্রবেশ করতে পারবে।</p>
              </div>
              <div className="flex items-start gap-3 text-left">
                <FileText className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">পরীক্ষার সময় এমন কোন কাজ করবেন না যা দ্বারা অন্যের হক নষ্ট হবে। (অর্থাৎ কোন চালাকি, নকল বাজি করা যাবে না।)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
