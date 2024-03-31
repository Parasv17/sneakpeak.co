import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
    const allshoes = await query({
            query: "SELECT * FROM Shoe",
            values: [],
          });
        //   console.log(allshoes);
        
          return NextResponse.json({shoeslist: allshoes }, { status: 200});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: error.message });
        
    }

}