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
      title: "Starter Brand System",
      description: "For individuals and small brands ready to look professional.",
      price: "$1,500",
      features: "Logo direction\nBasic identity system\nSocial media kit",
    },
    {
      title: "Pro Brand + Website System",
      description: "For serious businesses ready to scale online presence.",
      price: "$3,200",
      features: "Full brand identity\nWebsite UI/UX design\nConversion-focused structure",
    },
    {
      title: "Premium Digital System",
      description: "For brands that want dominance, not visibility.",
      price: "$5,000",
      features: "Brand identity system\nHigh-converting website\nUI/UX product design\nStrategy consultation",
    },
  ];

  for (const pkg of packages) {
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
      title: "AI Creative System",
      description: "An automated visual workflow generator translating prompt tags into design drafts.",
      category: "AI Projects",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
      problem: "Creative designers spend days manually drafting moodboards and layout directions.",
      solution: "Implementing a custom stable diffusion API pipeline with predefined asset templates.",
      impact: "Upcoming system scheduled for private beta deployment in Q4.",
      tags: "AI Workflows,Stable Diffusion,NextJS",
      status: "upcoming",
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
    } else {
      await prisma.project.update({
        where: { id: existing.id },
        data: prj,
      });
      console.log(`Updated project: ${prj.title}`);
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
