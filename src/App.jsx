import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAllData } from "./util/index";
import { Provider } from "./components/ui/provider";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import ShareAProject from "./views/ShareAProject";
import ExploreProjects from "./views/ExploreProjects";

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
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/share-project" element={<ShareAProject />} />
        <Route path="/explore-project" element={<ExploreProjects />} />
        <Route path="/message" element={<h1>{message}</h1>} />
      </Routes>
    </Provider>
  );
}

export default App;
