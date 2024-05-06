import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const customers = await query({
            query: "SELECT * FROM Customer",
            values: [],
          });
          console.log(customers);
        //   res.status(200).json({ cands:candidates });
          return NextResponse.json({ status: 200,custs: customers });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: error.message });
        
    }

}