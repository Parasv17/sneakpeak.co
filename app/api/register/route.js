// api/register
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {

    try {
        const { name, email, password, phoneNumber, houseNumber, locality, streetApartment, pincode, dob } = await req.json();

        // Splitting full name into first, middle, and last names
        const nameParts = name.trim().split(" ");
        const firstName = nameParts.shift();
        const lastName = nameParts.pop();
        const middleName = nameParts.join(" ");

        if (!email || !email.includes("@")) {
            return NextResponse.json({ message: "Invalid email" }, { status: 208 });

        }

        const userRes = await query({
            query: "SELECT * FROM Customer WHERE Email = ?;",
            values: [email],
        });

        if (userRes.length > 0) {
            return NextResponse.json({ message: "Email Id already registerd with other account!" }, { status: 209 });

        } else {
            const newCust = await query({
                query: "INSERT INTO Customer (NameFirst, NameMiddle, NameLast, Email, CustomerPassword, PhoneNo, AddressHouseNo, AddressStreetApt, AddressLocality, AddressPincode, DateOfBirth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                values: [firstName, middleName, lastName, email, password, phoneNumber, houseNumber, streetApartment, locality, pincode, dob],
            });
            return NextResponse.json({ message: "Registered Succeefully!" }, { status: 200 });

        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}


