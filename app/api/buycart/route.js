
import { queryTransaction } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const { userId } = await req.json();

        const operations = [
          {
              query: `INSERT INTO Orders (CustomerID, OrderDate, TotalAmount) VALUES (?, CURDATE(), (
                  SELECT SUM(s.MarkedPrice * c.Quantity) FROM Cart c JOIN Shoe s ON c.ShoeID = s.ShoeID WHERE c.CustomerID = ?
              ))`, // Initial order insertion
              values: [userId, userId],
          },
          {
              query: `SELECT LAST_INSERT_ID() AS OrderID;`, // Retrieving the last inserted OrderID
              values: [], // No values needed for this operation
          },
          {
              query: `INSERT INTO OrderItems (OrderID, ShoeID, Quantity, Price) SELECT LAST_INSERT_ID(), c.ShoeID, c.Quantity, s.MarkedPrice FROM Cart c JOIN Shoe s ON c.ShoeID = s.ShoeID WHERE c.CustomerID = ?;`, // Use LAST_INSERT_ID() directly here
              values: [userId],
          },
          {
              query: `UPDATE Shoe SET NumberOfItems = NumberOfItems - (SELECT Quantity FROM Cart WHERE CustomerID = ? AND ShoeID = Shoe.ShoeID) WHERE ShoeID IN (SELECT ShoeID FROM Cart WHERE CustomerID = ?)`, // Update inventory
              values: [userId, userId],
          },
          {
              query: `INSERT INTO Sold (ShoeID, VendorID, Price, Quantity, Date) SELECT c.ShoeID, s.ShoesVendorID, s.MarkedPrice, c.Quantity, CURDATE() FROM Cart c JOIN Shoe s ON c.ShoeID = s.ShoeID WHERE c.CustomerID = ?;`, // Insert into Sold table
              values: [userId],
          },
          {
              query: `DELETE FROM Cart WHERE CustomerID = ?;`, // Clear cart
              values: [userId],
          }
      ];


        const transactionResult = await queryTransaction(operations);
        console.log('Transaction Result:', transactionResult);
        return NextResponse.json({ message: "Order processed successfully" }, { status: 200 });

    } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json({ message: "Internal server error: " + error.message },{status: 500});
    }
}
