import { Link } from 'react-router-dom'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Button} from 'react-bootstrap'



function UserHomePage() {


    return (
        <div>
            <h1>Welcome to BASECAMP</h1>
            <div>
            <h2>View the Top 50 Campsites Across America!</h2>
            <Link to ='/basecamp/topcamplist'><Button variant="primary">Top 50 Campsites</Button></Link>
            </div>
            <div>
               <h2>Gone camping recently? Dont see it on our camplist?</h2>
            <Link to ='/basecamp/new'><Button variant="primary">Add it here!</Button></Link>  
            </div>
            {/* //NewCampsite here, (put that in "all campsite lists")
        //edit *your campsite*
        //delete *your* campsite
        //display all campsites
        //comment on campsites-edit, delete comment

        //logout -> back to home basecamp page */}
        </div>


    )
}

export default UserHomePage;