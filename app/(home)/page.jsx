"use client";
import React from 'react'
import { useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'

function page() {
    const [shoeslist, setshoeslist] = useState([]);
    useEffect(() => {
        const fetchShoes = async () => {
            const res = await fetch("/api/getshoes");
            const {shoeslist} = await res.json();
            setshoeslist(shoeslist);
        };
        fetchShoes();
        console.log(shoeslist);
    }, []);

  return (
    <div>
        <div className=' mx-auto p-8 font-bold text-9xl tracking-wider'><p className='mx-auto w-fit '>STEP . IN .<span className='text-[#4A69E2]'> STYLE</span></p></div>
        <div className='grid grid-cols-3 gap-8 mx-20'>
            {shoeslist.map((shoe) => (
                <div key={shoe.ShoeID} className=' p-4 rounded-3xl bg-slate-50'>
                    <img src={"/Rectangle 8.png"} alt={shoe.name} className='w-1/3 h-24 object-cover rounded-3xl'/>
                    <div className='text-center font-bold text-lg'>{shoe.ShoeName}</div>
                    <div className='text-center  text-lg'>{shoe.ShoeType}</div>
                    <div className='text-center text-lg'>{shoe.MarkedPrice}</div>
                    <div className='text-center text-lg'>{shoe.NumberOfItems}</div>
                     <Button className=" bg-[#4A69E2]">Add to cart</Button>
                </div>
            ))}

            </div>
       
            
    </div>
  )
}

export default page