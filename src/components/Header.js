import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const id = localStorage.getItem('userId')
    console.log("user Id",id)
    const navigate = useNavigate();

    const handleLogout =()=>{
        localStorage.removeItem("userId")
        navigate('/login')
    }
    
    return (
        <div className='bg-purple-500 py-2 px-5'>
            <div className='container mx-auto px-10'>
                <div className='flex justify-between items-center '>
                    <Link to='/'>Logo</Link>
                        <span className='flex justify-end items-center gap-5'>
                        <Link to='/'>Home</Link>
                        {id && <>
                            <Link to='/addBlog'>Add Blog</Link>
                            <Link to='/userBlog'>User Blog</Link>
                        </>}
                        <Link to='/blog'>Blog</Link>
                        {!id ? <Link to='/login'>Login</Link> : <button onClick={handleLogout}>Logout</button>}
                        </span>
                </div>
            </div>
        </div>
    );
};

export default Header;