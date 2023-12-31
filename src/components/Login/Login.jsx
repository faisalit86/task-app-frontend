import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import * as yup from 'yup';
import { MdLogin } from "react-icons/md";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    
  });
export default function Login() {
    const [isVisible,setIsVisible]=useState(false)
    const [loading,setLoading]=useState(false)
    const formik=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:schema,
        onSubmit:(val)=>{
           setLoading(true)
            console.log("Login values", val)
            
        }
    })
  return (
    <>
    <h2 className="text-lg text-center font-bold mt-4 underline">
          App4Core Test Task
        </h2>
   
    <div className="flex justify-center items-center h-50 ">
      {
        // loading?
        // <img  src={loader.src} />
        // :
      <div className="flex flex-col gap-3 w-full sm:w-full md:w-[50%] mx-5 sm:mx-5 md:mx-0">
        <div className="text-lg font-bold tracking-wider text-center">
            <div className="flex justify-center items-center gap-1 text-[#1c59ba]">
        <span className="relative top-[2px]"><MdLogin size={25} /></span> <span className="text-[17px] font-semibold">Login</span>
                </div>
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Email</label>
          <input type="text" className="border border-1 p-3 rounded" {...formik.getFieldProps("email")} />
            {formik.errors&&formik.touched.email?<div className="text-[#D63301]">{formik.errors.email}</div>:""}
        
        </div>
        
        <div className="flex flex-col relative">
          <label className="font-bold">Password</label>
          <div className="relative">
            <input
              type={isVisible?"text":"password"}
              className="border border-1 p-3 pr-10 w-full rounded"
              {...formik.getFieldProps("password")}
              />
            <button onClick={()=>setIsVisible(!isVisible)}>
                {
                    isVisible?
                    <FaEye className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" />
                    :
                    <FaEyeSlash className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" />
                }
            </button>
            {formik.errors&&formik.touched.password?<div className="text-[#D63301] absolute">{formik.errors.password}</div>:""}

          </div>
        </div>
        <button onClick={formik.handleSubmit} className="bg-[#1c59ba] px-3 py-1.5 text-white font-bold mt-5 flex justify-center items-center gap-1"><span className="relative top-[2px]"><MdLogin size={25} /></span><span>Login</span></button>
        {/* <Link
          href="/AddDetail"
          onSubmit={formik.handleSubmit}
          className="bg-[#0d6efd] px-3 py-1.5 text-white font-bold text-center"
        >
          Sign in
        </Link> */}
      </div>
      }
    </div>
    </>
  );
}
