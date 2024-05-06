"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// Assuming Shoebox is appropriately imported from "@/components/shoebox";
import Shoebox from "@/components/vendorshoe";
import Link from "next/link";

function Page() {
  const [shoeslist, setShoesList] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control visibility of the modal

  useEffect(() => {
    const fetchVendorShoes = async () => {
      const vendorId = sessionStorage.getItem("vendorId"); // Retrieve vendor ID from session storage
      if (!vendorId) {
        console.log("Vendor ID not found in session storage");
        return;
      }

      const res = await fetch('/api/vendor/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendorId }),
      });

      if (!res.ok) {
        console.error("Failed to fetch vendor shoes");
        return;
      }

      const data = await res.json();
      setShoesList(data.shoeslist);
    };

    fetchVendorShoes();
  }, []);

  const handleAddNewShoe = () => {
    setShowModal(true); // Open the modal when the button is clicked
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-bold mt-8 mb-4">Currently Listed Shoes</h1>
  <Link href={"newshoe"}  >
    <Button >List a New Shoe</Button>
    </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-10 w-full">
        {shoeslist.length > 0 ? shoeslist.map((shoe) => (
          <Shoebox
            key={shoe.ShoeID}
            id={shoe.ShoeID}
            name={shoe.ShoeName}
            type={shoe.ShoeType}
            size={shoe.Size}
            company={shoe.ShoeCompany}
            priceafdisc={shoe.PriceAfterDiscount}
            discper={shoe.DiscountPercentage}
            markedprice={shoe.MarkedPrice}
            qty={shoe.NumberOfItems}
          />
        )) : <p className="text-lg col-span-full">No shoes found for this vendor.</p>}
      </div>
      {/* {showModal && <NewShoeModal close={() => setShowModal(false)} />} */}
    </div>
  );
}

export default Page;
