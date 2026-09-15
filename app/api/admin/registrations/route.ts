import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    // Sort by newest first
    const registrations = await Registration.find({}).sort({ createdAt: -1 });
    return Response.json({ success: true, data: registrations });
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
