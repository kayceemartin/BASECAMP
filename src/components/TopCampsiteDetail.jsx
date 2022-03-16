import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import staticData from '../data.js'
import { Button } from 'react-bootstrap'

const DB_URI = process.env.DB_URI || "http://localhost:8000/basecamp";

function TopCampsiteDetail(props) {
    let { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    const [campsite, setCampsite] = useState([...staticData]);

    function getCampsite(array, id) {

        return array.find(el => {
            console.log(el._id)
            return el._id === id
        })
    }

    if (!campsite) {
        return <p>Gathering Firewood</p>
    }



    const campsites = getCampsite(campsite, id)

    return (
        <div className='details-container'>
            <div className='details'>
                <h2>Campsite Name: {campsites.name}</h2>
                <h3>Location: {campsites.location}</h3>
                <h3>Type of camping: {campsites.category}</h3>
                <h3>Do I have to pay for a site: {campsites.payForSite}</h3>
                <h3>Location: {campsites.location}</h3>
                <h3>Description: {campsites.description}</h3>
            </div>
            <div className="d-flex justify-content-evenly w-25 campsite-details-btns">
                <div>
                    <Link to='/basecamp/topcamplist'><Button variant="primary">Top 50 Campsites</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default TopCampsiteDetail;