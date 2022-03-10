import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navigation from './Navigation'
import "../Home.css"

function Basecamp () {
    return (
        <div className='Basecamp'>
            <div className='nav'>
                <Routes>
                    <Route path='/' element={<Navigation />} />    
                </Routes>    
            </div>
        </div>
    )
}

export default Basecamp