import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';



export const AuthContext =createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoadding] = useState(true)

    const createUser = (email, pass) => {
        setLoadding(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const singIn = (email, pass) =>{
        setLoadding(true);
        return signInWithEmailAndPassword (auth, email, pass);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    // ovserver user auth state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoadding(false);
        });
        return () =>{
            return unsubscribe();
        }
    },[])



    const authInfo ={
        user,
        loading,
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