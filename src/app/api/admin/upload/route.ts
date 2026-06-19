import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Check if mock mode (keys are empty or placeholders)
    const isMockMode =
      !cloudName ||
      !apiKey ||
      !apiSecret ||
      cloudName.includes("your_cloudinary") ||
      apiKey.includes("your_cloudinary");

    if (isMockMode) {
      console.log("[Upload Service] [MOCK MODE] Cloudinary keys not configured. Simulating image upload.");
      // Generate a mock premium visual URL
      const mockKeywords = ["design", "workspace", "code", "ai", "dashboard", "abstract"];
      const randomKeyword = mockKeywords[Math.floor(Math.random() * mockKeywords.length)];
      const mockUrl = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000000)}?w=800&auto=format&fit=crop&q=80&sig=${randomKeyword}`;

      return NextResponse.json({
        success: true,
        mode: "mock",
        url: mockUrl,
      });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload to Cloudinary using a Promise wrapper
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "disyn-portfolio",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      mode: "live",
      url: uploadResult.secure_url,
    });
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
