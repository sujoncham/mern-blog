import React from 'react';
import { FaBloggerB } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import UserData from './SharedData/UserData';

const Header = () => {
    const id = localStorage.getItem('userId');
    const {users} = UserData()
    const navigate = useNavigate();

    const handleLogout =()=>{
        localStorage.removeItem("userId")
        navigate('/login')
    }
    
    return (
        <div className='bg-purple-500 py-3 px-5 sticky top-0 z-40'>
            <div className='container mx-auto px-10'>
                <div className='flex justify-between items-center '>
                    <Link className='text-white' to='/'>
                        <span className='flex justify-start gap-1'>
                        <FaBloggerB size={30} /> <span>MERN BLOG</span>
                        </span>
                    </Link>
                    <span className='flex justify-end items-center gap-5'>
                        <Link to='/'>Home</Link>
                        {id && <>
                        <Link to='/addBlog'>Add Blog</Link>
                        <Link to='/myBlog'>My Blog</Link>
                        </>}
                        <button className='bg-white rounded-lg p-1'>{users?.user?.username?.slice(0, 5)}</button>
                        {!id ? <Link to='/login'>Login</Link> : <button className='border-2 border-purple-50 rounded-lg px-1' onClick={handleLogout}>Logout</button>}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;