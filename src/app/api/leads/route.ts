import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWhatsAppMessage, getWhatsAppClickToChatLink } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, packageName, packageId } = body;

    if (!name || !phone || !packageName) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, packageName" },
        { status: 400 }
      );
    }

    // 1. Save Lead to database
    let lead;
    try {
      lead = await db.lead.create({
        data: {
          name,
          phone,
          email: email || null,
          packageName,
          packageId: packageId || null,
          status: "new",
        },
      });
    } catch (dbError) {
      console.error("Database lead creation failed, continuing as mock-lead:", dbError);
      lead = {
        id: "mock-lead-" + Date.now(),
        name,
        phone,
        email,
        packageName,
        packageId,
        status: "new",
        createdAt: new Date(),
      };
    }

    // 2. Track Conversion Event in Analytics
    try {
      await db.analyticsLog.create({
        data: {
          eventType: "conversion",
          eventDetails: `Lead registered for package: ${packageName}`,
        },
      });
    } catch (analyticsError) {
      console.error("Analytics tracking failed:", analyticsError);
    }

    // 3. Format WhatsApp Messages
    const clientMessage = `Hello ${name}! Thank you for selecting our "${packageName}" package at Disyn. 🚀 We've received your request and will get in touch with you shortly to schedule our discovery call.\n\nNext steps:\n1. We will verify your project scope.\n2. We will send over a brief UI questionnaire.\n\nTalk soon!`;
    const adminMessage = `🔥 NEW LEAD INCOMING!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "N/A"}\nRequested Package: ${packageName}\nLead ID: ${lead.id}`;

    // 4. Send WhatsApp Messages (Client & Admin Notification)
    const clientResult = await sendWhatsAppMessage({
      to: phone,
      message: clientMessage,
    });

    const adminPhone = process.env.WHATSAPP_ADMIN_PHONE || "1234567890";
    const adminResult = await sendWhatsAppMessage({
      to: adminPhone,
      message: adminMessage,
    });

    // 5. Generate wa.me link for direct UI conversion (client click-to-chat with admin)
    const creatorWelcomeMessage = `Hi! I just submitted a request for the "${packageName}" package on Disyn. My name is ${name}. I'd love to chat!`;
    const directChatLink = getWhatsAppClickToChatLink(adminPhone, creatorWelcomeMessage);

    return NextResponse.json({
      success: true,
      lead,
      whatsapp: {
        client: clientResult,
        admin: adminResult,
      },
      directChatLink,
    });
  } catch (error: any) {
    console.error("Critical error in leads API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple check
  return NextResponse.json({ status: "leads API active" });
}
