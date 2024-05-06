import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

// Example of a POST handler function in Next.js API Routes
export async function POST(req) {
  // Destructure and parse the incoming request data
  const {
    VendorNameFirst,
    VendorNameLast,
    VendorEmail,
    VendorPassword,
    StockAdded,
    VendorAddressShopNo,
    VendorAddressStreetNo,
    VendorAddressLocality,
    VendorAddressPincode
  } = await req.json();

  // SQL Query to insert a new vendor
  const sqlQuery = `
    INSERT INTO Vendor (
      VendorNameFirst, VendorNameLast, VendorEmail, VendorPassword,
      StockAdded, VendorAddressShopNo, VendorAddressStreetNo, 
      VendorAddressLocality, VendorAddressPincode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  // Values array for parameterized query
  const values = [
    VendorNameFirst, VendorNameLast, VendorEmail, VendorPassword,
    StockAdded, VendorAddressShopNo, VendorAddressStreetNo, 
    VendorAddressLocality, VendorAddressPincode
  ];

  try {
    // Execute the SQL query
    const result = await query({ query: sqlQuery, values: values });
    // Return success response
    return NextResponse.json({ status: 200, message: "Vendor added successfully", result });
  } catch (error) {
    console.error("Database error:", error);
    // Return error response
    return NextResponse.json({ status: 500, message: "Failed to add vendor: " + error.message });
  }
}
