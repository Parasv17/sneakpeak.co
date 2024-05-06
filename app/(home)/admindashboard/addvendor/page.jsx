"use client"
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Page() {
  // State for the form inputs
  const [vendorForm, setVendorForm] = useState({
    VendorNameFirst: '',
    VendorNameLast: '',
    VendorEmail: '',
    VendorPassword: '',
    StockAdded: 0,
    VendorAddressShopNo: '',
    VendorAddressStreetNo: '',
    VendorAddressLocality: '',
    VendorAddressPincode: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vendor/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorForm),
      });
      if (response.ok) {
        
        toast.success('Vendor added successfully!');
        // Reset form or handle as needed
        setVendorForm({
          VendorNameFirst: '',
          VendorNameLast: '',
          VendorEmail: '',
          VendorPassword: '',
          StockAdded: 0,
          VendorAddressShopNo: '',
          VendorAddressStreetNo: '',
          VendorAddressLocality: '',
          VendorAddressPincode: '',
        });
      } else {
        toast.error('Failed to add vendor');
        throw new Error('Failed to add vendor');
      }
    } catch (error) {
      alert('Error adding vendor: ' + error.message);
    }
  };

  return (
    <div className="font-bold tracking-wider h-[90vh] flex flex-col items-center bg-neutral-50 rounded-xl mx-4 p-4 overflow-auto">
      <h1 className="text-2xl mb-4">Add New Vendor</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Fields for each vendor attribute */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorNameFirst">
              First Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="John" name="VendorNameFirst" value={vendorForm.VendorNameFirst} onChange={handleChange} required />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorNameLast">
              Last Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Doe" name="VendorNameLast" value={vendorForm.VendorNameLast} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorEmail">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="email" placeholder="example@example.com" name="VendorEmail" value={vendorForm.VendorEmail} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorPassword">
              Password
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="password" name="VendorPassword" value={vendorForm.VendorPassword} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="StockAdded">
              Stock Added
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="0" name="StockAdded" value={vendorForm.StockAdded} onChange={handleChange} required />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorAddressShopNo">
              Shop No
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="12A" name="VendorAddressShopNo" value={vendorForm.VendorAddressShopNo} onChange={handleChange} required />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorAddressStreetNo">
              Street No
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="1st Street" name="VendorAddressStreetNo" value={vendorForm.VendorAddressStreetNo} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorAddressLocality">
              Locality
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Downtown" name="VendorAddressLocality" value={vendorForm.VendorAddressLocality} onChange={handleChange} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="VendorAddressPincode">
              Pincode
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="12345" name="VendorAddressPincode" value={vendorForm.VendorAddressPincode} onChange={handleChange} required />
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Add Vendor
        </button>
      </form>
    </div>
  );
}
