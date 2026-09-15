import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Registration from "@/models/Registration";
import dbConnect from "@/lib/mongodb";
import { LogOut, Users, Search } from "lucide-react";
import SyncButton from "./components/SyncButton";
import RegistrationTable from "./components/RegistrationTable";
import AnalyticsCards from "./components/AnalyticsCards";
import UserDropdown from "./components/UserDropdown";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();
  const registrations = await Registration.find({}).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-green-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          রেজিস্ট্রেশন ড্যাশবোর্ড (২০২৬)
        </h1>
        <UserDropdown email={session.user?.email || "admin@example.com"} />
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Actions & Analytics */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 xl:gap-6">
              <h2 className="text-xl font-bold text-gray-800">Overview</h2>
              <AnalyticsCards registrations={JSON.parse(JSON.stringify(registrations))} />
            </div>
            <SyncButton />
          </div>

          {/* Table */}
          <RegistrationTable initialRegistrations={JSON.parse(JSON.stringify(registrations))} />
        </div>
      </main>
    </div>
  );
}
