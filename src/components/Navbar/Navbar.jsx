import React from 'react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { useNavigate,Link } from 'react-router-dom';


export default function Navbar() {
    const desktopNavabrContent=["Home","Tasks","Users"]
    const mobileNavabarContent=["Home","Tasks","Users","Signup"]
    const navigate=useNavigate()
    
  return (
    <div className='bg-slate-200 py-5'>
        <div className="flex flex-col sm:flex sm:flex-col sm:justify-between md:hidden mx-6">
            <div className="flex justify-between gap-4 items-center">
            <h2 className="font-bold text-lg uppercase">task app</h2>
                <button onClick={()=>navigate("/login")} className="flex gap-1 items-centr justify-center hover:text-[#4287f5]"><span className="relative top-[2px]"><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Login</span></button>
            </div>
            <div className="flex flex-col justify-between gap-4 mt-4">
            {
                mobileNavabarContent.map((navbar)=>{
                    return(
                        <Link to={`/${navbar.toLowerCase()}`} >
                        <div className="text-[17px] font-semibold hover:text-[#4287f5] cursor-pointer">{navbar}</div>
                        </Link>

                    )
                })
            }

            </div>
        </div>

        <div className="container mx-auto hidden sm:hidden md:flex md:justify-between">
            <div className="flex justify-between gap-4">
            <h2 className="font-bold text-lg uppercase ">task app</h2>
            {
                desktopNavabrContent.map((navbar)=>{
                    return(
                        <Link to={`/${navbar.toLowerCase()}`} >
                        <div  className="text-[17px] font-semibold hover:text-[#4287f5] cursor-pointer">{navbar}</div>
                        </Link>

                    )
                })
            }
            </div>
            <div className="flex justify-between gap-4 items-center">
                <button onClick={()=>navigate("/signup")} className="flex gap-1 hover:text-[#4287f5] focus:outline-none"><MdOutlineAccountCircle size={25} /> <span className="text-[17px] font-semibold">Sign Up</span></button>
                <button onClick={()=>navigate("/login")} className="flex gap-1 items-centr justify-center hover:text-[#4287f5] focus:outline-none"><span><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Login</span></button>
                
            </div>
        </div>
    </div>
  )
}
