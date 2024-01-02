import React, { useState } from 'react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


export default function Navbar() {
    const [sidebar,setSidebar]=useState(false)
    const desktopNavabrContent=["Home","Tasks","Users"]
    const mobileNavabarContent=["Home","Tasks","Users","Signup"]
    const navigate=useNavigate()
    const token=localStorage.getItem("token")
    const handelLogout=()=>{
        
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout!',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Logout', 'Your account has been logout', 'success');
              localStorage.removeItem("token")
        // window.location.reload()
        navigate("/login")
            }
          });
    }
    
  return (
    <div className='bg-slate-200 py-5'>
        <div className="flex flex-col sm:flex sm:flex-col sm:justify-between md:hidden mx-6">
            <div className="flex justify-between gap-4 items-center">
            <button className="font-bold text-lg uppercase" onClick={()=>setSidebar(!sidebar)} >{"task app"}</button>
                {/* <button onClick={()=>navigate("/login")} className="flex gap-1 items-centr justify-center hover:text-[#4287f5]"><span className="relative top-[2px]"><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Login</span></button> */}
                <div className={"flex justify-between gap-4 items-center"}>
                {
                    token?
                    
                    <button onClick={handelLogout} className="flex gap-1 items-centr justify-center hover:text-[#4287f5] focus:outline-none"><span><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Logout</span></button>
                :
                <>
                {/* <button onClick={()=>navigate("/signup")} className="flex gap-1 hover:text-[#4287f5] focus:outline-none"><MdOutlineAccountCircle size={25} /> <span className="text-[17px] font-semibold">Sign Up</span></button> */}
                <button onClick={()=>navigate("/login")} className="flex gap-1 items-centr justify-center hover:text-[#4287f5] focus:outline-none"><span><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Login</span></button>
                </>
                }
            </div>
            </div>
            {sidebar?
            <div className="flex flex-col justify-between gap-4 mt-4 transition-all duration-300 ease-in-out">
            {
                mobileNavabarContent.map((navbar)=>{
                    return(
                        <Link to={`/${navbar.toLowerCase()}`} >
                        <div className="text-[17px] font-semibold hover:text-[#4287f5] border-b cursor-pointer transition-all duration-300 ease-in-out">{navbar}</div>
                        </Link>

                    )
                })
            }

            </div>
            :""}
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
                {
                    token?
                    
                    <button onClick={handelLogout} className="flex gap-1 items-centr justify-center hover:text-[#4287f5] focus:outline-none"><span><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Logout</span></button>
                :
                <>
                <button onClick={()=>navigate("/signup")} className="flex gap-1 hover:text-[#4287f5] focus:outline-none"><MdOutlineAccountCircle size={25} /> <span className="text-[17px] font-semibold">Sign Up</span></button>
                <button onClick={()=>navigate("/login")} className="flex gap-1 items-centr justify-center hover:text-[#4287f5] focus:outline-none"><span><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Login</span></button>
                </>
                }
            </div>
        </div>
    </div>
  )
}
