import connectDb from "@/config/db/database";
import Users from "@/model/Users";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET() {
  const storeToken = await cookies();

  const token = storeToken.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  connectDb();
  const user = await Users.findById(decode.userId).select('-password');
  return NextResponse.json(user);
}
