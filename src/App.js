import React from 'react'
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import staticData from "../src/data";
import "./Home.css";

// Component Imports
import Basecamp from './components/Home';
import Navigation from "./components/Navigation";
import NewCampsite from "./components/NewCampsite";
import CampsiteList from "./components/CampsiteList";
import CampsiteDetail from "./components/CampsiteDetail";
import EditCampsite from "./components/EditCampsites";



function App() {

  const [campsites, setCampsites] = useState([...staticData]);

  console.log(campsites)

  const handleFetch = async () => {
    const URL = 'http://localhost:8000/basecamp/'
    fetch(URL).then(resp => {
      console.log(resp)
      return resp.json()
    })
    .then(data => {
      console.log(data)
      //console.log(campsites[0].name)
    })
  }
  
  useEffect(()=>{
    handleFetch()
  })

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Basecamp />} />
        <Route path="/basecamp/camplist" element={<CampsiteList campsites={campsites} /> }/>
        <Route path="/basecamp/:id" element={<CampsiteDetail />} />
        <Route path="/basecamp/new" element={<NewCampsite />} />
        <Route path="/basecamp/:id/edit" element={<EditCampsite />} />
        {/* <Route exact path="/" render={(renderProps)=><RegisterForm {...renderProps} signUp={registerUser}/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
