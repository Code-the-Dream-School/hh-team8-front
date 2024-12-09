import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    };

    fetchData();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
