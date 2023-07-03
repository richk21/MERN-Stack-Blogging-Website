import { useContext, useState } from 'react'
import './css/forms.css'
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/Login",{
            method:"POST",
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include', 
        })

        if(response.ok){
            //redirect to the homepage
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                setRedirect(true);
            });
        }else{
            //show that the password or username is incorrect
            alert("Incorrect username or password.");
        }
    }

    if(redirect){
        return(
            <Navigate to={'/'}/>
        )
    }

    return(
        <form className="login" onSubmit={login}>
            <h2>Login</h2>
            <input type="text" 
                placeholder="username"
                value={username}
                onChange={ev=>setUsername(ev.target.value)}
                />
            <input type="password" 
                placeholder="password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)}
                />
            <button>Login</button>
        </form>
    )
}