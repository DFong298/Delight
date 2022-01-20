import React, { useState } from 'react'
import './SelectStrategy.css'
import { Link } from 'react-router-dom';


const VarCalculator = () => {
    const [redirect, setRedirect] = useState('/callspread');

    return (
        <div>
            <div className='box'>  
                    <h1 className='strategies'>Select Strategy</h1>
                    <select className='dropdown' value={redirect} onChange={e => setRedirect(e.target.value)}>
                        <option className='dropdown-option' value='/callspread'>Bull Call Spread</option>
                        <option className='dropdown-option' value='/putspread'>Bear Put Spread</option>
                        <option className='dropdown-option' value='/protectivecollar'>Protective Collar</option>
                        <option className='dropdown-option' value='/ironcondor'>Iron Condor</option>
                    </select>
                    <Link to={redirect}>
                        <button type='button' className='continue-button'>Continue</button>
                    </Link>
            </div>
        </div>
    )
}

export default VarCalculator
