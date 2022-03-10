import {Link} from 'react-router-dom'
import Logo from  '../images/basecamp-logo.png'
import CampsiteList from './CampsiteList'

function Navigation(props) {
    return (
        <nav className = "navigation">
            <h1></h1>
            <div className = "navigation__link-wrapper">
                <Link to = '/basecamp/camplist'><p>Top 50 Campsites</p></Link>
                <Link to = "/basecamp/new"><p>Add a Campsite</p></Link>    
            </div>
            <div>
                <img src = {Logo}></img>
            </div>
        </nav>
    )
}
export default Navigation