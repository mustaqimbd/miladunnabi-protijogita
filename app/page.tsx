export const dynamic = 'force-static';

import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import TopPrizes from "@/components/TopPrizes";
import Timeline from "@/components/Timeline";
import Syllabus from "@/components/Syllabus";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

const schemaToAdd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "জাতীয় মিলাদুন্নবি অলিম্পিয়াড ২০২৬",
  "startDate": "2026-10-16T00:00:00+06:00",
  "endDate": "2026-10-31T00:00:00+06:00",
  "location": {
    "@type": "Place",
    "name": "বাংলাদেশ",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "বাংলাদেশ"
    }
  },
  "description": "দেশব্যাপী কুইজ প্রতিযোগিতা “জাতীয় মিলাদুন্নবী অলিম্পিয়াড ২০২৬”।"
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f4] to-[#e6f2eb] font-sans text-gray-900 selection:bg-green-200">
      <main className="bg-white overflow-hidden relative shadow-2xl">
        <Header />
        <IntroSection />
        <Timeline />
        <TopPrizes />
        <Syllabus />
        <Registration />
        <Footer />
      </main>
      <script type="application/ld+json">{JSON.stringify(schemaToAdd)}</script>
    </div>
  );
}


