"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useEffect,useState } from "react";
export default function LoginLayout({ children }) {
    const router = useRouter();
    // let Uid= null;
    // useEffect(()=>{
    //     Uid= sessionStorage.getItem("userId");
    //     // setUid(sessionStorage.getItem("userId"));
    // },[])
    // const uid= sessionStorage.getItem("userId");
    return(

        <div><header className="flex gap-5  align-middle justify-center p-6 text-base font-semibold   rounded-3xl bg-neutral-50 jus text-neutral-800 max-md:flex-wrap max-md:px-5  m-4">
        {/* <nav className="flex gap-5 justify-between my-auto">
          {/* <div>New Drops 🔥</div>
          <div className="flex gap-0.5 whitespace-nowrap">
            <div>Men</div>
             <IconArrowRight /> 
          <div className="flex gap-0.5 whitespace-nowrap">
            <div>Women</div>
         <IconArrowDown />
          </div> 
        </nav>
          */}
        
        {/* <Logo />  */}
        <Link href={"/"}>
        <span className="text-3xl font-bold mr-auto text-black"  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }} >Sneak<span className="text-black">Peak</span><span className="text-custom-amber">.co</span></span>
        </Link>
        <div className="ml-auto flex gap-6">
        <Link href={"/history"}>
        <span className="text-xl font-bold"  >My Orders</span>
        </Link>
        <Link href={"/login"}>
        <span className="text-xl font-bold"  >Login</span>
        </Link>
        <Link href={"/signup"}>
        <span className="text-xl font-bold"  >Sign Up</span>
        </Link>
        <Link href={"/cart"}>
        <span className="text-xl font-bold"  >Cart</span>
        </Link>
       {1 && <Button className="text-lg font-bold bg-custom-blue" onClick={()=>{
          toast.success("Logged Out");
          sessionStorage.removeItem("userId");
          router.push("/login")
        router.refresh()}}>Log Out</Button>
       }
        </div>
      
      </header>
            
         <section>{children}</section>
        </div>
         )
  }