import { queryTransaction } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const {
            ShoeName, ShoesVendorID, Size, Company, ShoeType,
            NumberOfItems, MarkedPrice, DiscountPercentage
        } = await req.json();
        const priceAfterDiscount = MarkedPrice - (MarkedPrice * DiscountPercentage / 100);

        const operations = [
            {
                query: `INSERT INTO Shoe (ShoeName, ShoesVendorID, Size, ShoeCompany, ShoeType, NumberOfItems, MarkedPrice, DiscountPercentage, PriceAfterDiscount)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                values:  [ShoeName, ShoesVendorID, Size, Company, ShoeType,
                NumberOfItems, MarkedPrice, DiscountPercentage, priceAfterDiscount],
            },
            {
                query: `SELECT LAST_INSERT_ID() AS lastShoeId;`,
                values: [],
            },
            {
                query: `UPDATE Vendor SET StockAdded = StockAdded + ? WHERE VendorID = ?;`,
                values: [NumberOfItems, ShoesVendorID],
            },
            {
                query: `INSERT INTO Lists (ShoeID, VendorID, Quantity)
                        VALUES (LAST_INSERT_ID(), ?, ?);`,
                values: [ShoesVendorID, NumberOfItems],
            }
        ];

        const transactionResult = await queryTransaction(operations);
        console.log('Transaction Result:', transactionResult);
        return NextResponse.json({ message: "Shoe added successfully" }, { status: 200 });

    } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json({ message: "Internal server error: " + error.message },{status: 500});
    }
}
