import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../../../genericService";
import loader from "../../../assets/loader.gif";
import { MdOutlineDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";

export default function AllTasks() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [search,setSearch]=useState("");   

  const handelSearch=(e)=>{
    const value=e.target.value
    setSearch(value)
    // if(value){
    //     setTasks(tasks.filter((task)=>task.title.toLowerCase().includes(value)))
    // }else{
    //     setTasks(tasks)

    // }
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
  }, [search]);
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between ">
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
          <div class="relative overflow-x-auto mt-3">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
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
                      {task.status.toLowerCase() == "active" ? (
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
                      <button>
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
