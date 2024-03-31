import { query } from "@/lib/db";
import { NextResponse } from "next/server";
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

export async function POST(req, res) {
    try {
       const {adminID, password } = await req.json();   
       console.log("adminID",adminID);
         console.log("password",password);
    
          const adminRes = await query({
            query: "SELECT * FROM siteadmin WHERE username = ? AND password = ?;",
            values: [adminID, password],
        });
        if(adminRes.length === 1){
            console.log("Login successful");
            const soldRes = await query({
                query: "SELECT * FROM Sold;",
                values: [], // No values needed for this query
            });
            console.log(soldRes);
            return NextResponse.json({ message: "Login successful",SoldTable:soldRes }, { status: 200 });
       
        }else{
            console.log("Invalid ID or password");
            return NextResponse.json({ message: "Invalid ID or password" }, { status: 401 });
        }
         
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500}, {message: error.message });
        
    }

}