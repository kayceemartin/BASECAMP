import React from 'react'
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import staticData from "../src/data";
import "./Home.css";

// Component Imports
import Basecamp from './components/Home';
import Navigation from "./components/Navigation";
import NewCampsite from "./components/NewCampsite";
import TopCampsiteList from "./components/TopCampsiteList";
import TopCampsiteDetail from "./components/TopCampsiteDetail";
import EditCampsite from "./components/EditCampsites";
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import Comment from './components/Comment';
import UserHomePage from './components/UserHomePage';
import { clearUserToken, getUserToken,setUserToken } from './utils/authToken';





function App() {

  const [campsites, setCampsites] = useState([...staticData]);

  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const newUser = await fetch('http://localhost:8000/auth/register', configs)
      const parsedUser = await newUser.json()
      console.log(parsedUser)

      setUserToken(parsedUser.token)

      setCurrentUser(parsedUser.user)

      setIsAuthenticated(parsedUser.isLoggedIn)



      return parsedUser

    } catch (err) {
      console.log(err)
      clearUserToken()
      setIsAuthenticated(false)
    }
  }


  const Login = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const newUser = await fetch('http://localhost:8000/auth/register', configs)
      const parsedUser = await newUser.json()
      console.log(parsedUser)

      setUserToken(parsedUser.token)

      setCurrentUser(parsedUser.user)

      setIsAuthenticated(parsedUser.isLoggedIn)



      return parsedUser

    } catch (err) {
      console.log(err)
      clearUserToken()
      setIsAuthenticated(false)
    }
  }

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

  useEffect(() => {
    handleFetch()
  })

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Basecamp />} />
        <Route path="/basecamp/topcamplist" element={<TopCampsiteList campsites={campsites} />} />
        <Route path="/basecamp/:id" element={<TopCampsiteDetail />} />
        <Route path="/basecamp/new" element={<NewCampsite />} />
        <Route path="/basecamp/:id/edit" element={<EditCampsite />} />
        <Route path="/basecamp/register" element={<RegisterForm signUp={registerUser} isAuthenticated={isAuthenticated}/>} />
        <Route path="/basecamp/login" element={<Login login={Login} isAuthenticated={isAuthenticated}/>} />
        <Route path='/basecamp/comment' element={<Comment />} />
        <Route path='/basecamp/userhomepage' element={<UserHomePage />} />
      </Routes>
    </div>
  );
}

export default App;
