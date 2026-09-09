/**
 * Shared tracking event names used by both Meta CAPI and GTM.
 * All event names follow snake_case as per GA4 convention.
 */
export type GTMEventName =
  | "page_view"
  | "view_content"
  | "add_to_cart"
  | "add_to_wishlist"
  | "initiate_checkout"
  | "add_payment_info"
  | "purchase"
  | "refund"
  | "search"
  | "lead"
  | "complete_registration";

/**
 * Represents a single product/content item.
 * Used in both Meta CAPI custom_data.contents and GTM eventModel.items.
 */
export type Content = {
  id?: string; // Product ID used in Meta Catalog (Required for matching)
  quantity?: number; // Quantity of the product
  item_price?: number; // Unit price of the product (Strongly recommended for ROAS optimization)
  title?: string; // Optional product title/name
  name?: string; // Optional product name (used in some contexts)
  description?: string; // Optional product description
  brand?: string; // Product brand
  category?: string; // Product category
  variant?: string; // Product variant (e.g., color, size)
  delivery_category?: "home_delivery" | "in_store" | "curbside" | "digital"; // Physical or digital classification
};

/**
 * Input parameter for the tracking event handler.
 * Accepts raw (unhashed) user data — hashing is performed internally by the handler.
 */
export type EventParameter = {
  event_name: GTMEventName;
  event_time?: number;
  event_id?: string;
  fullName?: string; // Raw full name (will be split into fn and ln automatically)
  // Raw user identity (will be SHA256 hashed before transmission)
  fn?: string; // Raw first name
  ln?: string; // Raw last name
  db?: string; // Raw date of birth
  ge?: string; // Raw gender
  em?: string; // Raw email
  ph?: string; // Raw phone
  ct?: string; // Raw city
  st?: string; // Raw state
  zp?: string; // Raw zip
  upazila_id?: string; // Upazila ID for automatic zip code resolution
  country?: string; // Raw country
  external_id?: string; // Raw external ID
  fb_login_id?: string; // Facebook Login ID
  fbc?: string; // Facebook Click ID
  fbp?: string; // Facebook Browser ID
  // E-commerce / custom data
  content_ids?: string[]; // List of product IDs associated with the event.
  contents?: Content[]; // Detailed list of products involved in the event.
  content_type?: "product" | "product_group" | string; // The type of content.
  content_name?: string; // Name of the main content item
  content_category?: string; // Category or path of the content
  order_id?: string; // Unique transaction identifier
  num_items?: number; // Total number of items in this event
  predicted_ltv?: number; // Predicted lifetime value of the customer
  shipping?: number; // Shipping cost for the transaction
  tax?: number; // Tax amount for the transaction
  discount_value?: number; // Total discount value applied
  coupon?: string; // Coupon or promo code used
  status?: "completed" | "pending" | "failed" | "refunded" | string;
  search_string?: string; // Search query string for Search events
  payment_method?: string; // Preferred payment method
  store_id?: string; // Store identifier for multi-location businesses
  subscription_id?: string; // Subscription ID for recurring billing events
  customer_segmentation?:
    | "new_customer_to_business"
    | "new_customer_to_business_line"
    | "new_customer_to_product_area"
    | "new_customer_to_medium"
    | "existing_customer_to_business"
    | "existing_customer_to_business_line"
    | "existing_customer_to_product_area"
    | "existing_customer_to_medium"
    | "customer_in_loyalty_program";
  value?: number; // A numeric value associated with the event.
  currency?: string; // Currency code in ISO 4217 format (e.g., "BDT", "USD").
  // Meta event options
  action_source?: "website";
  event_source_url?: string;
  opt_out?: boolean;
  data_processing_options?: string[];
  data_processing_options_country?: number;
  data_processing_options_state?: number;
  referrer_url?: string;
};
