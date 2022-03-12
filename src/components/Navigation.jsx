import {Link} from 'react-router-dom'
import Logo from  '../images/basecamp-logo.png'


function Navigation(props) {
    return (
        <nav className = "navigation">
            <h1></h1>
            <div className = "navigation__link-wrapper">
                <Link to ='/basecamp/userhomepage'>Your Home Page</Link>
                <Link to ="/basecamp/topcamplist">Top 50 Campsites</Link>
                <Link to ="/basecamp/register">Sing Up</Link>
                <Link to ="/basecamp/login">Login</Link>
            </div>
            <div>
                <img src = {Logo}></img>
            </div>
        </nav>
    )
}
export default Navigation