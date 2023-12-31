// import logo from './logo.svg';
// import './App.css';

import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import AddEditTask from "./components/Tasks/AddEditTask/AddEditTask";
import {Routes,Route,BrowserRouter} from "react-router-dom"
import AllTasks from "./components/Tasks/Home/AllTasks";
import { Toaster } from "react-hot-toast";
import Protected from "./components/Protected/Protected";
import Users from "./components/Users/Users";

function App() {
  return (
    <>
    <Navbar />
    <Toaster position="top-right" reverseOrder={false} />
    
    <Routes>
    <Route path="/" >
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route path="/" element={<Protected Component={AllTasks} />} />
    <Route path="home" element={<Protected Component={AllTasks} />} />
    <Route path="add-task" element={<Protected Component={AddEditTask} />} />
        <Route path="edit-task/:param" element={<Protected  Component={AddEditTask} />} />
    <Route path="tasks" element={<Protected Component={AllTasks} />} />
    <Route path="users" element={<Protected Component={Users} />} />
    </Route>
</Routes>

    </>
  );
}

export default App;
