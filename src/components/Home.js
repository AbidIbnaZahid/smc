import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Home = () => {
    const navigate = useNavigate()
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
        } else {
            navigate("/login")
        }
    });

    let handleLogin = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login", { state: "You are Loged Out!!" })
        }).catch((error) => {
            // An error happened.
        });

    }
    return (
        <div className='home'>
            <h1 onClick={handleLogin}>Hi, Shawon Sir</h1>
            <p className='hide'>Log Out</p>
        </div>
    )
}

export default Home