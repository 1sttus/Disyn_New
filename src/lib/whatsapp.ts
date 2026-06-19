/**
 * WhatsApp Cloud API integration service
 * Handles sending automated WhatsApp notifications to clients and admins.
 * Falls back to logging mock payloads if API credentials are not configured.
 */

interface SendWhatsAppParams {
  to: string;
  message: string;
}

export async function sendWhatsAppMessage({ to, message }: SendWhatsAppParams) {
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  // Clean phone number (remove +, spaces, dashes)
  const cleanPhone = to.replace(/[+\s-]/g, "");

  console.log(`[WhatsApp Service] Attempting to send message to ${cleanPhone}`);
  console.log(`[WhatsApp Service] Message content: "${message}"`);

  // Detect if credentials are placeholder or empty (dev / mock mode)
  const isMockMode =
    !phoneId ||
    !token ||
    phoneId.includes("your_phone_number_id_here") ||
    token.includes("your_access_token_here");

  if (isMockMode) {
    console.log("[WhatsApp Service] [MOCK MODE] Messaging credentials are unconfigured or placeholder. Simulating successful send.");
    return {
      success: true,
      mode: "mock",
      message: "Mock message sent successfully (simulated)",
      recipient: cleanPhone,
    };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[WhatsApp Service] Graph API error:", data);
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    console.log("[WhatsApp Service] Message successfully sent via Cloud API:", data);
    return {
      success: true,
      mode: "live",
      data,
    };
  } catch (error: any) {
    console.error("[WhatsApp Service] Exception occurred sending message:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
}

/**
 * Generates a wa.me direct chat link as a fallback UI option for clients.
 */
export function getWhatsAppClickToChatLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[+\s-]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
