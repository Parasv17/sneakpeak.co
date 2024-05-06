
import { queryTransaction} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const { shoeid, vendorid } = await req.json();
        console.log(shoeid, vendorid);
        // const queryText = `START TRANSACTION;
        // UPDATE Shoe
        // SET NumberOfItems =0
        // WHERE ShoeID = ? AND ShoesVendorID = ?;
        
        // UPDATE Vendor
        // SET StockAdded = StockAdded - (
        //     SELECT Quantity
        //     FROM lists
        //     WHERE ShoeID =?  AND VendorID = ?
        // )
        // WHERE VendorID = ?;
        
        
        // DELETE FROM Cart
        // WHERE ShoeID = ?;
        
        
        
        
        // DELETE FROM lists
        // WHERE ShoeID = ? AND VendorID = ?;
        
       
        
        // COMMIT;`

        // const results = await query({query:queryText,values: [shoeid, vendorid, shoeid, vendorid, vendorid, shoeid, shoeid, vendorid, shoeid, vendorid]});
        const operations = [
            {
                query: `UPDATE Shoe SET NumberOfItems = 0 WHERE ShoeID = ? AND ShoesVendorID = ?;`,
                values: [shoeid, vendorid]
            },
            {
                query: `UPDATE Vendor SET StockAdded = StockAdded - (SELECT Quantity FROM lists WHERE ShoeID = ? AND VendorID = ?) WHERE VendorID = ?;`,
                values: [shoeid, vendorid, vendorid]
            },
            {
                query: `DELETE FROM Cart WHERE ShoeID = ?;`,
                values: [shoeid]
            },
            {
                query: `DELETE FROM lists WHERE ShoeID = ? AND VendorID = ?;`,
                values: [shoeid, vendorid]
            }
        ];

        const result = await queryTransaction(operations);

        return NextResponse.json({ message: "Shoe successfully unlisted" }, { status: 200 });
    }
    catch (error) {

        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
