import { useFormik } from 'formik'
import React,{useEffect, useState} from 'react'
import toast from "react-hot-toast";
import * as yup from 'yup';
import { addTask, getOneTask, updateTask } from '../../../genericService';
import { useNavigate, useParams } from 'react-router-dom';

const schema = yup.object().shape({
  title: yup.string().min(4, "Title must be at least 4 characters").required("Title is required"),
  description: yup.string().min(4, "Description must be at least 4 characters").required("Description is required"),
  status: yup.string().required("Please select status"),
  due_date:yup.string().required("Due date is required"),
 
});

export default function AddEditTask() {
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const {param}=useParams()
    const handelStatusChange=(e)=>{
        formik.setFieldValue("status",e.target.value)
    }
    const formik=useFormik({
        initialValues:{
            title:"",
            description:"",
            due_date:"",
            status:"",
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            setLoading(true)
            console.log("add_task",values)
            if(param){
              
            updateTask(param,values).then((res)=>{
              return res.data
          }).then((data)=>{
              if(data.status){
                  toast.success(data.message)
                  navigate("/home")
              }else{
                  toast.error(data.message)

              }
          }).catch((err)=>{
              toast.error("Error in task updation")
          }).finally(()=>setLoading(false))
            }else{

            addTask(values).then((res)=>{
                return res.data
            }).then((data)=>{
                if(data.status){
                    toast.success(data.message)
                    navigate("/home")
                }else{
                    toast.error(data.message)

                }
            }).catch((err)=>{
                toast.error("Error in task addition")
            }).finally(()=>setLoading(false))
          }
        }
    })

    useEffect(()=>{
      getOneTask(param).then((res)=>{
        return res.data
      }).then((data)=>{
        console.log("response",data.response_data)
        formik.setFieldValue("title",data.response_data.title)
        formik.setFieldValue("description",data.response_data.description)
        formik.setFieldValue("due_date",data.response_data.due_date)
        formik.setFieldValue("status",data.response_data.status)
        
      }).catch((err)=>{
        console.log("err:",err.message)
      }).finally(()=>setLoading(false))
    },[param])
  return (
    <div className="container mx-auto ">
      <div className="flex justify-center flex-col items-center border mt-4 mx-auto">
        <h2 className="font-bold text-lg self-baseline mx-5 underline mt-3">{param?"Edit":"Create"} Task</h2>
        <div className="flex flex-row gap-3  w-full my-5">
          <label className="font-semibold text-[17px] basis-[21%] sm:basis-[21%] md:basis-[7%] lg:basis-[7%] mx-5">
            Title
          </label>
          <div className="basis-[75%] sm:basis-[75%] md:basis-[50%] lg:basis-[50%]"> 
                    <input
            type="text"
            className=" px-3 py-1.5 focus:outline-none border border-1 rounded  w-full"
            placeholder="Enter title "
            {...formik.getFieldProps("title")}
          />
              {formik.errors&&formik.touched.title?<div className="text-[#D63301] self-baseline">{formik.errors.title}</div>:""}
          </div>
        </div>
        <div className="flex flex-row gap-3 w-full my-5">
          <label className="font-semibold text-[17px] basis-[21%] sm:basis-[21%] md:basis-[7%] lg:basis-[7%] mx-5">
            Description
          </label>
          <div className="basis-[75%] sm:basis-[75%] md:basis-[50%] lg:basis-[50%]">
          <textarea
            type="text"
            className=" px-3 py-1.5 focus:outline-none border border-1 rounded w-full"
            placeholder="Enter description "
            {...formik.getFieldProps("description")}
          ></textarea>
              {formik.errors&&formik.touched.description?<div className="text-[#D63301]">{formik.errors.description}</div>:""}
        

          </div>
          
        </div>
        <div className="flex flex-row gap-3 items-baseline w-full my-5">
          <label className="font-semibold text-[17px] basis-[21%] sm:basis-[21%] md:basis-[7%] lg:basis-[7%] mx-5">
            Due Date
          </label>
          <div className=" basis-[75%] sm:basis-[75%] md:basis-[50%] lg:basis-[50%]">
          <input
            type="date"
            className=" px-3 py-1.5 focus:outline-none border border-1 rounded w-full"
            placeholder="Enter title "
            {...formik.getFieldProps("due_date")}
          />
              {formik.errors&&formik.touched.due_date?<div className="text-[#D63301]">{formik.errors.due_date}</div>:""}
        </div>
        </div>
        <div className="flex flex-row gap-3 w-full my-5">
          <label className="font-semibold text-[17px] basis-[21%] sm:basis-[21%] md:basis-[7%] lg:basis-[7%] mx-5">
            Status
          </label>
          <div className="basis-[50%]">
          <div className="w-full flex items-center gap-4">
            <div className="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value={"Completed"}
                name="default-radio"
                checked={formik.values.status=="Completed"?true:false}
                onChange={handelStatusChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                for="default-radio-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
               Completed
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                value={"Pending"}
                checked={formik.values.status=="Pending"?true:false}
                onChange={handelStatusChange}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
              />
              <label
                for="default-radio-2"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pending
              </label>
            </div>
          </div>
          {formik.errors&&formik.touched.status?<div className="text-[#D63301]">{formik.errors.status}</div>:""}
        
          </div>
        </div>

        <div className="flex gap-3 self-baseline mx-5 mb-4">
            <button onClick={formik.handleSubmit} className={loading?"px-6 py-2.5 rounded-md bg-[#1c59ba] text-white font-bold hover:bg-[#3323] opacity-[0.5]":"px-6 py-2.5 rounded-md bg-[#1c59ba] text-white font-bold hover:bg-[#3323]"}>{param?"Update Task":"Add Task"}</button>
            <button onClick={()=>window.history.back()} className="px-6 py-2.5 rounded-md bg-slate-500 text-white font-bold hover:bg-[#000c]">Cancel</button>
        </div>
      </div>
    </div>
  )
}
