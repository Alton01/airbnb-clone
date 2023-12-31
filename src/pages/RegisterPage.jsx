import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);



    async function registerUser(ev) {
        ev.preventDefault();

        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            
            alert('Registration Successfull');
            setRedirect(true);
        } catch (e) {
            alert('Registration failed. Email already exists');
        }
    }

    if(redirect) {
        return <Navigate to={'/login'} />
    }


    return (
        <div className="mt-4 grow flex items-center justify-around"> 
            <div className="mb-44">
                <h1 className="text-4xl text-center font-bold mb-6 mt-4">REGISTER</h1>
                <form className="max-w-lg mx-auto" onSubmit={registerUser}>
                        <input type="text" placeholder='Your Name' 
                        value={name} onChange={ev => setName(ev.target.value)} />
                        <input type="email" placeholder='your@email.com' 
                        value={email} onChange={ev => setEmail(ev.target.value)} />
                        <input type="password" placeholder="Password" 
                        value={password} onChange={ev => setPassword(ev.target.value)} />
                        <button className="primary">Register</button>
                    <div className="text-center py-3 text-gray-500 " >Already a member?  <Link className="underline text-black" to={'/login'}>Login</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}