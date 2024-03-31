"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Shoebox from "@/components/shoebox";

function Page() {
  const [shoeslist, setshoeslist] = useState([]);
  useEffect(() => {
    const fetchShoes = async () => {
      const res = await fetch("/api/getshoes");
      const { shoeslist } = await res.json();
      setshoeslist(shoeslist);
    };
    fetchShoes();
    // console.log(shoeslist);
  }, []);

  return (
    <div>
      <div className=" font-bold  tracking-wider h-[80vh] flex items-center text-[20vh] bg-neutral-50 rounded-xl mx-4">
        <p className="mx-auto w-fit "style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
         <span className="text-custom-blue">STEP </span> .  IN  . <span className="text-custom-amber"> STYLE</span>
        </p>
      </div>
      <div className="mx-28 grid grid-cols-3 gap-x-14 gap-y-10 mt-16 mb-40">
        {shoeslist.map((shoe) => (
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

      
        ))}
      </div>
    </div>
  );
}

export default Page;
