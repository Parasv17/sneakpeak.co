// api/login.js
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const { email, password } = await req.json();

        // Perform authentication logic here, such as querying the database to verify credentials
        const userRes = await query({
            query: "SELECT * FROM Customer WHERE Email = ? AND CustomerPassword = ?;",
            values: [email, password],
        });

        if (userRes.length === 1) {
            return NextResponse.json({ message: "Login successful" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
