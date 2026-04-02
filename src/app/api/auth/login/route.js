import connectDb from "@/config/db/database";
import Users from "@/model/Users";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(req) {
  try {
    connectDb();
    const body = await req.json();
    const { email, password } = body;
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: `This ${email} Email Not Found!!`,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return {
        status: 401,
        message: "Invalid credentials",
      };
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const response = NextResponse.json({
      message: "User Login successfull",
      user: { name: user.name, email: user.email, _id: user._id },
      status: 200,
    });
    response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
    })

   return  response
  } catch (error) {}
}
