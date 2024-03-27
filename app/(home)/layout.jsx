import Link from "next/link"
export default function loginLayout({ children }) {
    return(

        <div><header className="flex gap-5  align-middle p-6 text-base font-semibold   rounded-3xl bg-neutral-50 jus text-neutral-800 max-md:flex-wrap max-md:px-5  m-4">
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
        <span className="text-2xl font-bold mr-auto"  >SneakPeak.co</span>
        </Link>
        <div className="ml-auto flex gap-6">
            
        <Link href={"/login"}>
        <span className="text-xl font-bold"  >Login</span>
        </Link>
        <Link href={"/signup"}>
        <span className="text-xl font-bold"  >Sign Up</span>
        </Link>
        <Link href={"/cart"}>
        <span className="text-xl font-bold"  >Cart</span>
        </Link>
        </div>
      
      </header>
            
         <section>{children}</section>
        </div>
         )
  }