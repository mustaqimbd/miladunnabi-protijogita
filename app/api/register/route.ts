import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Registration from "@/models/Registration";

function hashData(data: string | undefined): string | undefined {
  if (!data) return undefined;
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  let p = phone.replace(/[^0-9]/g, "");
  if (p.startsWith("01") && p.length === 11) p = "88" + p;
  return p;
}

function splitFullName(fullName: string | undefined) {
  if (!fullName) return { fn: undefined, ln: undefined };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { fn: parts[0], ln: parts[0] };
  const fn = parts[0];
  const ln = parts.slice(1).join(" ");
  return { fn, ln };
}

async function sendCapiEvent(body: any, request: Request) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken || pixelId === "YOUR_PIXEL_ID_HERE") return;

  const eventId = body.eventId;
  if (!eventId) return;

  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent");
  const eventSourceUrl = request.headers.get("referer") || "https://miladunnabi-protijogita.vercel.app/";
  const cookieHeader = request.headers.get("cookie") || "";
  const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
  const fbcMatch = cookieHeader.match(/_fbc=([^;]+)/);

  const { fn, ln } = splitFullName(body.fullName);
  const extId = hashData(normalizePhone(body.phone) || body.email);

  const capiPayload = {
    data: [
      {
        event_name: "CompleteRegistration",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: eventSourceUrl,
        event_id: eventId,
        user_data: {
          em: [hashData(body.email)].filter(Boolean),
          ph: [hashData(normalizePhone(body.phone)), hashData(normalizePhone(body.whatsapp))].filter(Boolean),
          fn: [hashData(fn)].filter(Boolean),
          ln: [hashData(ln)].filter(Boolean),
          ge: [hashData(body.gender === "male" ? "m" : body.gender === "female" ? "f" : undefined)].filter(Boolean),
          ct: [hashData(body.district)].filter(Boolean),
          st: [hashData(body.division)].filter(Boolean),
          country: [hashData("bd")].filter(Boolean),
          external_id: [extId].filter(Boolean),
          client_ip_address: ip,
          client_user_agent: userAgent,
          fbp: fbpMatch ? fbpMatch[1] : undefined,
          fbc: fbcMatch ? fbcMatch[1] : undefined,
        },
        custom_data: {
          currency: "BDT",
          value: 100.00,
          content_name: "জাতীয় মিলাদুন্নবী অলিম্পিয়াড ২০২৬"
        }
      }
    ]
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(capiPayload)
    });
    if (!res.ok) console.error("[CAPI Error]", await res.text());
  } catch (err) {
    console.error("[CAPI Error]", err);
  }
}

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    
    // Check for existing registration to prevent duplicates
    const queryConditions: any[] = [{ phone: body.phone }];
    if (body.email && body.email.trim() !== "") {
      queryConditions.push({ email: body.email.trim() });
    }

    const existingRegistration = await Registration.findOne({ $or: queryConditions });

    if (existingRegistration) {
      return Response.json(
        { success: false, error: "এই মোবাইল নম্বর বা ইমেইল দিয়ে ইতোমধ্যে রেজিস্ট্রেশন করা হয়েছে।" },
        { status: 400 }
      );
    }

    const newRegistration = new Registration(body);
    await newRegistration.save();

    // Fire CAPI event asynchronously without blocking the response
    if (body && typeof body === "object") {
      sendCapiEvent(body, request).catch(console.error);
    }

    return Response.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("[register] Failed to save to MongoDB:", err);
    return Response.json(
      { success: false, error: "Failed to complete registration." },
      { status: 500 }
    );
  }
}
