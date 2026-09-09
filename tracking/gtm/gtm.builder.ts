import { MetaCAPIEventPayload } from "../capi/capi.types";
import { cleanObj } from "../event.helpers";
import { EventParameter } from "../event.types";
import { GTMEventPayload } from "./gtm.types";

/**
 * Builders GA4-compatible GTM Event Payload.
 * Uses UNHASHED user data because the Facebook browser pixel SDK natively hashes data on the client side.
 *
 * @param payload The Meta CAPI Event Payload
 * @param rawEventData The raw, unhashed EventParameter payload
 * @returns A strictly typed GTMEventPayload for dataLayer
 */
export const buildGTMEventPayload = (
  payload: MetaCAPIEventPayload,
  rawEventData: EventParameter
): GTMEventPayload => {
  const isCommerceEvent = [
    "view_content",
    "add_to_cart",
    "add_to_wishlist",
    "initiate_checkout",
    "add_payment_info",
    "purchase",
    "refund",
  ].includes(payload.event_name);

  return {
    event:
      payload.event_name === "page_view"
        ? "custom_page_view"
        : payload.event_name,
    eventModel: cleanObj({
      event_id: payload.event_id,
      event_time: payload.event_time,
      user_data: cleanObj({
        email_address: rawEventData.em,
        phone_number: rawEventData.ph,
        address: cleanObj({
          first_name: rawEventData.fn,
          last_name: rawEventData.ln,
          city: rawEventData.ct,
          region: rawEventData.st,
          postal_code: rawEventData.zp,
          country: rawEventData.country,
        }),
        // Advanced Matching Identifiers
        gender: rawEventData.ge,
        dob: rawEventData.db,
        external_id: rawEventData.external_id,
        fb_login_id: rawEventData.fb_login_id,
        fbc: rawEventData.fbc,
        fbp: rawEventData.fbp,
      }),
      items:
        payload.custom_data?.contents && payload.custom_data.contents.length > 0
          ? payload.custom_data.contents.map((item) =>
              cleanObj({
                item_id: item.id,
                price: item.item_price,
                quantity: item.quantity,
                item_name: item.title || item.name,
                item_brand: item.brand,
                item_category: item.category,
                item_variant: item.variant,
              })
            )
          : undefined,
      content_type:
        payload.custom_data?.content_type ||
        (isCommerceEvent ? "product" : undefined),
      content_ids: payload.custom_data?.content_ids,
      content_name: payload.custom_data?.content_name,
      content_category: payload.custom_data?.content_category,
      num_items: payload.custom_data?.num_items,
      value: payload.custom_data?.value,
      currency:
        payload.custom_data?.currency ||
        (payload.custom_data?.value || isCommerceEvent ? "BDT" : undefined),
      shipping: payload.custom_data?.shipping || undefined,
      tax: payload.custom_data?.tax || undefined,
      discount_value: payload.custom_data?.discount_value || undefined,
      payment_method: payload.custom_data?.payment_method,
      transaction_id: payload.custom_data?.order_id,
      search_term: payload.custom_data?.search_string,
      coupon: payload.custom_data?.coupon,
      status: payload.custom_data?.status,
      order_id: payload.custom_data?.order_id,
      event_source_url: payload.event_source_url,
    }),
  };
};
