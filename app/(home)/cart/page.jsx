"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import Shoebox from '@/components/cartshoebox';

function Page() {
  const [cartlist, setcartlist] = useState([]);
  const [total, settotal] = useState(0);
  const [totalitems, settotalitems] = useState(0);

  const Checkout = async() => {
    const user= sessionStorage.getItem("userId");
    const data= {userId:user};
    if(totalitems===0){toast.error("Your Cart is empty");return;}
    if(data.userId){
      const res = await fetch("/api/buycart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(res.ok){
        toast.success("Cart bought successfully");  
      }
      else {
        toast.error("Failed to buy cart");
      }
      window.location.reload();
    }
    else {
      toast.error("Please login to view cart");
    }
  
  }
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
      const { cartlist,totval,totitems } = await res.json();
      setcartlist(cartlist);
      settotal(totval);
      settotalitems(totitems);}
      else {
       toast.error("Please login to view cart");
      }
    };
    fetchCart();
    // console.log(cartlist);
  }, []);

  return (
    <div className=''>
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
    <div className="w-[50%] flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 mx-auto my-10">
  <h2 className="text-3xl font-bold text-black mb-4">Cart Summary</h2>
  <p className="text-xl text-black">Total Items: <span className="font-bold">{totalitems}</span></p>
  <p className="text-xl text-black">Total Value: <span className="font-bold">${total}</span></p>
  <button
    className="mt-6 bg-custom-blue text-white font-bold py-2 px-4 rounded hover: transition duration-300"
    onClick={Checkout}
  >
    Buy Cart
  </button>
</div>
    {/* <div className='flex mt-8 justify-center'> */}

    
    {/* <div className="mx-12 grid grid-cols-3  gap-x-12 gap-y-10 mt-6"> */}
    <div className="mx-28 grid grid-cols-3 2xl:grid-cols-4 gap-x-14 gap-y-10 mt-16 mb-40">
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
      {/* </div> */}
      
{/* show cart total , total number of item and buy cart button in this div */}

          </div>
   
    </div>
    

  )
}

export default Page