import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
