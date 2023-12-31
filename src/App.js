// import logo from './logo.svg';
// import './App.css';

import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import AddTask from "./components/Tasks/AddTask/AddTask";
import {Routes,Route,BrowserRouter} from "react-router-dom"
import AllTasks from "./components/Tasks/Home/AllTasks";

function App() {
  return (
    <>
    <Navbar />
    {/* <BrowserRouter> */}
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/add-task" element={<AddTask />} />
    <Route path="/home" element={<AllTasks />}  />
    <Route path="/" element={<AllTasks />}  />
    </Routes>
    {/* </BrowserRouter> */}
    
    </>
  );
}

export default App;
