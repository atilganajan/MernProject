import React from "react";
import { Routes, Route,redirect  } from "react-router-dom";
import AdminDashboard from "../views/AdminDashboard";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home"
import Product from "../views/Product";
import Dashboard from "../views/Dashboard";

function Router(params) {
  return (
    <div>
      <Routes>
        
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/products/:id" element={<Product user={params.user} />}></Route>
       <Route path="/*"  element={<Home />}></Route>

      </Routes>
    </div>
  );
}

export default Router;
