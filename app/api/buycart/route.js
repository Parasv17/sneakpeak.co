import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const {userId } = await req.json();
        // console.log("custid-buy",userId);
    const updateshoe = await query({
            query: "UPDATE Shoe SET NumberOfItems = NumberOfItems - (SELECT Quantity FROM Cart WHERE CustomerID = ? AND ShoeID = Shoe.ShoeID) WHERE ShoeID IN (SELECT ShoeID FROM Cart WHERE CustomerID = ?)",
            values: [userId,userId],
          });
        //   console.log("updateshoe",updateshoe);
    const deletecart = await query({
            query: "DELETE FROM Cart WHERE CustomerID = ?",
            values: [userId],
          });
        //   console.log("deletecart",deletecart);
        
          return NextResponse.json( { status: 200});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500}, {message: error.message });
        
    }

}