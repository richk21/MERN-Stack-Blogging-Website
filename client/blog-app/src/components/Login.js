import './css/forms.css'

export default function Login(){
    return(
        <form className="login">
            <h2>Login</h2>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>Login</button>
        </form>
    )
}