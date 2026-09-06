import Link from "next/link";
import { CheckCircle, Home, MessageCircle } from "lucide-react";
import ShareOptions from "@/components/ShareOptions";

export const metadata = {
  title: "রেজিস্ট্রেশন সফল | মিলাদুন্নবী প্রতিযোগিতা",
  description: "আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে।",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#f4f9f6] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow border border-green-100 overflow-hidden">

          {/* Top green banner */}
          <div className="bg-[#0f5b3a] px-5 sm:px-8 py-6 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white">রেজিস্ট্রেশন সফল হয়েছে!</h1>
          </div>

          {/* Body */}
          <div className="px-5 sm:px-8 py-6 sm:py-8 text-center space-y-6">

            <p className="text-gray-600 text-base leading-relaxed">
              আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে।
            </p>

            {/* Facebook page notice */}
            <a
              href="https://www.facebook.com/bdichatrokafela"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-left hover:bg-blue-100 transition-colors group"
            >
              <div className="bg-blue-100 p-2 rounded-full shrink-0 group-hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">
                  কুইজ সংক্রান্ত আপডেট পেতে আমাদের ফেইসবুক পেইজে চোখ রাখুন →{" "}
                  <span className="font-semibold underline underline-offset-2">বাংলাদেশ ইসলামি ছাত্র কাফেলা</span>
                </p>
              </div>
            </a>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <div className="bg-green-50 rounded-xl p-4 sm:p-5 border border-green-100">
                <p className="font-bold text-green-900 mb-2">আপনার বন্ধুদেরও সুযোগ করে দিন!</p>
                <p className="text-sm text-green-700 mb-4">
                  এই অলিম্পিয়াডে অংশগ্রহণের জন্য আপনার বন্ধুদের আমন্ত্রণ জানান।
                </p>
                <ShareOptions />
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-xs mt-6">
          অলিম্পিয়াডের প্রস্তুতির জন্য শুভকামনা! 🌟
        </p>
      </div>
    </div>
  );
}
