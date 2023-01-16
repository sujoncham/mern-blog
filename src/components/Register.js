import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
   
 
    const hangleSubmit =(e)=>{
         e.preventDefault();
         const sendRequest = async ()=>{
            await axios.post('https://mern-blog-server-uoiu.onrender.com/api/user/signup', {
                 username: username,
                 email: email,
                 password: password,
             }).catch((err)=>{
                 console.log(err)
             }).then((data)=>{
             console.log(data);
             console.log('user created successfull');
            navigate('/login')
         })
        }
        sendRequest()

    }
    return (
        <div className="bg-purple-300">
            <div className="container mx-auto py-10 flex justify-center gap-10">
                <div className='w-[50%]' >
                    <img className='w-[100%]' src="/images/banner.png" alt="" />
                </div>
                <div className='w-[50%] bg-white shadow-lg px-10 py-5 rounded-md'>
                    <div>
                        <h1 className='text-4xl font-bold'>Register</h1>
                    </div>
                    <form onSubmit={hangleSubmit} >
                        <div className="flex flex-col mt-5">
                            <label htmlFor="username">username</label>
                            <input type="text" name='username' onChange={(e)=>setUsername(e.target.value)} placeholder="username" className='border-2 px-2 py-2 w-full rounded-md' />
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="email">email</label>
                            <input type="text" name='email' onChange={(e)=>setEmail(e.target.value)} placeholder="email" className='border-2 px-2 py-2 w-full rounded-md' />
                        </div>
                    
                        <div className="flex flex-col mt-5">
                            <label htmlFor="password">password</label>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)} name='password' placeholder="password" className='border-2 px-2 py-2 w-full rounded-md' />
                        </div>
                        <button type='submit' className='bg-red-500 px-2 py-2 rounded-md mt-5'>create account</button>
                    </form>
                <p>already have an account? <Link to='/login' className='text-purple-500'>Login</Link> here</p>
            </div>
            </div>
        </div>
    );
};

export default Register;