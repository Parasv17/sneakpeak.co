"use client"
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddNewShoe() {
  const [shoeForm, setShoeForm] = useState({
    ShoeName: '',
    ShoeType: '',
    Size: '',
    Company: '',
    MarkedPrice: '',
    DiscountPercentage: '',
    NumberOfItems: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoeForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shoesVendorID = sessionStorage.getItem('vendorId');
    if (!shoesVendorID) {
        toast.error('Vendor ID missing in session storage');
        return;
    }

    // Prepare the data payload, including the shoesVendorID
    const payload = {
        ...shoeForm,  // Spread in the existing form state
        ShoesVendorID: parseInt(shoesVendorID),  // Ensure it's correctly formatted as an integer
    };

    try {
        const response = await fetch('/api/vendor/addnewshoe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),  // Send the payload as JSON
        });

      if (response.ok) {
        toast.success('Shoe added successfully!');
        setShoeForm({
          ShoeName: '',
          ShoeType: '',
          Size: '',
          Company: '',
          MarkedPrice: '',
          DiscountPercentage: '',
          NumberOfItems: ''
        });
      } else {
        toast.error('Failed to add shoe');
      }
    } catch (error) {
      alert('Error adding shoe: ' + error.message);
    }
  };

  return (
    <div className="font-bold tracking-wider h-[90vh] flex flex-col items-center bg-neutral-50 rounded-xl mx-4 p-4 overflow-auto">
      <h1 className="text-2xl mb-4">Add New Shoe</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Fields for each shoe attribute */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ShoeName">
              Shoe Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" name="ShoeName" value={shoeForm.ShoeName} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ShoeType">
              Type
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" name="ShoeType" value={shoeForm.ShoeType} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Size">
              Size
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" name="Size" value={shoeForm.Size} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Company">
              Company
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" name="Company" value={shoeForm.Company} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="MarkedPrice">
              Marked Price
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" name="MarkedPrice" value={shoeForm.MarkedPrice} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="DiscountPercentage">
              Discount Percentage
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" name="DiscountPercentage" value={shoeForm.DiscountPercentage} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="NumberOfItems">
              Number of Items
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" name="NumberOfItems" value={shoeForm.NumberOfItems} onChange={handleChange} required />
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Add Shoe
        </button>
      </form>
    </div>
  );
}
