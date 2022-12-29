import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [inputs, setInputs] = useState({
        name: "", email: "", password: ""
    });
    const navigate = useNavigate();
    
    const handleChange = (e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const sendRequest = async()=>{
        const res = await axios.post('http://localhost:5000/api/user/signup', {
             username: inputs.username,
             email: inputs.email,
             password: inputs.password,
         }).catch((err)=>{
             console.log(err)
         })
         const data = await res.data;
         return data;
     }
 
     const hangleSubmit =(e)=>{
         e.preventDefault();
         console.log(inputs)
         sendRequest().then((data)=>{
             console.log(data);
             console.log('user created successfull');
            navigate('/login')
         })
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
                        <input type="text" name='username' onChange={handleChange} placeholder="username" className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email">email</label>
                        <input type="text" name='email' onChange={handleChange} placeholder="email" className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                   
                    <div className="flex flex-col mt-5">
                        <label htmlFor="password">password</label>
                        <input type="text" onChange={handleChange} name='password' placeholder="password" className='border-2 px-2 py-2 w-full rounded-md' />
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