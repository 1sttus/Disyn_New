import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const programs = await db.program.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        level: true,
        organizationId: true,
      },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error("Failed to fetch programs", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, description, organizationId, status = "draft", level = "foundation" } = body;

    if (!title || !slug || !organizationId) {
      return NextResponse.json({ error: "Title, slug and organizationId are required" }, { status: 400 });
    }

    const program = await db.program.create({
      data: {
        title,
        slug,
        description,
        organizationId,
        status,
        level,
      },
    });

    return NextResponse.json(program);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create program", details: error.message }, { status: 500 });
  }
}
