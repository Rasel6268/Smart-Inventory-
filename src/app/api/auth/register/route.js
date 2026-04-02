import connectDb from "@/config/db/database";
import Users from "@/model/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // use import in Next.js

export async function POST(req) {
  try {
    await connectDb();

    const body = await req.json();
    
    const { name, email, password } = body;

    // check if user exists
    const existUser = await Users.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}