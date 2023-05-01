import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';



export const AuthContext =createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const singIn = (email, pass) =>{
        return signInWithEmailAndPassword (auth, email, pass);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    // ovserver user auth state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
        });
        return () =>{
            return unsubscribe();
        }
    },[])



    const authInfo ={
        user,
        createUser,
        singIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;