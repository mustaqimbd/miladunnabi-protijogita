import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#eaf5f0] text-[#0f5b3a] px-4 py-8 border-t border-green-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        
        <div className="w-16 h-16 md:w-20 md:h-20 relative mb-2">
          <Image 
            src="/logo.png" 
            alt="বাংলাদেশ ইসলামী ছাত্র কাফেলা লোগো"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 64px, 80px"
          />
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
          {/* Decorative left line (hidden on mobile) */}
          <div className="hidden md:flex flex-1 items-center justify-end">
            <span className="text-[#0f5b3a]">❖</span>
            <div className="h-[2px] w-12 md:w-24 bg-[#0f5b3a] ml-1"></div>
          </div>
          
          <h2 className="text-lg md:text-2xl font-black text-center leading-snug">
            আয়োজনে:- বাংলাদেশ ইসলামী ছাত্র কাফেলা।
          </h2>
          
          {/* Decorative right line (hidden on mobile) */}
          <div className="hidden md:flex flex-1 items-center justify-start">
            <div className="h-[2px] w-12 md:w-24 bg-[#0f5b3a] mr-1"></div>
            <span className="text-[#0f5b3a]">❖</span>
          </div>
        </div>

        <p className="text-sm md:text-lg font-medium text-[#0f5b3a]/90">
          কেন্দ্রীয় কার্যালয় :- সোনাকান্দা দারুল হুদা দরবার শরীফ, মুরাদনগর, কুমিল্লা।
        </p>
        
      </div>
    </footer>
  );
}

