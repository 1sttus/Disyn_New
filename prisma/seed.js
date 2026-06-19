const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@disyn.dev";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminDisynPassword2026!";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: "Admin User",
      password: hashedPassword,
    },
  });

  console.log(`Seeding Admin: ${admin.email}`);

  // 2. Seed Default Pricing Packages
  const packages = [
    {
      title: "Brand Launch",
      description: "Complete design identity & brand architecture for emerging startups.",
      price: "$1,500",
      features: "Logo Design Suite\nTypography & Guidelines\nSocial Media Kit\nCreative Direction (2 Weeks)\nReady in 7 Days",
    },
    {
      title: "Product Experience",
      description: "High-conversion UI/UX + custom web application development.",
      price: "$3,200",
      features: "Figma Interactive Mockup\nMobile-Responsive Next.js Code\nSEO Optimization\nFramer Motion Micro-animations\n3 Weeks Development Support",
    },
    {
      title: "AI Creative System",
      description: "AI-powered web automation and asset generation pipeline.",
      price: "$5,000",
      features: "Stable Diffusion API Integration\nCustom Image Models training\nNext.js SaaS Dashboard UI\nStripe Payment Integration\nFull Architecture & Tech Handoff",
    },
  ];

  for (const pkg of packages) {
    // Look up by title or recreate
    const existing = await prisma.package.findFirst({
      where: { title: pkg.title },
    });

    if (!existing) {
      await prisma.package.create({
        data: pkg,
      });
      console.log(`Created package: ${pkg.title}`);
    } else {
      await prisma.package.update({
        where: { id: existing.id },
        data: pkg,
      });
      console.log(`Updated package: ${pkg.title}`);
    }
  }

  // 3. Seed Mock Project Examples
  const projects = [
    {
      title: "Disyn Brand Identity",
      description: "Premium SaaS dashboard branding and guidelines.",
      category: "Graphic Design",
      imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format&fit=crop",
      problem: "The client needed a high-tech typography system representing AI gravity and space elements.",
      solution: "Designed a sleek dark palette with glowing accents and geometric fonts.",
      impact: "Resulted in a 40% increase in investor brand recall during seed pitch.",
      tags: "Branding,Illustrator,Vector",
    },
    {
      title: "AlphaGen Web Interface",
      description: "Modern landing experience for deep learning genomics engine.",
      category: "UI/UX",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
      problem: "Complex genomics data was hard to navigate and visualize for scientists.",
      solution: "Created an intuitive, dark-mode data platform using node layout styling.",
      impact: "Reduced customer onboarding support queries by 65%.",
      tags: "Figma,UI/UX,Web App",
    },
    {
      title: "E-Commerce Blockchain Platform",
      description: "Full-stack decentralized application using Next.js and Solidity.",
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      problem: "Slow checkout speeds and lack of transaction transparency.",
      solution: "Coded a reactive Next.js storefront utilizing client state caching and smart contract hooks.",
      impact: "Completed $150k in transaction volume in first 30 days.",
      tags: "NextJS,Solidity,Tailwind",
    },
    {
      title: "Aether AI Art Director",
      description: "Generative AI engine translating prompt tokens into visual assets.",
      category: "AI Projects",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
      problem: "Creative designers spent too much time designing initial concept moodboards.",
      solution: "Crafted a model pipeline generating styled graphics via custom Stable Diffusion seeds.",
      impact: "Halved agency concept drafting time from 4 days to 4 hours.",
      tags: "AI,Stable Diffusion,Python",
    },
  ];

  for (const prj of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: prj.title },
    });

    if (!existing) {
      await prisma.project.create({
        data: prj,
      });
      console.log(`Created project: ${prj.title}`);
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
