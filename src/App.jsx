import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAllData } from "./util/index";
import { Provider } from "./components/ui/provider";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./views/HomePage";
import ShareAProject from "./views/ShareAProject";

const URL = "http://localhost:8000/api/v1/";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <Provider>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/reset-password" exact element={<ForgotPassword />} />
        <Route path="/share-project" element={<ShareAProject />} />
        <Route path="/message" element={<h1>{message}</h1>} />
      </Routes>
    </Provider>
  );
}

export default App;
