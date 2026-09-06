import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white pt-6 md:pt-10 pb-4 md:pb-6 px-4 border-b border-gray-50">
      <div className="max-w-3xl mx-auto relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-[#f4f9f6] flex items-center justify-center aspect-video sm:aspect-[2/1]">
        <Image
          src="/banner.png"
          alt="জাতীয় মিলাদুন্নবী অলিম্পিয়াড ২০২৬"
          fill
          priority
          className="object-contain sm:object-cover"
        />
      </div>
    </header>
  );
}
