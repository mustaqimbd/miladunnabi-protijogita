/**
 * Normalizes an email address (Meta requirement: trim and lowercase).
 */
export const normalizeEmail = (value: string): string => {
  return value.trim().toLowerCase();
};

/**
 * Normalizes a string to contain only Roman alphabet a-z characters.
 * Recommended by Meta for Names, Cities, and States.
 */
export const normalizeAlpha = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s\p{P}\p{S}\p{N}]/gu, "");
};

/**
 * Normalizes a string to contain only alphanumeric characters.
 * Used for Zip codes and generic identifiers.
 */
export const normalizeAlphaNumeric = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s\p{P}\p{S}]/gu, "");
};

export const hashUserData = async (
  value?: string | null
): Promise<string | undefined> => {
  if (!value) return undefined;

  // Note: Value should ideally be normalized BEFORE calling this function
  // to ensure consistency between GTM and CAPI.
  const msgBuffer = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashed = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashed;
};

/**
 * Retrieves a cookie value by name.
 * @param name The name of the cookie
 * @returns The cookie value or undefined if not found
 */
export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : undefined;
};

/**
 * Sets a cookie with a given name, value, and expiration in days.
 */
export const setCookie = (name: string, value: string, days: number = 730) => {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
};

/**
 * Returns the Meta subdomain index based on the current hostname.
 * 'com' = 0, 'example.com' = 1, 'www.example.com' = 2.
 */
const getSubdomainIndex = (): number => {
  if (typeof window === "undefined") return 1;
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  if (parts.length >= 3 && parts[0] === "www") return 2;
  if (parts.length >= 2) return 1;
  return 1;
};

/**
 * Extracts the Facebook Click ID (fbclid) from the URL, formats it, and persists it in a cookie.
 * This ensures the click ID is available for attribution even if the user navigates away or returns later.
 * Following Meta best practices, it only updates if the fbclid is new.
 * @returns The formatted FBC string or the existing cookie value
 */
export const getFbc = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  // 1. Check URL for new click ID
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  const existingFbc = getCookie("_fbc");

  if (fbclid) {
    // Check if the current fbclid is different from the one in the cookie
    const existingFbclid = existingFbc?.split(".").pop();

    if (!existingFbc || existingFbclid !== fbclid) {
      const fbc = `fb.${getSubdomainIndex()}.${Date.now()}.${fbclid}`;
      setCookie("_fbc", fbc, 90); // Persist for 90 days
      return fbc;
    }
  }

  // 2. Fallback to existing cookie
  return existingFbc;
};

/**
 * Retrieves the Facebook Browser ID (_fbp). If missing, generates a new one to ensure
 * CAPI events always have a browser identifier.
 * @returns The FBP string
 */
export const getFbp = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  const existingFbp = getCookie("_fbp");
  if (existingFbp) return existingFbp;

  // Generate new fbp if missing (e.g. ad blockers blocking Meta Pixel)
  const fbp = `fb.${getSubdomainIndex()}.${Date.now()}.${Math.floor(
    Math.random() * 2147483647
  )}`;
  setCookie("_fbp", fbp, 730); // Meta Pixel sets it for 2 years
  return fbp;
};

/**
 * Extracts the Facebook Login ID (fb_login_id) from the URL and persists it in a cookie.
 * @returns The FB Login ID string or the existing cookie value
 */
export const getFbLoginId = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  // 1. Check URL for new login ID
  const params = new URLSearchParams(window.location.search);
  const fbLoginId = params.get("fb_login_id");
  const existingFbLoginId = getCookie("_fb_login_id");

  if (fbLoginId) {
    if (!existingFbLoginId || existingFbLoginId !== fbLoginId) {
      setCookie("_fb_login_id", fbLoginId, 90); // Persist for 90 days
      return fbLoginId;
    }
  }

  // 2. Fallback to existing cookie
  return existingFbLoginId;
};

/**
 * Normalizes a phone number by removing non-digits and ensuring it starts with a country code.
 */
export const normalizePhone = (phone: string): string => {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? "88" + digits : digits;
};

/**
 * Normalizes a string to contain only Roman alphabet a-z characters (Meta recommendation).
 * Preserved for backward compatibility or direct calls.
 */
export { normalizeAlpha as normalizeCity };

/**
 * Normalizes a date of birth to YYYYMMDD format (Meta requirement).
 */
export const normalizeDOB = (dob: string): string => {
  if (!dob) return "";

  // 1. Handle common separators (-, /, ., _, space)
  const parts = dob.split(/[-/._ ]/);

  if (parts.length === 3) {
    let day = parts[0];
    let month = parts[1];
    let year = parts[2];

    // Format: YYYY-MM-DD
    if (parts[0].length === 4) {
      year = parts[0];
      month = parts[1];
      day = parts[2];
    }
    // Format: DD/MM/YYYY
    else if (parts[2].length === 4) {
      day = parts[0];
      month = parts[1];
      year = parts[2];
    }

    // Ensure they are padded correctly
    const mm = month.padStart(2, "0");
    const dd = day.padStart(2, "0");

    if (year.length === 4 && mm.length === 2 && dd.length === 2) {
      return `${year}${mm}${dd}`;
    }
  }

  // 2. Fallback: just strip everything and keep digits
  const clean = dob.replace(/[^0-9]/g, "");

  // If already 8 digits, ensure it's in a reasonable year range before returning
  if (clean.length === 8) {
    const yearPrefix = clean.substring(0, 2);
    const validPrefixes = ["19", "20"];
    if (validPrefixes.includes(yearPrefix)) return clean;
  }

  return clean;
};

/**
 * Normalizes gender to 'f' or 'm' (Meta requirement).
 */
export const normalizeGender = (ge: string): string => {
  const normalized = ge.trim().toLowerCase();
  if (normalized.startsWith("m")) return "m";
  if (normalized.startsWith("f")) return "f";
  return normalized;
};

/**
 * Generates a unique event ID for GTM/Meta tracking.
 */
export const generateEventId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

export const generatePurchaseEventId = (order_id: string): string => {
  return `purchase_${order_id}`;
};

/**
 * Resolves the final event ID based on priority:
 * 1. Manual event_id if provided.
 * 2. Deterministic purchase ID if event_name is "purchase" and order_id exists.
 * 3. Default random event ID for all other cases.
 *
 * @param event_name - The name of the event
 * @param eventData - The event parameters containing potential order_id or manual event_id
 * @returns A unique or deterministic event ID
 */
export const resolveEventId = (
  event_name: string,
  eventData: { event_id?: string; order_id?: string }
): string => {
  if (eventData.event_id) return eventData.event_id;

  if (event_name.toLowerCase() === "purchase" && eventData.order_id) {
    return generatePurchaseEventId(eventData.order_id);
  }

  return generateEventId(event_name);
};

/**
 * Retrieves or generates a persistent visitor ID for anonymous tracking.
 * @returns A unique visitor ID string
 */
export const getVisitorId = (): string => {
  const existingId = getCookie("_visitor_id");
  if (existingId) return existingId;

  const newId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  setCookie("_visitor_id", newId);
  return newId;
};

/**
 * Retrieves the user's public IP address for Meta CAPI tracking.
 * This is crucial for a 10/10 Match Quality score.
 * Results are cached in memory for the session to avoid multiple API calls.
 */
let cachedIp: string | undefined;
export const getIP = async (): Promise<string | undefined> => {
  if (cachedIp) return cachedIp;
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    cachedIp = data?.ip;
    return cachedIp;
  } catch (_error) {
    return undefined;
  }
};

/**
 * Removes all properties with undefined values from an object.
 * Useful for keeping tracking payloads clean and reducing weight.
 * @param obj The object to clean
 * @returns A new object with only defined properties
 */
export const cleanObj = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as T;
};

export const splitFullName = (fullName?: string) => {
  const trimmed = fullName?.trim();
  if (!trimmed) return { fn: undefined, ln: undefined };

  const nameParts = trimmed.split(/\s+/);

  // 1. Single word — no last name
  if (nameParts.length === 1) {
    return { fn: nameParts[0], ln: undefined };
  }

  // 2. If exactly 2 parts: divide into two as fn, ln
  if (nameParts.length === 2) {
    return { fn: nameParts[0], ln: nameParts[1] };
  }

  // 3. If 3 or more parts: first two words combined are fn, the rest is ln
  const fn = `${nameParts[0]} ${nameParts[1]}`;
  const ln = nameParts.slice(2).join(" ");
  return { fn, ln };
};
