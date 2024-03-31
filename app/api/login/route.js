// api/login.js
import { query } from "@/lib/db";
import { NextResponse } from "next/server";
// import { SessionStore } from "next-auth/core/lib/cookie";

export async function POST(req, res) {
    try {
        
        const { email, password } = await req.json();

       
        const userRes = await query({
            query: "SELECT * FROM Customer WHERE Email = ? AND CustomerPassword = ?;",
            values: [email, password],
        });
       
        
        
        if (userRes.length === 1) {
            const customerID = userRes[0].CustomerID;
            return NextResponse.json({ message: "Login successful",userId:customerID }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
