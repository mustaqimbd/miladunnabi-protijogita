import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const scriptUrl = process.env.GOOGLE_SHEET_URL;
    if (!scriptUrl || scriptUrl.includes("YOUR_SCRIPT_ID")) {
      return NextResponse.json({ success: false, error: "Google Sheet URL is not configured." }, { status: 500 });
    }

    await dbConnect();

    // Fetch up to 10 unsynced registrations to avoid Vercel timeout
    const unsynced = await Registration.find({ isSynced: { $ne: true } }).limit(10);
    
    if (unsynced.length === 0) {
      return NextResponse.json({ success: true, message: "All caught up!", count: 0, hasMore: false });
    }

    let syncedCount = 0;

    for (const reg of unsynced) {
      const sheetPayload = {
        "পূর্ণ নাম": reg.fullName,
        "লিঙ্গ": reg.gender === 'male' ? 'পুরুষ' : reg.gender === 'female' ? 'নারী' : 'অন্যান্য',
        "মোবাইল নম্বর": reg.phone,
        "WhatsApp নম্বর": reg.whatsapp,
        "ইমেইল": reg.email || "N/A",
        "বিভাগ": reg.division,
        "জেলা": reg.district,
        "উপজেলা / থানা": reg.upazila,
        "ঠিকানা": reg.currentAddress,
        "অংশগ্রহণের গ্রুপ (পরিচয়)": reg.identity === 'group1' ? 'ষষ্ঠ–দশম / শহরে বেকায়া / সমমান পর্যন্ত' : 
                                   reg.identity === 'group2' ? 'একাদশ–দ্বাদশ / আলিম / হেদায়া সমমান পর্যন্ত' :
                                   reg.identity === 'group3' ? 'ডিগ্রি / ফাজিল / অনার্স / কামিল / মাস্টার্স / দাওরায়ে হাদিস সমমান পর্যন্ত' :
                                   reg.identity === 'group4' ? 'যেকোনো পেশাজীবী / অন্যান্য' : reg.identity,
        "পেশা": reg.occupation === 'student' ? 'ছাত্র / ছাত্রী' : 
                reg.occupation === 'job' ? 'চাকরিজীবী' : 
                reg.occupation === 'business' ? 'ব্যবসায়ী' : 
                reg.occupation === 'housewife' ? 'গৃহিণী' : 
                reg.occupation === 'farmer' ? 'কৃষক' : 
                reg.occupation === 'other_occ' ? 'অন্যান্য' : reg.occupation,
        "শিক্ষাপ্রতিষ্ঠান / পেশার বিবরণ": reg.institution || "N/A",
        "পেমেন্ট মাধ্যম": reg.paymentMethod === 'bkash' ? 'bKash' : reg.paymentMethod === 'nagad' ? 'Nagad' : reg.paymentMethod,
        "সেন্ডার নম্বর": reg.senderNumber,
        "Transaction ID": reg.transactionId || "N/A",
        "Event ID": (reg as any).eventId || "N/A",
        "Submission Time": new Date(reg.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
      };

      try {
        const response = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(sheetPayload),
        });

        const finalText = await response.text();
        let result = JSON.parse(finalText);

        if (result.success) {
          reg.isSynced = true;
          await reg.save();
          syncedCount++;
        } else {
          console.error("Failed to sync specific record", reg._id, result);
        }
      } catch (err) {
        console.error("Error pushing to sheets", err);
        // Break the loop if we hit a network error with Google Sheets
        break;
      }
    }

    // Check if there are more remaining
    const remainingCount = await Registration.countDocuments({ isSynced: { $ne: true } });

    return NextResponse.json({ 
      success: true, 
      message: `Synced ${syncedCount} records.`,
      count: syncedCount,
      hasMore: remainingCount > 0,
      remaining: remainingCount
    });

  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
