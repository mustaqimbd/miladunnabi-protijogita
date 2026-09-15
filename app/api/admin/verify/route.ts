import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    // }

    const { id, paymentStatus, adminNotes } = await request.json();

    if (!id || !paymentStatus) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    const registration = await Registration.findById(id);
    if (!registration) {
      return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
    }

    registration.paymentStatus = paymentStatus;
    if (adminNotes !== undefined) {
      registration.adminNotes = adminNotes;
    }

    // Generate Serial Number / Roll Number if verified and doesn't have one
    if (paymentStatus === 'verified' && !registration.serialNumber) {
      // Find how many users in this specific group already have a serial number
      const countInGroup = await Registration.countDocuments({
        identity: registration.identity,
        serialNumber: { $ne: '' }
      });
      
      // Format: JMO26-G1-0001
      const identityStr = registration.identity || 'group1';
      const groupShort = identityStr.toUpperCase().replace('GROUP', 'G'); // GROUP1 -> G1
      const paddedNumber = String(countInGroup + 1).padStart(4, '0');
      registration.serialNumber = `JMO26-${groupShort}-${paddedNumber}`;
    }

    await registration.save({ validateModifiedOnly: true });

    return NextResponse.json({ 
      success: true, 
      message: "Status updated successfully",
      data: registration 
    });

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
