import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function getLoginDetails() {
        console.log("email "+email)
        console.log("password "+password)

    }


    return (
        <div>
            <h2>
                please enter your email address for login
            </h2>
            <input placeholder='enter your email address'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            /><br></br>
            <input placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />
            <button onClick={getLoginDetails}>
                submit
            </button>
            <a href="http://localhost:5000/api/auth/google">
                <button>Sign in with Google</button>
                </a>

        </div>
    )
}