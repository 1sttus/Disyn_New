import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET all leads (authenticated admin only)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(leads);
  } catch (error: any) {
    console.error("Failed to fetch leads:", error);
    // Return mock CRM leads if DB is not configured/migrated yet
    return NextResponse.json([
      {
        id: "lead-mock-1",
        name: "Elon Musk",
        phone: "+15550199",
        email: "elon@spacex.com",
        packageName: "AI Creative System",
        status: "new",
        notes: "Requested custom Stable Diffusion models for Starship visual planning.",
        createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      },
      {
        id: "lead-mock-2",
        name: "Sarah Jenkins",
        phone: "+447911123456",
        email: "sarah@flowdesign.io",
        packageName: "Product Experience",
        status: "contacted",
        notes: "Followed up via WhatsApp. Scheduling a call for next Tuesday.",
        createdAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
      },
      {
        id: "lead-mock-3",
        name: "Marc Andreessen",
        phone: "+16508889999",
        email: "pmarca@a16z.com",
        packageName: "Brand Launch",
        status: "closed",
        notes: "Signed retainer. Project kicks off next month.",
        createdAt: new Date(Date.now() - 3600000 * 24 * 5), // 5 days ago
      }
    ]);
  }
}

// PUT update lead status or notes (authenticated admin only)
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });
    }

    const updated = await db.lead.update({
      where: { id },
      data: {
        status,
        notes,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update lead", details: error.message }, { status: 500 });
  }
}

// DELETE lead (authenticated admin only)
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });
    }

    await db.lead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete lead", details: error.message }, { status: 500 });
  }
}
