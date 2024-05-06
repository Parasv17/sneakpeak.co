"use client";
import {React,useState,useEffect} from 'react'
import Link from 'next/link';

export default function Page() {
    const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch vendors
    const fetchVendors = async () => {
      try {
        const res = await fetch('/api/vendor/getall');
        const data = await res.json();
        setVendors(data.vendorslist);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      }
    };

    // Fetch customers
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/candidates');
        const data = await res.json();
        setCustomers(data.custs);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchVendors();
    fetchCustomers();
  }, []);
    
      return (
        <div className="font-bold tracking-wider h-[90vh] flex items-center bg-neutral-50 rounded-xl mx-4">
          <div className="flex w-full h-full overflow-hidden">
            {/* Vendors List */}
            <div className="w-1/2 flex flex-col p-4 border-r border-gray-300 overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl">Vendors ({vendors.length})</h2>
            <Link href="admindashboard/addvendor" className='bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
               
                Add Vendor
            
            </Link>
          </div>
              <ul>
                {vendors.map((vendor, index) => (
                  <li key={index} className="mb-4 bg-white shadow-md rounded-lg p-3">
                    <h3 className="text-lg font-semibold">{vendor.VendorNameFirst} {vendor.VendorNameLast}</h3>
                    <div className="text-sm">
                      <p>Email: {vendor.VendorEmail}</p>
                      <p>Stock Added: {vendor.StockAdded}</p>
                      <p>Address: {`${vendor.VendorAddressShopNo}, ${vendor.VendorAddressStreetNo}, ${vendor.VendorAddressLocality}, ${vendor.VendorAddressPincode}`}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
    
            {/* Customers List */}
            <div className="w-1/2 flex flex-col p-4 overflow-auto">
              <h2 className="text-2xl mb-2">Customers ({customers.length})</h2>
              <ul>
                {customers.map((customer, index) => (
                  <li key={index} className="mb-4 bg-white shadow-md rounded-lg p-3">
                    <h3 className="text-lg font-semibold">{customer.NameFirst} {customer.NameLast}</h3>
                    <div className="text-sm">
                      <p>Email: {customer.Email}</p>
                      <p>Phone: {customer.PhoneNo}</p>
                      <p>Address: {`${customer.AddressHouseNo}, ${customer.AddressStreetApt}, ${customer.AddressLocality}, ${customer.AddressPincode}`}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }