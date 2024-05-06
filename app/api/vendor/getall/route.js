import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(res) {
  try {
    const allvendors = await query({
            query: "SELECT * FROM Vendor",
            values: [],
          });
          console.log(allvendors);
        
          return NextResponse.json({vendorslist: allvendors }, { status: 200});
        
    }

   catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500, message: error.message });
      
  }

}