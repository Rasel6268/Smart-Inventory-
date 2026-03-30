import connectDb from "@/config/db/database";
import { NextResponse } from "next/server";

export async function GET (req) {
   try {
     await connectDb()
     
     return NextResponse.json({massage: "this is server "})
   } catch (error) {
    
   }

}