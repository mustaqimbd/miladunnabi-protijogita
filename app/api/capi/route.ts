import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      return NextResponse.json({ error: "Missing CAPI credentials in .env.local" }, { status: 500 });
    }
    const fbCApiBaseUrl = `https://graph.facebook.com/v25.0/${pixelId}/events?access_token=${accessToken}`;

    const FB_EVENT_MAP: Record<string, string> = {
      page_view: "PageView",
      view_content: "ViewContent",
      add_to_cart: "AddToCart",
      add_to_wishlist: "AddToWishlist",
      initiate_checkout: "InitiateCheckout",
      add_payment_info: "AddPaymentInfo",
      purchase: "Purchase",
      refund: "Refund",
      search: "Search",
      lead: "Lead",
      complete_registration: "CompleteRegistration",
    };

    // Format event correctly for Meta CAPI
    const eventData = {
      ...payload,
      event_name: FB_EVENT_MAP[payload.event_name] || payload.event_name,
    };

    // Meta expects the events in a "data" array
    const testEventCode = process.env.META_TEST_EVENT_CODE;
    const reqBody = {
      data: [eventData],
      ...(testEventCode && { test_event_code: testEventCode })
    };

    const facebookResponse = await fetch(fbCApiBaseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    const fbData = await facebookResponse.json();

    if (!facebookResponse.ok) {
      console.error("Meta CAPI Error:", fbData);
      return NextResponse.json({ error: "Meta CAPI Error", details: fbData }, { status: facebookResponse.status });
    }

    return NextResponse.json({ success: true, data: fbData });
  } catch (error: any) {
    console.error("CAPI Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
