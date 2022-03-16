import { props, useState, useEffect } from "react";
import staticData from '../data.js'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'


const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function TopCampsiteList(props) {
  const [campsites, setCampsites] = useState([...staticData]);
  console.log(campsites[0].name)

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
        <Link to={`/basecamp/topcampsites/${campsites._id}`} key={campsites.name} className="card-link"><Button variant="primary">Campsite Details</Button></Link>
      </Card.Body>
    </Card>
    )})}
    </div>
  );
}


export default TopCampsiteList;