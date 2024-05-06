// pages/api/vendor/login.js
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
       
          
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        
    } catch (error) {
       
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
