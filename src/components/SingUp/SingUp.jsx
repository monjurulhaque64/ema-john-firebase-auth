import React, { useContext, useState } from 'react';
import './SingUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SingUp = () => {

    const [error, setError]= useState('');
    const {createUser} = useContext(AuthContext);

    const handleSingUp = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass =form.password.value;
        const confirmPass = form.confirm.value;
        console.log(email, pass, confirmPass)

        setError('');

        if(pass !== confirmPass){
            setError('Your Pass Didnt match')
            return;
        }
        else if(pass.length < 6){
            setError('Please Give 6 digit password')
            return;
        }
        createUser(email , pass)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch((error)=>{
            console.log(error);
            setError(error.message)
        })

    }
    return (
        <div>
            <div className='form-container'>
            <h2 className='form-title'>SingUp</h2>
            <form onSubmit={handleSingUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Password Confirm</label>
                    <input type="password" name="confirm" id="" required/>
                </div>
                <input className='btn-submit' type="submit" value="SingUp" />
                <p className='text-error'>{error}</p>
            </form>
            <p><small>Allready have an account?<Link to='/login'>Login</Link></small></p>
        </div>
        </div>
    );
};

export default SingUp;