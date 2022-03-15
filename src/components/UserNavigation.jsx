import {Link, useNavigate } from 'react-router-dom'
import { clearUserToken, getUserToken} from '../utils/authToken'


function UserNavigation(props) {
    const navigate = useNavigate();

    const handleLogout = async () => {

        clearUserToken()
        navigate('/basecamp', {replace: true} )
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/basecamp">BASECAMP</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="/basecamp/userhomepage">Your Home Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/basecamp/topcamplist">Top 50 Campsites</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/basecamp/camplist">All Campsites</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/basecamp/login">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
export default UserNavigation