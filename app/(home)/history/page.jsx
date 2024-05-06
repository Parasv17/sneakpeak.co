"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

function Page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        setError('Please log in to view your order history.');
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const data = { userId };
        const res = await fetch("/api/orderhistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          // throw new Error('Failed to fetch order history');
        }

        const result = await res.json();
        if (result.orders && result.orders.length) {
          setOrders(result.orders);
        } else {
          setError('No orders found.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load order history');
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="text-center p-4"><h2 className="text-xl font-bold">{error}</h2></div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Order History</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="mb-6 p-6 shadow-lg rounded-lg bg-white">
            <p className="text-lg font-semibold mb-2">Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
            <p className="text-lg mb-4">Total Amount: <span className="font-semibold">${order.TotalAmount.toFixed(2)}</span></p>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg underline">Items:</h3>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="pl-4">
                  <p className="text-md font-semibold">{item.ShoeName}</p>
                  <p className="text-sm">Quantity: {item.Quantity}</p>
                  <p className="text-sm">Price per item: ${item.Price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg">No orders found.</p>
      )}
    </div>
  );
}

export default Page;
