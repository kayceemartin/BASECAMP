import {Link} from 'react-router-dom'

function Navigation(props) {
    return (
        <nav className="navigation">
            <div className="navigation__links-wrapper">
                <Link to="/basecamp"><p>All Campsites</p></Link>
                <Link to="/basecamp/new"><p>Add a Campsite</p></Link>
            </div>
        </nav>
    )
}

export default Navigation