import React from 'react'
import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import { clearUserToken, getUserToken, setUserToken } from './utils/authToken';
import staticData from "../src/data";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Logo from  '/images/basecamp-logo.png'
import Logo from '../src/components/images/basecamp-logo.png'




// Component Imports
import Basecamp from './components/Home';
import Navigation from "./components/Navigation";
import NewCampsite from "./components/NewCampsite";
import CampsiteList from './components/CampsiteList';
import AllCampsiteDetail from "./components/AllCampsiteDetail";
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import UserHomePage from './components/UserHomePage';
import TopCampsiteList from './components/TopCampsiteList';
import TopCampsiteDetail from './components/TopCampsiteDetail';
import EditCampsite from './components/EditCampsite';



function App() {

  const [campsites, setCampsites] = useState([...staticData]);
  const navigate = useNavigate();
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
      const newUser = await fetch(`${process.env.REACT_APP_DB_URI}/auth/register`, configs)
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
      const newUser = await fetch(`${process.env.REACT_APP_DB_URI}/auth/login`, configs)
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

  

    const handleLogout = async () => {

        clearUserToken()
        navigate('/', {replace: true} )
    }



  return (
    <div className="App">
      <Navigation />
      <div className="img">
        <img src={Logo}></img>
      </div>

      <Routes>
        <Route path="/" element={<Basecamp />} />
        <Route path="/basecamp/camplist" element={<CampsiteList campsites={campsites} />} />
        <Route path='basecamp/topcamplist' element={<TopCampsiteList campsites={campsites} />} />
        <Route path="/basecamp/allcampsites/:id" element={<AllCampsiteDetail />} />
        <Route path='/basecamp/topcampsites/:id' element={<TopCampsiteDetail />} />
        <Route path="/basecamp/new" element={<NewCampsite/>} />
        {/* <Route path="/basecamp/register" element={<RegisterForm signUp={registerUser} isAuthenticated={isAuthenticated} />} />
        <Route path="/basecamp/login" element={<Login signIn={loginUser} isAuthenticated={isAuthenticated} />} /> */}
        <Route path='/basecamp/userhomepage' element={<UserHomePage />} />
        <Route path='/basecamp/edit/:id' element={<EditCampsite />} />
      </Routes>
    </div>
  );
}

export default App;


