import { query } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    try {
       const {username, password } = await req.json();   

    
          const adminRes = await query({
            query: "SELECT * FROM SiteAdmin WHERE username = ? AND password = ?;",
            values: [username, password],
        });
        if(adminRes.length === 1){
            console.log("Login successful");
           
            return NextResponse.json({ message: "Login successful" }, { status: 200 });
       
        }else{
            // console.log("Invalid ID or password");
            return NextResponse.json({ message: "Invalid ID or password" }, { status: 401 });
        }
         
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500}, {message: error.message });
        
    }

}