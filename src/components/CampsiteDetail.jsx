import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function CampsiteDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [campsite, setCampsite] = useState({
    name: "",
    location: "",
    category: "",
    payForSite: false,
    description: "",
    likes: 0,
  });

  function getCampsite(array, name) {
    return array.find(el => {
      return el.name === name
    })
  }

  if(!campsite) {
    return <p>Gathering Firewood</p>
  }
  
  const campsites = getCampsite(campsite, id.id)
  return (
      <div className = 'details-container'>
          <div className = 'details'>
              <h2>Campsite Name: {campsites.name}</h2>
              <h3>Location: {campsites.location}</h3>
              <h3>Type of camping: {campsites.category}</h3>
              <h3>Do I have to pay for a site: {campsites.payForSite}</h3>
              <h3>Location: {campsites.location}</h3>
              <h3>Description: {campsites.description}</h3>  
          </div>
          <div className= "nav-home">
              <Link to= '/basecamp/camplist'>Back to Camplist</Link>
          </div>    
      </div>
  );
}

export default CampsiteDetail;