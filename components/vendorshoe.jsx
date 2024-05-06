"use client";
import React, { Component } from "react";
import toast from "react-hot-toast";

export class Shoebox extends Component {
     handleUnlistShoe = async (id) => {
      const vendorId = sessionStorage.getItem("vendorId"); // Retrieve vendor ID from session storage
      console.log("vid",vendorId);
      console.log("uid",id);

        const response = await fetch('/api/vendor/unlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shoeid: id, vendorid: vendorId})
        });
    
        if (response.ok) {
          toast.success("Shoe successfully unlisted");
        } else {
          toast.error("Failed to unlist shoe");
        }
      };
    
      //  handleIncreaseStock = async (id) => {
      //   const newQty = parseInt(qty) + 1; // Increment stock quantity by 1 for demo
      //   const response = await fetch('/api/vendor/updatestock', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ shoeId: this.id, newQty, vendorId: this.vendorId})
      //   });
    
      //   if (response.ok) {
      //     toast.success("Stock quantity updated successfully");
      //   } else {
      //     toast.error("Failed to update stock quantity");
      //   }
      // };

  render() {
    const {
      id,
      name,
      type,
      size,
      company,
      priceafdisc,
      discper,
      markedprice,
      qty,
      image = "/Rectangle 8.png" // Default image if none provided
    } = this.props;
    const  fpriceafdisc = parseFloat(priceafdisc).toFixed(2);
    const  fmarkedprice = parseFloat(markedprice).toFixed(2);

    return (
      <div className="flex w-full max-w-xl mx-auto overflow-hidden bg-white rounded-xl border shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-40 h-40 object-cover"
        />
        <div className="px-5 py-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-custom-blue">{name} - {company}</h3>
            <p className="text-gray-500">{type}, Size: {size}</p>
          </div>
          <div>
            <p className="text-xl font-bold overflow-hidden">${fpriceafdisc} <span className="line-through text-sm text-gray-400">${fmarkedprice}</span></p>
            <p className="text-sm text-green-500">-{discper}%</p>
            <p className="text-gray-500">In Stock: {qty}</p>
          </div>
          <div className="flex flex-col justify-around gap-4">
        <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700" onClick={()=>{this.handleUnlistShoe(id)}}>Unlist Shoe</button>
        {/* <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700" onClick={()=>{this.handleIncreaseStock(id)}}>Edit listing</button> */}
      </div>
        </div>
      </div>
    );
  }
}

export default Shoebox;
