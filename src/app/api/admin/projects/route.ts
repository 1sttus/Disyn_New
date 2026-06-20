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
        id: "mock-2",
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
        id: "mock-3",
        title: "E-Commerce Blockchain Platform",
        description: "Full-stack decentralized application using Next.js and Solidity.",
        category: "Web Development",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
        problem: "Slow checkout speeds and lack of transaction transparency.",
        solution: "Coded a reactive Next.js storefront utilizing client state caching and smart contract hooks.",
        impact: "Completed $150k in transaction volume in first 30 days.",
        tags: "NextJS,Solidity,Tailwind",
        status: "published",
      },
      {
        id: "mock-4",
        title: "Aether AI Art Director",
        description: "Generative AI engine translating prompt tokens into visual assets.",
        category: "AI Projects",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
        problem: "Creative designers spent too much time designing initial concept moodboards.",
        solution: "Crafted a model pipeline generating styled graphics via custom Stable Diffusion seeds.",
        impact: "Halved agency concept drafting time from 4 days to 4 hours.",
        tags: "AI,Stable Diffusion,Python",
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
