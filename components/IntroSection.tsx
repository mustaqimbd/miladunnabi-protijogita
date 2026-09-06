import { Users, Info, Sparkles } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="py-6 md:py-10 px-4 sm:px-6 bg-[#fcfdfc] border-b border-green-100 relative">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Intro Text */}
        <div className="text-center space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-2">
            <Sparkles className="w-4 h-4" />
            জাতীয় মিলাদুন্নবি ﷺ অলিম্পিয়াড ২০২৬
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
            প্রিয় নবী হযরত মুহাম্মাদ সা এর জীবন আদর্শ ও শিক্ষা সম্পর্কে আপনি কতোটা জানেন?
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            বাংলাদেশ ইসলামী ছাত্র কাফেলার আয়োজনে পবিত্র ঈদে মিলাদুন্নবী ﷺ উপলক্ষে অনুষ্ঠিত হতে যাচ্ছে দেশব্যাপী কুইজ প্রতিযোগিতা “জাতীয় মিলাদুন্নবী অলিম্পিয়াড ২০২৬”।
            <br />
            এটি শুধু একটি প্রতিযোগিতা নয়; বরং প্রিয় নবী ﷺ-এর পবিত্র জীবন ও মহান আদর্শ জানার, শেখার এবং জ্ঞানচর্চার মাধ্যমে নিজেকে সমৃদ্ধ করার এক অনন্য সুযোগ।
          </p>
        </div>

        {/* Eligibility & Info */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow flex flex-col items-start">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3 text-green-700">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">কারা অংশ নিতে পারবেন?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>গ্রুপ ১:</strong> ষষ্ঠ–দশম / শহরে বেকায়া / সমমান পর্যন্ত<br/>
              <strong>গ্রুপ ২:</strong> একাদশ–দ্বাদশ / আলিম / হেদায়া সমমান পর্যন্ত<br/>
              <strong>গ্রুপ ৩:</strong> ডিগ্রি / ফাজিল / অনার্স / কামিল / মাস্টার্স / দাওরায়ে হাদিস সমমান পর্যন্ত<br/>
              <strong>গ্রুপ ৪:</strong> যেকোনো পেশাজীবী / অন্যান্য
            </p>
          </div>
          
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow flex flex-col items-start">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3 text-green-700">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">প্রতিযোগিতা হবে যেভাবে</h3>
            <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✔</span>
                <span><strong>প্রথম রাউন্ড:</strong> অনলাইনে MCQ পরীক্ষা হবে, ৫০টি প্রশ্ন, ৪০ মিনিট।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✔</span>
                <span><strong>ফাইনাল রাউন্ড:</strong> অফলাইন পরীক্ষা, MCQ / এক কথায় উত্তর হবে।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
