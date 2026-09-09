import { Content, GTMEventName } from "../event.types";

export type UserData = {
  fn?: string[]; // first name (SHA256)
  ln?: string[]; // last name (SHA256)
  ge?: string[]; // gender (SHA256)
  db?: string[]; // date of birth (SHA256)
  em?: string[]; // email (SHA256)
  ph?: string[]; // phone (SHA256)
  ct?: string[]; // city (SHA256)
  st?: string[]; // state (SHA256)
  zp?: string[]; // zip/postal (SHA256)
  country?: string[]; // country code (SHA256)
  external_id?: string[]; // internal user id (SHA256)
  fb_login_id?: string; // Facebook Login ID
  client_ip_address?: string; // IP address of the user
  client_user_agent?: string; // User agent of the user
  fbc?: string; // Facebook Click ID
  fbp?: string; // Facebook Browser ID
};

/**
 * Meta Conversions API Custom Data Parameters.
 * Standardized parameters for e-commerce, tracking, and optimization.
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data
 */
export type CustomData = {
  value?: number; // A numeric value associated with the event. Required for Purchase and strongly recommended for optimization.
  currency?: string; // Currency code in ISO 4217 format (e.g., "BDT", "USD"). Required if 'value' is specified.
  content_ids?: string[]; // List of product IDs associated with the event.
  contents?: Content[]; // Detailed list of products involved in the event.
  content_type?: "product" | "product_group" | string; // The type of content. Set to "product" or "product_group".
  content_name?: string; // Name of the main content item
  content_category?: string; // Category or path of the content
  order_id?: string; // Unique transaction identifier
  num_items?: number; // Total number of items in this event
  predicted_ltv?: number; // Predicted lifetime value of the customer
  shipping?: number; // Shipping cost for the transaction
  tax?: number; // Tax amount for the transaction
  discount_value?: number; // Total discount value applied
  coupon?: string; // Coupon or promo code used
  status?: "completed" | "pending" | "failed" | "refunded" | string; // Status of the event (e.g., for lead conversion or offline flows)
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
    | "customer_in_loyalty_program"; // Customer segmentation for the event
};

export type MetaCAPIEventPayload = {
  event_name: GTMEventName;
  event_time: number;
  event_id: string;
  user_data: UserData;
  custom_data?: CustomData;
  action_source: "website";
  event_source_url?: string;
  opt_out?: boolean;
  data_processing_options?: string[];
  data_processing_options_country?: number;
  data_processing_options_state?: number;
  referrer_url?: string;
};
