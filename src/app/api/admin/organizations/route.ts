import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const organizations = await db.organization.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        description: true,
        createdAt: true,
      },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    console.error("Failed to fetch organizations", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, description, status = "active" } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const organization = await db.organization.create({
      data: {
        name,
        slug,
        description,
        status,
      },
    });

    return NextResponse.json(organization);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create organization", details: error.message }, { status: 500 });
  }
}
