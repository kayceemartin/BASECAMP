import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap'


const DB_URI = process.env.REACT_APP_DB_URI|| "http://localhost:8000/basecamp";

function AllCampsiteDetail(props) {
  let { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const [campsite, setCampsite] = useState(null);

  function getCampsite () {
    const URL = `${process.env.REACT_APP_DB_URI}/basecamp/${id}`
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

  const deleteCampsite = async () => {
    const URL = `${process.env.REACT_APP_DB_URI}/basecamp/${id}`
    const options = {
        method: "DELETE"
      };
    try {
      const deletedCampsite = await fetch(URL, options);
      const campData = await deletedCampsite.json()
      console.log(campData)
      navigate("/basecamp/camplist", {new: true})
    } catch (err) {
      console.log(err);
    }
  };

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
          <div className= "nav-home">
            <Button variant="primary" onClick={deleteCampsite}>Delete campsite</Button>
          </div>
          <div className= "nav-home">
          <Link to ={`/basecamp/edit/${id}`}><Button variant="primary">Edit your campsite</Button></Link>
          </div>
          {/* <div className = "nav-to-comments">
            <Link to = '/basecamp/comment'>See Comments About Campsite</Link>
          </div>     */}
      </div>
  );
}

export default AllCampsiteDetail;