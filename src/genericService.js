import axios from "axios"

const API_BASE_URL="http://localhost:4500" //loaclhost-url

const signup=async(data)=>{
 return await axios.post(API_BASE_URL+"/api/user/signup",data)
}

const login=async(data)=>{
 return await axios.post(API_BASE_URL+"/api/user/login",data)
}
const addTask=async(data)=>{
    const token=localStorage.getItem("token")
    const headers={
        "x-access-token":token
    }
 return await axios.post(API_BASE_URL+"/api/task/add",data,{headers:headers})
}

const getTasks=async()=>{
    const token=localStorage.getItem("token")
    const headers={
        "x-access-token":token
    }
    return await axios.get(API_BASE_URL+"/api/task/",{headers:headers})
}
const getOneTask=async(id)=>{
    const token=localStorage.getItem("token")
    const headers={
        "x-access-token":token
    }
    return await axios.get(API_BASE_URL+"/api/task/get-single-task/"+id,{headers:headers})
}
const updateTask=async(id,data)=>{
    const token=localStorage.getItem("token")
    const headers={
        "x-access-token":token
    }
    return await axios.post(API_BASE_URL+"/api/task/update/"+id, data,{headers:headers})
}

export{
signup,
login,
addTask,
getTasks,
getOneTask,
updateTask,
}