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
            প্রিয় নবী হযরত মুহাম্মদ ﷺ-এর জীবন, আদর্শ ও শিক্ষা সম্পর্কে আপনি কতটা জানেন?
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            পবিত্র ঈদে মিলাদুন্নবি ﷺ উপলক্ষে আয়োজিত হচ্ছে দেশব্যাপী কুইজ প্রতিযোগিতা <strong>জাতীয় মিলাদুন্নবি ﷺ অলিম্পিয়াড ২০২৬</strong>। এটি শুধু একটি প্রতিযোগিতা নয় বরং প্রিয় নবী ﷺ-এর পবিত্র জীবন ও আদর্শ সম্পর্কে জানার এবং নিজের জ্ঞান যাচাই করার একটি সুন্দর সুযোগ।
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
              ৬ষ্ঠ শ্রেণি থেকে শুরু করে একাদশ-দ্বাদশ, ডিগ্রি, ফাজিল, কামিল, অনার্স, মাস্টার্স এবং চাকরিজীবী, ব্যবসায়ীসহ সকল শ্রেণি-পেশার মানুষ।
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
                <span><strong>প্রথম রাউন্ড:</strong> প্রতিটি গ্রুপ থেকে সেরা ২৫ জন করে মোট ১০০ জন গ্র্যান্ড ফাইনালের জন্য নির্বাচিত হবেন।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✔</span>
                <span><strong>গ্র্যান্ড ফাইনাল:</strong> নির্বাচিত ১০০ জনের অফলাইন প্রতিযোগিতা।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
