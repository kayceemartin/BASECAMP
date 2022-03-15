import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";


const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function AllCampsiteDetail(props) {
  let { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const [campsite, setCampsite] = useState(null);

  function getCampsite () {
    const URL = 'http://localhost:8000/basecamp/' + id
    fetch(URL).then(resp => {
      console.log(resp)
      return resp.json()
    }).then(data => {
        setCampsite(data)
        console.log(data)
      })

  }

  useEffect ( ()=> {
    getCampsite()
  }, [])

  if(!campsite) {
    return <p>Gathering Firewood</p>
  }

 
  return (
      <div className = 'details-container'>
          <div className = 'details'>
              <h2>Campsite Name: {campsite.name}</h2>
              <h3>Location: {campsite.location}</h3>
              <h3>Type of camping: {campsite.category}</h3>
              <h3>Do I have to pay for a site: {campsite.payForSite}</h3>
              <h3>Location: {campsite.location}</h3>
              <h3>Description: {campsite.description}</h3>  
          </div>
          {/* <div className = 'comment-campsite'>
              <Link to = '/basecamp/comment'>Comment on this campsite</Link>
          </div> */}
          <div className= "nav-home">
            <Link to= '/basecamp/camplist'>Back to all campsites</Link>
          </div>
          <div className = "nav-to-comments">
            <Link to = '/basecamp/comment'>See Comments About Campsite</Link>
          </div>    
      </div>
  );
}

export default AllCampsiteDetail;