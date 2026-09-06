import { Phone, Globe, Mail, CreditCard } from "lucide-react";

export default function InfoGrid() {
  return (
    <div className="bg-gray-50 px-8 py-12 border-t border-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Syllabus */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-green-500 relative">
          <div className="absolute -top-4 left-6 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
            সিলেবাস
          </div>
          <ul className="mt-4 space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
              <span className="font-bold text-lg text-gray-800">ফিকহুস সিরাহ (১ম খন্ড)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
              <span className="font-bold text-lg text-gray-800">ড. সায়িদ রমাদান বুতী</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
              <span className="font-bold text-lg text-gray-800">অনুবাদ: ইবনু আফির</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 text-green-800 text-sm font-medium text-center">
            নির্ধারিত বইয়ের PDF ও প্রয়োজনীয় প্রস্তুতি-সহায়ক উপকরণ বিনামূল্যে প্রদান করা হবে।
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-yellow-400">
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-500 mb-1">অনলাইন পরীক্ষা (১ম রাউন্ড)</div>
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-bold text-lg">
                ৩রা অক্টোবর'২৬
              </div>
            </div>
            <div className="w-full h-px bg-gray-100"></div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-500 mb-1">ফাইনাল (অফলাইন পরীক্ষা)</div>
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-lg">
                ১০ অক্টোবর'২৬
              </div>
            </div>
            <div className="w-full h-px bg-gray-100"></div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-500 mb-1 text-red-500">রেজিস্ট্রেশনের শেষ সময়</div>
              <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold text-lg">
                ২৬ সেপ্টেম্বর'২৬
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Contact */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-red-500 flex flex-col justify-between">
          
          <div className="text-center mb-6">
             <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">পেমেন্ট</div>
             <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 bg-pink-50 text-pink-700 py-2 px-4 rounded-xl font-bold text-xl border border-pink-100">
                  <CreditCard className="w-5 h-5" />
                  01521 726231 (বিকাশ)
                </div>
                <div className="flex items-center justify-center gap-3 bg-orange-50 text-orange-700 py-2 px-4 rounded-xl font-bold text-xl border border-orange-100">
                  <CreditCard className="w-5 h-5" />
                  01616 125201 (নগদ)
                </div>
             </div>
             <div className="text-xs text-gray-500 mt-3 font-medium">
               Send Money করতে হবে। পেমেন্টের Transaction ID রেজিস্ট্রেশন ফর্মে প্রদান করতে হবে।
             </div>
          </div>

          <div className="w-full h-px bg-gray-100 mb-6"></div>

          <div className="space-y-3">
            <div className="text-sm font-bold text-gray-500 mb-2 text-center uppercase tracking-widest">যোগাযোগ</div>
            <a href="tel:01788763747" className="flex items-center justify-center gap-3 text-gray-700 hover:text-green-600 font-bold transition-colors">
              <Phone className="w-5 h-5 text-green-500" />
              01788 763 747
            </a>
            <a href="https://ffb.com/bdichatrokafela" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              <Globe className="w-5 h-5 text-blue-500" />
              ffb.com/bdichatrokafela
            </a>
            <a href="mailto:bdichatrokafela@gmail.com" className="flex items-center justify-center gap-3 text-gray-700 hover:text-red-600 font-medium transition-colors">
              <Mail className="w-5 h-5 text-red-500" />
              bdichatrokafela@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
