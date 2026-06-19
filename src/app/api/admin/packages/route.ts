import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET all packages (publicly accessible)
export async function GET() {
  try {
    const packages = await db.package.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(packages);
  } catch (error: any) {
    console.error("Failed to fetch packages:", error);
    // Return mock packages if database is empty/unconfigured
    return NextResponse.json([
      {
        id: "pack-1",
        title: "Brand Launch",
        description: "Complete design identity & brand architecture for emerging startups.",
        price: "$1,500",
        features: "Logo Design Suite\nTypography & Guidelines\nSocial Media Kit\nCreative Direction (2 Weeks)\nReady in 7 Days",
      },
      {
        id: "pack-2",
        title: "Product Experience",
        description: "High-conversion UI/UX + custom web application development.",
        price: "$3,200",
        features: "Figma Interactive Mockup\nMobile-Responsive Next.js Code\nSEO Optimization\nFramer Motion Micro-animations\n3 Weeks Development Support",
      },
      {
        id: "pack-3",
        title: "AI Creative System",
        description: "AI-powered web automation and asset generation pipeline.",
        price: "$5,000",
        features: "Stable Diffusion API Integration\nCustom Image Models training\nNext.js SaaS Dashboard UI\nStripe Payment Integration\nFull Architecture & Tech Handoff",
      }
    ]);
  }
}

// POST create package (authenticated admin only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, price, features } = body;

    if (!title || !description || !price || !features) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPackage = await db.package.create({
      data: {
        title,
        description,
        price,
        features,
      },
    });

    return NextResponse.json(newPackage);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create package", details: error.message }, { status: 500 });
  }
}

// PUT update package (authenticated admin only)
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, description, price, features } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing package ID" }, { status: 400 });
    }

    const updated = await db.package.update({
      where: { id },
      data: {
        title,
        description,
        price,
        features,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update package", details: error.message }, { status: 500 });
  }
}

// DELETE package (authenticated admin only)
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing package ID" }, { status: 400 });
    }

    await db.package.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Package deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete package", details: error.message }, { status: 500 });
  }
}
