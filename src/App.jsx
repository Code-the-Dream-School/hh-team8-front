import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import Navbar from './components/Navbar'
import HomePage from './views/HomePage';


const URL = 'http://localhost:8000/api/v1/';
function App() {
  
  const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <>
    <Navbar />
    <HomePage />
    <h1>{message}</h1>
    </>
  );

}

export default App
