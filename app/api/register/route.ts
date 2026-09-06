import crypto from "crypto";

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
  const scriptUrl = process.env.GOOGLE_SHEET_URL;

  if (!scriptUrl || scriptUrl.includes("YOUR_SCRIPT_ID")) {
    return Response.json(
      { success: false, error: "Google Sheet URL is not configured." },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const sheetPayload = {
    "পূর্ণ নাম": body.fullName,
    "লিঙ্গ": body.gender === 'male' ? 'পুরুষ' : body.gender === 'female' ? 'নারী' : 'অন্যান্য',
    "মোবাইল নম্বর": body.phone,
    "WhatsApp নম্বর": body.whatsapp,
    "ইমেইল": body.email || "N/A",
    "বিভাগ": body.division,
    "জেলা": body.district,
    "উপজেলা / থানা": body.upazila,
    "ঠিকানা": body.currentAddress,
    "অংশগ্রহণের গ্রুপ (পরিচয়)": body.identity === 'group1' ? 'ষষ্ঠ–দশম / শহরে বেকায়া / সমমান পর্যন্ত' : 
                               body.identity === 'group2' ? 'একাদশ–দ্বাদশ / আলিম / হেদায়া সমমান পর্যন্ত' :
                               body.identity === 'group3' ? 'ডিগ্রি / ফাজিল / অনার্স / কামিল / মাস্টার্স / দাওরায়ে হাদিস সমমান পর্যন্ত' :
                               body.identity === 'group4' ? 'যেকোনো পেশাজীবী / অন্যান্য' : body.identity,
    "পেশা": body.occupation === 'student' ? 'ছাত্র / ছাত্রী' : 
            body.occupation === 'job' ? 'চাকরিজীবী' : 
            body.occupation === 'business' ? 'ব্যবসায়ী' : 
            body.occupation === 'housewife' ? 'গৃহিণী' : 
            body.occupation === 'farmer' ? 'কৃষক' : 
            body.occupation === 'other_occ' ? 'অন্যান্য' : body.occupation,
    "শিক্ষাপ্রতিষ্ঠান / পেশার বিবরণ": body.institution || "N/A",
    "পেমেন্ট মাধ্যম": body.paymentMethod === 'bkash' ? 'bKash' : body.paymentMethod === 'nagad' ? 'Nagad' : body.paymentMethod,
    "সেন্ডার নম্বর": body.senderNumber,
    "Transaction ID": body.transactionId || "N/A",
    "Event ID": body.eventId || "N/A",
    "Submission Time": new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
  };

  const payload = JSON.stringify(sheetPayload);

  try {
    // Google Apps Script returns a 302 redirect on the initial POST.
    // If we follow it automatically, Node.js converts the method to GET,
    // which skips doPost() entirely and returns an HTML error page.
    // Fix: intercept the redirect and re-POST to the resolved URL manually.
    const firstResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: payload,
      redirect: "manual", // do NOT auto-follow — we handle it ourselves
    });

    let finalText: string;

    if (firstResponse.status === 302 || firstResponse.status === 301) {
      // Follow the redirect with GET — doPost() already ran on the initial POST.
      // The redirect URL (googleusercontent.com/echo) just delivers the JSON response.
      // Re-POSTing to it returns HTML instead of JSON.
      const redirectUrl = firstResponse.headers.get("location");
      if (!redirectUrl) {
        console.error("[register] Redirect with no Location header");
        return Response.json({ success: false, error: "Redirect error." }, { status: 502 });
      }

      const secondResponse = await fetch(redirectUrl);
      finalText = await secondResponse.text();
    } else {
      finalText = await firstResponse.text();
    }

    // Parse JSON — if we get HTML, the deployment settings are wrong
    let result: { success: boolean; error?: string };
    try {
      result = JSON.parse(finalText);
    } catch {
      console.error("[register] Apps Script returned non-JSON:", finalText.slice(0, 400));
      return Response.json(
        { success: false, error: "Apps Script returned unexpected response." },
        { status: 502 }
      );
    }

    if (result.success && body && typeof body === "object") {
      // Fire CAPI event asynchronously without blocking the response
      sendCapiEvent(body, request).catch(console.error);
    }

    return Response.json(result);
  } catch (err) {
    console.error("[register] Failed to reach Google Apps Script:", err);
    return Response.json(
      { success: false, error: "Failed to reach Google Sheets." },
      { status: 502 }
    );
  }
}
