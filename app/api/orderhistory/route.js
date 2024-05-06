import { query } from "@/lib/db";
import { Oregano } from "next/font/google";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
   const {userId} = await req.json();
   const Query = `SELECT
   o.OrderID,
   o.OrderDate,
   o.TotalAmount,
   oi.OrderItemID,
   oi.Quantity,
   oi.Price,
   s.ShoeName
FROM Orders o
LEFT JOIN OrderItems oi ON o.OrderID = oi.OrderID
LEFT JOIN Shoe s ON oi.ShoeID = s.ShoeID
WHERE o.CustomerID = ?
ORDER BY o.OrderDate DESC, o.OrderID DESC, oi.OrderItemID DESC;`;
   const result= await query({
    query: Query,
    values: [userId],
});
const orders = {};
result.forEach(item => {
    if (!orders[item.OrderID]) {
        orders[item.OrderID] = {
            OrderDate: item.OrderDate,
            TotalAmount: item.TotalAmount,
            items: []
        };
    }
    if (item.OrderItemID) { // Check if there's any item associated with the order
        orders[item.OrderID].items.push({
            ShoeName: item.ShoeName,
            Quantity: item.Quantity,
            Price: item.Price
        });
    }
});

            console.log(orders);
            const formattedOrders = Object.values(orders);
            console.log(formattedOrders);

          return NextResponse.json({orders:formattedOrders }, { status: 200});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: error.message });
        
    }

}