import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteTask, getTasks } from "../../../genericService";
import loader from "../../../assets/loader.gif";
import { MdOutlineDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default function AllTasks() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [search,setSearch]=useState("");  
  const handelSearch=(e)=>{
    const value=e.target.value
    setSearch(value)
  }
  const actionDeleteTask=async(id)=>{
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async(result) => {
      if (result.isConfirmed) {
        setLoading(!loading)
    await deleteTask(id).then((res)=>{
      return res.data
    }).then((data)=>{
      if(data.status){
        toast.success(data.message)
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    }).catch((err)=>{
      toast.error("Error in deletion")
    })
      }
    });
  }

  useEffect(() => {
    getTasks()
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("data", data);
        if(search){
            setTasks(data?.response_data.filter((task)=>task.title.toLowerCase().includes(search)));
        }else{
            setTasks(data?.response_data);

        }
      })
      .catch((err) => {
        console.log("err", err.message);
      })
      .finally(() => setLoading(false));
  }, [search,loading]);
  return (
    <div className="container mx-auto mt-5 ">
      <div className="flex justify-between mx-2 sm:mx-2 md:mx-0 lg:mx-0 ">
        <div className="relative w-[300px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm  border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search"
            value={search}
            onChange={handelSearch}
            required
          />
        </div>
        <button
          onClick={() => navigate("/add-task")}
          className="px-6 py-4 flex gap-1 rounded-md bg-[#1c59ba] font-bold text-white"
        >
          <span>
            <IoMdAdd size={25} color="#fff" />
          </span>
          <span>Add Task</span>
        </button>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <img src={loader} />
          </div>
        ) : tasks.length > 0 ? (
          <div className="relative overflow-x-auto mt-3 mx-2 sm:mx-2 md:mx-0 lg:mx-0">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Due Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td class="px-6 py-4">{task.title}</td>
                    <td class="px-6 py-4">{task.description}</td>
                    <td class="px-6 py-4">{task.due_date}</td>
                    <td class="px-6 py-4">
                      {task.status.toLowerCase() == "completed" ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
                          {task.status}
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                          {task.status}
                        </span>
                      )}
                    </td>
                    <td class="px-6 py-4 flex">
                      <button>
                        <GoPencil onClick={()=>navigate(`/edit-task/${task._id}`)} size={25} color="#1c59ba" />{" "}
                      </button>
                      <button onClick={()=>actionDeleteTask(task?._id)}>
                        <MdOutlineDelete size={25} color="#D63301" />{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span className="font-bold text-[18px]">No Task added</span>
        )}
      </div>
    </div>
  );
}
