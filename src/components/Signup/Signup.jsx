import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import * as yup from 'yup';
import { MdLogin } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";


const schema = yup.object().shape({
    first_name: yup.string().min(4, "First name must be at least 4 characters").required("First name is required"),
    last_name: yup.string().min(4, "Last name must be at least 4 characters").required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirm_password: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match') // Validation to ensure confirm_password matches password
      .required("Confirm password is required"),
  });
export default function Signup() {
    const [isPasswordVisible,setIsPasswordVisible]=useState(false)
    const [isConfirmPasswordVisible,setIsConfirmPasswordVisible]=useState(false)
    const [loading,setLoading]=useState(false)
    const formik=useFormik({
        initialValues:{
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            confirm_password:""
        },
        validationSchema:schema,
        onSubmit:(val)=>{
           setLoading(true)
            console.log("signup values", val)
            
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
        <span className="relative top-[2px]"><MdOutlineAccountCircle size={25} /></span> <span className="text-[17px] font-semibold">Signup</span>
                </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-[16px]">First Name</label>
          <input type="text" className="border border-1 p-3 rounded" {...formik.getFieldProps("first_name")} />
            {formik.errors&&formik.touched.first_name?<div className="text-[#D63301]">{formik.errors.first_name}</div>:""}
        
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-[16px]">Last Name</label>
          <input type="text" className="border border-1 p-3 rounded" {...formik.getFieldProps("last_name")} />
            {formik.errors&&formik.touched.last_name?<div className="text-[#D63301]">{formik.errors.last_name}</div>:""}
        
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-[16px]">Email</label>
          <input type="text" className="border border-1 p-3 rounded" {...formik.getFieldProps("email")} />
            {formik.errors&&formik.touched.email?<div className="text-[#D63301]">{formik.errors.email}</div>:""}
        
        </div>
        
        <div className="flex flex-col relative">
          <label className="font-semibold text-[16px] rounded">Password</label>
          <div className="relative">
            <input
              type={isPasswordVisible?"text":"password"}
              className="border border-1 p-3 pr-10 w-full rounded"
              {...formik.getFieldProps("password")}
              />
            <button onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
                {
                    isPasswordVisible?
                    <FaEye className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" />
                    :
                    <FaEyeSlash className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" />
                }
            </button>
            {formik.errors&&formik.touched.password?<div className="text-[#D63301] absolute">{formik.errors.password}</div>:""}

          </div>
        </div>
        <div className="flex flex-col relative">
          <label className="font-semibold text-[16px] ">Confirm Password</label>
          <div className="relative">
            <input
              type={isConfirmPasswordVisible?"text":"password"}
              className="border border-1 p-3 pr-10 w-full rounded"
              {...formik.getFieldProps("confirm_password")}
              />
            <button onClick={()=>setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                {
                    isConfirmPasswordVisible?
                    <FaEye className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" />
                    :
                    <FaEyeSlash className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer" />
                }
            </button>
            {formik.errors&&formik.touched.confirm_password?<div className="text-[#D63301] absolute">{formik.errors.confirm_password}</div>:""}

          </div>
        </div>
        <button onClick={formik.handleSubmit} className="bg-[#1c59ba] px-3 py-1.5 text-white font-bold mt-5 flex justify-center items-center gap-1"><span className="relative top-[2px]"><MdOutlineAccountCircle size={25} /></span><span>Signup</span></button>
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
