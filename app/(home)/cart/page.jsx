"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import Shoebox from '@/components/cartshoebox';

function Page() {
  const [cartlist, setcartlist] = useState([]);

  
  useEffect(() => {
    const fetchCart = async () => {
      const user= sessionStorage.getItem("userId");
      const data= {userId:user};
      if(data.userId){const res = await fetch("/api/getusercart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const { cartlist } = await res.json();
      setcartlist(cartlist);}
      else {
       toast.error("Please login to view cart");
      }
    };
    fetchCart();
    // console.log(cartlist);
  }, []);

  return (
    <>
    <div className=' mx-auto p-8 font-bold text-9xl tracking-wider'>
    <p className='mx-auto w-fit ' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
      {cartlist.length === 0 
        ? 
          <span className='text-custom-blue'>
            <span className='text-gray-600'>Your </span>
            Cart  
          <span className='text-black'> Is 
          <span className='text-custom-amber'> Empty 
          </span>
          </span>
          </span>
          
        : <span>Items in your <span className='text-custom-blue'>CART</span></span>
      }
    </p> </div>
    <div className='flex'>

    
    <div className="mx-28 grid grid-cols-1 w-[25%] gap-x-14 gap-y-10 mt-6">
        {cartlist.map((shoe) => (
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
          qty={shoe.Quantity}
          />
          
          
          ))}
      </div>

      {/* <div> cart total</div> */}
          </div>
   
    </>
    

  )
}

export default Page