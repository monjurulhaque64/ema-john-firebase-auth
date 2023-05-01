import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {

    const { user, logOut } =useContext(AuthContext);

    const hsndleLogOut = () =>{
        logOut()
        .then(result=>{
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/singup">signup</Link>
                {user && <span> Welcome {user.displayName} <button onClick={hsndleLogOut}>Sing Out</button> </span>}
            </div>
        </nav>
    );
};

export default Header;