import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "password123";
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update password if user exists
      user.password = hashedPassword;
      await user.save();
    } else {
      // Create user
      user = new User({
        email,
        password: hashedPassword,
      });
      await user.save();
    }

    return NextResponse.json({ 
      success: true, 
      message: "Admin user created successfully",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
