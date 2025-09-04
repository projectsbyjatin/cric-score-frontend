import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import AllMatches from "../pages/all-matches";
import Home from "../pages/home";
import LiveMatch from "../pages/live-match";
import SingleMatch from "../pages/single-match";
import CreateMatch from"../pages/create-match";
import { ToastContainer } from "react-toastify"; 
import Navbar from "./components/navbar";

const App = ()=>{
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-green-200">
       <Navbar/> 
      <div className="container mx-auto px-4 py-8">
        <Routes>
           <Route path="/create-match" element={<CreateMatch />} />
            <Route path="/" element={<Home/>} />
            <Route path="/allmatches" element={<AllMatches />} />
            <Route path="/LiveMatch" element={<LiveMatch />} />
            <Route path="/SingleMatch" element={<SingleMatch />} />
            <Route path="/CreateMatch" element={<CreateMatch />} />
            <Route path="/allmatches" element={<AllMatches />} />
  <Route path="/singlematch/:id" element={<SingleMatch />} />




        </Routes>


      </div>
      <ToastContainer/>
      </div>
      </BrowserRouter>
  )
};
export default App;