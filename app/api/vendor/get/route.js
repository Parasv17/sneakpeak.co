import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const {vendorId } = await req.json();
  const allshoes = await query({
          query: "SELECT * FROM Shoe WHERE ShoesVendorID = ? AND NumberOfItems > 0",
          values: [vendorId],
        });
        console.log(allshoes);
      
        return NextResponse.json({shoeslist: allshoes }, { status: 200});
      
  } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500, message: error.message });
      
  }

}