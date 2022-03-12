import { Link } from 'react-router-dom'
import React from 'react'
import { useNavigate } from 'react-router-dom'



function UserHomePage() {


    return (
        <div>
            <h1>Welcome to BASECAMP</h1>
            <div>
                <Link to = "/basecamp/topcamplist">Top 50 Campsites</Link>
            </div>
            
            <h2>Gone camping recently? Dont see it on our camplist?</h2>
            <Link to ='/basecamp/new'>Add it here!</Link>
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