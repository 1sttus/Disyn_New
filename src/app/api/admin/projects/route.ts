import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET all projects (publicly accessible)
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Failed to fetch projects:", error);
    // Return mock projects if DB is not configured/migrated yet
    return NextResponse.json([
      {
        id: "mock-1",
        title: "Redeemer Assembly Visual Revitalization",
        description: "Complete brand guidelines and digital media suite for a global church ministry.",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format&fit=crop",
        problem: "The ministry branches lacked a unified presentation on visual media layouts and print brochures.",
        solution: "Engineered a minimalist cross monogram combined with a cohesive navy and gold visual standard.",
        impact: "Unified visual media across 15 regional branches and boosted stream viewership by 55%.",
        tags: "Church Branding,Logo Design,CorelDraw",
        status: "published",
      },
      {
        id: "mock-2",
        title: "Greenwood Academy Admissions Prospectus",
        description: "Premium recruitment brochures outlining STEM curriculum offerings.",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
        problem: "Traditional text-heavy print brochures failed to attract students to their new STEM labs.",
        solution: "Created an engaging visual booklet incorporating custom illustrations and visual metric tables.",
        impact: "Drove a 30% increase in prospective student applications in the first admissions cycle.",
        tags: "School Branding,Booklet Design,InDesign",
        status: "published",
      },
      {
        id: "mock-3",
        title: "Youth Empowerment Initiative Identity",
        description: "A professional logo system engineered to align youth appeal with donor credibility.",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
        problem: "The NGO struggled to secure corporate partnerships due to an outdated, informal logo system.",
        solution: "Crafted a custom vector emblem representing growth and network nodes.",
        impact: "Enabled a successful re-launch, securing three major corporate sponsorships within 90 days.",
        tags: "NGO Identity,Logo Design,Vector",
        status: "published",
      },
      {
        id: "mock-4",
        title: "AlphaGen Web Interface",
        description: "Modern landing experience for deep learning genomics engine.",
        category: "UI/UX",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
        problem: "Complex genomics data was hard to navigate and visualize for scientists.",
        solution: "Created an intuitive, dark-mode data platform using node layout styling.",
        impact: "Reduced customer onboarding support queries by 65%.",
        tags: "Figma,UI/UX,Web App",
        status: "published",
      },
      {
        id: "mock-5",
        title: "Disyn Brand Identity",
        description: "Premium SaaS dashboard branding and guidelines.",
        category: "Graphic Design",
        imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format&fit=crop",
        problem: "The client needed a high-tech typography system representing AI gravity and space elements.",
        solution: "Designed a sleek dark palette with glowing accents and geometric fonts.",
        impact: "Resulted in a 40% increase in investor brand recall during seed pitch.",
        tags: "Branding,Illustrator,Vector",
        status: "published",
      },
      {
        id: "mock-6",
        title: "AI Creative System",
        description: "An automated visual workflow generator translating prompt tags into design drafts.",
        category: "AI Projects",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
        problem: "Creative designers spend days manually drafting moodboards and layout directions.",
        solution: "Implementing a custom stable diffusion API pipeline with predefined asset templates.",
        impact: "Upcoming system scheduled for private beta deployment in Q4.",
        tags: "AI Workflows,Stable Diffusion,NextJS",
        status: "upcoming",
      }
    ]);
  }
}

// POST create project (authenticated admin only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, category, imageUrl, problem, solution, impact, tags, status } = body;

    if (!title || !description || !category || !imageUrl || !problem || !solution || !impact || !tags) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await db.project.create({
      data: {
        title,
        description,
        category,
        imageUrl,
        problem,
        solution,
        impact,
        tags,
        status: status || "published",
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create project", details: error.message }, { status: 500 });
  }
}

// PUT update project (authenticated admin only)
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, description, category, imageUrl, problem, solution, impact, tags, status } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const updated = await db.project.update({
      where: { id },
      data: {
        title,
        description,
        category,
        imageUrl,
        problem,
        solution,
        impact,
        tags,
        status,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update project", details: error.message }, { status: 500 });
  }
}

// DELETE project (authenticated admin only)
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete project", details: error.message }, { status: 500 });
  }
}
