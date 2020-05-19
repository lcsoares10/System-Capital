import React from 'react';
import {Link} from 'react-router-dom';
//------------------------------------------------------------

export default function Logon() {


    return (
        <div className="profile-container">
            <h1>LOGON</h1>
            <ul>
                <li><Link className="" to="/profile">Profile</Link></li>
                <li><Link className="" to="/listUsers">listUsers</Link></li>
                <li><Link className="" to="/messages">messages</Link></li>
                <li><Link className="" to="/RegisterContract">RegisterContract</Link></li>
                <li><Link className="" to="/RegisterUsers">RegisterUsers</Link></li>
            </ul>
        </div>
    );
}