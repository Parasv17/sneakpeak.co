import React, { Component } from "react";
import { Card } from "./ui/card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export class Shoebox extends Component {
    
  handleAddToCart = async () => {
    // console.log("Remove From cart");
    const uid = sessionStorage.getItem("userId");
    if (uid == null) {
      // router.push("/login");
      toast.error("Please login to add to cart");
      return;
    }
    // router= useRouter();

    const data = { shoeid: this.props.id, custid: uid, qty: 1,action:"remove" };
    const response = await fetch("/api/usercart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json(); //for msg
    if (response.ok) {
      toast.success(res.message);
      window.location.reload();
    } else {
      toast.error("Failed to Remove from cart");
    }
    
  };
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
    } = this.props;

    return (
      <div className="relative h-[58vh] mx-auto flex w-full flex-col  rounded-xl border  bg-white shadow-lg">
        {/* <a className="mx-3 mt-3 flex justify-center overflow-hidden rounded-xl" href="#"> */}
        <span className="absolute top-1 left-1  rounded-full bg-black px-2 text-center text-sm font-medium text-white  shadow-xl">
          {discper}% OFF
        </span>
        <span className="absolute -top-6 -right-6  rounded-full h-14 w-14 bg-custom-amber p-3 text-center text-xl font-medium text-black  shadow-xl border">
          {qty}
        </span>

        <img
          className=" rounded-xl shadow-md h-[40%] object-cover"
          src={"/Rectangle 8.png"}
          alt={name}
        />
        {/* </a> */}
        <div className="mt-6 px-5">
          <div className="flex tracking-tight w-full justify-between ">
            <h3 className="text-2xl font-semibold  text-custom-blue">{name}</h3>
            <h5 className="text-xl  text-slate-900 font-bold"> {company}</h5>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-3xl font-bold text-slate-900">
                ${priceafdisc}
              </span>
              <span className="text-sm text-slate-900 line-through">
                ${markedprice}
              </span>
            </div>
            <div>
              <h2 className="text-slate-400 text-md font-normal">{type}</h2>
              <h2 className="text-lg font-medium">Size: {size}</h2>
            </div>
            
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                class="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                class="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                5.0
              </span>
            </div>
            <span className="block text-md font-medium text-gray-700 dark:text-gray-300">
              
            </span>
          </div>

          <div
            className="flex mt-6 items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-custom-amber hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={this.handleAddToCart}
          >
            {/* ... Insert cart SVG here */}
            Remove from Cart
          </div>
        </div>
      </div>
    );
  }
}

export default Shoebox;
