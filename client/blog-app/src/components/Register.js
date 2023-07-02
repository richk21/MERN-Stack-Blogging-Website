import { useState } from 'react'
import './css/forms.css'

export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev){
        ev.preventDefault();
        await fetch('http://localhost:4000/Register',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
        })
    }
    return(
        <form className="register" onSubmit={register}>
            <h2>Register</h2>
            <input type="text" 
                value={username} 
                placeholder="username"
                onChange={ev=>setUsername(ev.target.value)}
            />
            <input type="password" 
                placeholder="password"
                value={password}
                onChange={ev=>setPassword(ev.target.value)}
                />
            <button>Register</button>
        </form>
    )
}