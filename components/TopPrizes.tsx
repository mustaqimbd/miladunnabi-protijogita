import Image from "next/image";
import { Gift } from "lucide-react";

export default function TopPrizes() {
  return (
    <div className="w-full bg-white py-4 md:py-8 px-4 border-y border-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-3xl font-black text-center text-gray-800 mb-4 md:mb-8 flex items-center justify-center gap-2">
          <Gift className="w-5 h-5 md:w-8 md:h-8 text-green-600" />
          পুরস্কারসমূহ
        </h2>
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center">
          <Image
            src="/prizes.png"
            alt="পুরস্কার সমূহ"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
