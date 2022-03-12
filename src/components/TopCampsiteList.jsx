import '../TopCampsites.css'
import { props, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import staticData from '../data.js'



const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function TopCampsiteList(props) {
  const [campsites, setCampsites] = useState([...staticData]);
  console.log(campsites[0].name)

  return (!campsites) ? (
    <p>Gathering Firewood...</p>
  ) : (
    <div className = 'camplist'>
      <h1>The Top Rated Campsites in America</h1>
      <div className = 'campsite'>
        {campsites.map((campsites, index) => {
          return (
              <Link to ={`/basecamp/${campsites._id}`} key = {campsites.name}>
                <div className = 'campsite-card'>
                  <div className = 'campsite-title'>
                    <h3>{campsites.name}</h3>  
                  </div>  
                </div>  
              </Link>
          )
      })}
      </div>  
    </div>
  );
}


export default TopCampsiteList;