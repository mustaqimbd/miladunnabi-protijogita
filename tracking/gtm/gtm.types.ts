export type GA4Address = {
  first_name?: string;
  last_name?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country?: string;
};

export type GA4UserData = {
  email_address?: string;
  phone_number?: string;
  address?: GA4Address;
  // Advanced Matching - Identifiers (SHA256 hashed)
  external_id?: string; // Hashed internal user ID
  fb_login_id?: string; // Facebook Login ID
  fbc?: string;
  fbp?: string;
  gender?: string;
  dob?: string;
};

export type GA4Item = {
  item_id?: string;
  item_name?: string;
  price?: number;
  quantity?: number;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
};

export type GTMEventPayload = {
  event: string;
  eventModel: {
    event_id: string;
    event_time: number;
    user_data?: GA4UserData;
    items?: GA4Item[];
    content_type?: string;
    content_ids?: string[];
    content_name?: string;
    content_category?: string;
    num_items?: number;
    value?: number;
    currency?: string;
    shipping?: number;
    tax?: number;
    discount_value?: number;
    payment_method?: string;
    transaction_id?: string;
    search_term?: string;
    coupon?: string;
    status?: string;
    order_id?: string;
    event_source_url?: string;
  };
};
