export const dynamic = 'force-static';

import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import TopPrizes from "@/components/TopPrizes";
import Timeline from "@/components/Timeline";
import Syllabus from "@/components/Syllabus";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "রেজিস্ট্রেশন",
  "url": "https://www.bdislamichatrokafela.org/"
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f4] to-[#e6f2eb] font-sans text-gray-900 selection:bg-green-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main className="bg-white overflow-hidden relative shadow-2xl">
        <Header />
        <IntroSection />
        <Timeline />
        <TopPrizes />
        <Syllabus />
        <Registration />
        <Footer />
      </main>
    </div>
  );
}


