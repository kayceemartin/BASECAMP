import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navigation from './Navigation'
import "../Home.css"
// import Logo from  './images/basecamp-logo.png'

function Basecamp () {
    return (
        <div className='Basecamp'>
            <Navigation />
            <div className='nav'>
                <Routes>
                    <Route path='/' element={<Navigation />} />    
                </Routes> 
                   {/* <img src = {Logo}></img> */}
            </div>
        </div>
    )
}

export default Basecamp