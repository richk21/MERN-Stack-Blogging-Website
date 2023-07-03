import { useContext, useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "./UserContext";

export default function Header(){
    const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(()=>{
        fetch("http://localhost:4000/profile",{
            credentials:'include',
        }).then(response=>{
            response.json().then(userInfo=>{
                //setUsername(userInfo.username);
                setUserInfo(userInfo);

            })
        })
    }, [])

    function logout(){
        fetch("http://localhost:4000/logout",{
            credentials: 'include',
            method: "POST",
        })
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return(
        <header>
            <Link to="/" className="logo">Blog</Link>
            <nav>
            {username &&(
                <>
                <Link to='/CreatePost'>Create</Link>
                <Link onClick={logout}>Logout</Link>
                </>
            )}
            {!username &&(
                <>
                    <Link to='/Login'>Login</Link>
                    <Link to='/Register'>Register</Link>
                </>
            )}
            </nav>
        </header>
    )
}