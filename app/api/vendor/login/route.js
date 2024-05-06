// pages/api/vendor/login.js
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const { email, password } = await req.json();  
        const vendorRes = await query({
            query: "SELECT * FROM Vendor WHERE VendorEmail = ? AND VendorPassword = ?;",
            values: [email, password],
        });

        
        if (vendorRes.length === 1) {
            const vendorID = vendorRes[0].VendorID;  
            return NextResponse.json({ message: "Login successful", vendorId: vendorID }, { status: 200 });
        } else {
          
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }
    } catch (error) {
       
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
