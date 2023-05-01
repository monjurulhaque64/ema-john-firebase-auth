import React, { useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    const {singIn} = useContext(AuthContext);
    // const [error, setError]= useState('');


    const handleLogIn =(event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass =form.password.value;
        console.log(email, pass)

        
        singIn(email, pass)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogIn}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required/>
                </div>
                <input className='btn-submit' type="submit" value="login" />
            </form>
            <p><small>new to ema-john<Link to='/register'> Register</Link></small></p>
            {/* <p className='text-error'>{error}</p> */}
        </div>
    );
};

export default Login;