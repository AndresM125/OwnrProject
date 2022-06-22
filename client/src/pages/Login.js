import React, { useState } from "react";
import ButtonAtom from "../components/Atoms/ButtonAtom";
import AuthService from "../auth/authService";
import { Navigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());

    const onLoginClicked = () => {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(result => {
                AuthService.setJWT(result.token);
                setIsLoggedIn(true);
            })
            .catch(error => {
                // TODO: Error
                alert("Invalid user/pass")
                console.error('Error:', error);
            });
    };

    console.log(isLoggedIn);

    if (isLoggedIn)
    {
        return (<Navigate to={{ pathname: '/admin' }} />);
    }

    return (
        <div className='h-screen flex'>
            <div className='w-full max-w-md m-auto rounded-lg p-10 bg-gray-100'>
                <h1 className='text-xl font-medium mb-10 text-center'>Login</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className='w-full p-2 border rounded-md outline-none text-sm'
                            id='email'
                            placeholder='Email'
                            value={email}
                            onChange={e => { setEmail(e.target.value); }} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className='w-full p-2 border rounded-md outline-none text-sm'
                            id='password'
                            placeholder='Password'
                            value={password}
                            onChange={e => { setPassword(e.target.value); }} />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <ButtonAtom onClick={onLoginClicked} style="bg-blue-400">Login</ButtonAtom>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login