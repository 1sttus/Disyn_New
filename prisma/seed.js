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
      title: "Church Conference Visual System",
      description: "Event identity, social flyers, banners, and announcement graphics for a worship conference.",
      category: "Church Graphics",
      imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&auto=format&fit=crop",
      problem: "The church needed a consistent visual system for online promotion and printed event communication.",
      solution: "Built a bold graphic direction with reusable flyer layouts, typography, and announcement templates.",
      impact: "Improved event clarity across social media, Sunday announcements, and printed materials.",
      tags: "Church Design,Flyers,Event Branding",
      status: "published",
    },
    {
      title: "School Admission Campaign",
      description: "Graphic campaign assets for admission awareness, parent communication, and social media.",
      category: "School Graphics",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      problem: "The school needed clearer promotional materials that felt professional and easy for parents to understand.",
      solution: "Designed a clean campaign system with admission flyers, digital posts, and information hierarchy.",
      impact: "Made the admission message easier to share, read, and act on.",
      tags: "School Design,Campaign,Social Media",
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
      title: "Aether AI Art Director",
      description: "Generative AI engine translating prompt tokens into visual assets.",
      category: "AI Projects",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
      problem: "Creative designers spent too much time designing initial concept moodboards.",
      solution: "Crafted a model pipeline generating styled graphics via custom Stable Diffusion seeds.",
      impact: "Halved agency concept drafting time from 4 days to 4 hours.",
      tags: "AI,Stable Diffusion,Python",
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
