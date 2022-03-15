import React from 'react'
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import { clearUserToken, getUserToken,setUserToken } from './utils/authToken';
import staticData from "../src/data";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './components/images/basecamp-logo.png'





// Component Imports
import Basecamp from './components/Home';
import Navigation from "./components/Navigation";
import NewCampsite from "./components/NewCampsite";
import CampsiteList from './components/CampsiteList';
import AllCampsiteDetail from "./components/AllCampsiteDetail";
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import TopCommentBox from './components/CommentBox/TopCommentBox/TopCommentBox'
import UserHomePage from './components/UserHomePage';
import TopCampsiteList from './components/TopCampsiteList';
import TopCampsiteDetail from './components/TopCampsiteDetail';
import MessageScroll from './MessageScroll';
import {ContextProvider} from './Context/Context'



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


  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`
        }
      }
      const newUser = await fetch('http://localhost:8000/auth/login', configs)
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

  

  return (
    <div className="App">
      <Navigation />
      <div>
      {/* <img src = {Logo}></img> */}
      </div>
      <Routes>
        <Route path="/" element={<Basecamp />} />
        <Route path="/basecamp/camplist" element={<CampsiteList campsites={campsites} />} />
        <Route path = 'basecamp/topcamplist' element={<TopCampsiteList campsites={campsites}/>} />
        <Route path="/basecamp/allcampsites/:id" element={<AllCampsiteDetail />} />
        <Route path = '/basecamp/topcampsites/:id' element={<TopCampsiteDetail />} />
        <Route path="/basecamp/new" element={<NewCampsite />} />
        <Route path="/basecamp/register" element={<RegisterForm signUp={registerUser} isAuthenticated={isAuthenticated}/>} />
        <Route path="/basecamp/login" element={<Login signIn={loginUser} isAuthenticated={isAuthenticated}/>} />
        <Route path='/basecamp/comment' element={<TopCommentBox />} />
        <Route path='/basecamp/userhomepage' element={<UserHomePage />} />
      </Routes>
      <MessageScroll />
      <ContextProvider />
    </div>
  );
}

export default App;

 
