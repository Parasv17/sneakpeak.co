// api/login.js
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const {shoeid,custid,qty,action } = await req.json();
       

       // Assuming the start of your POST function remains the same...

if (action == "remove") {
    // First, check the current quantity
    const currentQtyRes = await query({
        query: "SELECT Quantity FROM Cart WHERE CustomerID = ? AND ShoeID = ?",
        values: [custid, shoeid],
    });

    if (currentQtyRes.length > 0 && currentQtyRes[0].Quantity > 1) {
        // If quantity is more than 1, decrease it by 1
        await query({
            query: "UPDATE Cart SET Quantity = Quantity - 1 WHERE CustomerID = ? AND ShoeID = ?",
            values: [custid, shoeid],
        });
        return NextResponse.json({ message: "Decreased item quantity by 1." }, { status: 200 });
    } else if (currentQtyRes.length > 0) {
        // If quantity is 1, delete the item
        await query({
            query: "DELETE FROM Cart WHERE CustomerID = ? AND ShoeID = ?",
            values: [custid, shoeid],
        });
        return NextResponse.json({ message: "Item removed from cart successfully." }, { status: 200 });
    } else {
        // If no item was found to remove
        return NextResponse.json({ message: "No item found to remove" }, { status: 404 });
    }
}
// Continue with the rest of your function...


        // Perform authentication logic here, such as querying the database to verify credentials
        //check in shoes if the qty is available
        // const shoeqty = await query({
        //     query: "select  NumberOfItems from Shoe where ShoeID=?",
        //     values: [shoeid],
        // });
        else if
        (action == "add"){
           
            const userRes = await query({
                query: "INSERT INTO Cart (CustomerID, ShoeID, Quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE Quantity = Quantity + VALUES(Quantity)",
                values: [custid,shoeid,qty],
            });
            
            return NextResponse.json({ message: "Item added to cart Successfully" }, { status: 200 });
        }
        


        
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
