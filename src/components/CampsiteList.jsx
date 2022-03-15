
import { props, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Card} from 'react-bootstrap'



const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function CampsiteList(props) {
  const [campsites, setCampsites] = useState([]);

  const handleFetch = async () => {
    const URL = 'http://localhost:8000/basecamp/'
    fetch(URL).then(resp => {
      console.log(resp)
      return resp.json()
    })
      .then(data => {
        setCampsites(data)
        console.log(data)
      })
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return (!campsites) ? (
    <p>Gathering Firewood...</p>
  ) : (
    <div>
    {campsites.map((campsites, index) => {
      return (
    <Card style={{width: "18rem;"}}>
      <Card.Body>
        <Card.Title>{campsites.name}</Card.Title>
        <Card.Text>{campsites.location}</Card.Text>
        <Card.Text>Check out more about the campsite below.</Card.Text>
        <Link to={`/basecamp/allcampsites/${campsites._id}`} key={campsites.name} className="card-link">Campsite Details</Link>
      </Card.Body>
    </Card>
    )})}
    </div>  
  );
}


export default CampsiteList;