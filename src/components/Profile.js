import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem('userId');
    const handleEditBlog = (id)=>{
        navigate(`//${id}`)
    }
    return (
        <>
        <div>
            <button onClick={()=>handleEditBlog(id)} className='px-3 py-2 bg-purple-300 rounded-lg'>edit</button>
        </div>
            <div className='flex justify-center items-center py-5'>
                <img className='w-44 h-44 rounded-full border-2 border-purple-500' src="/images/banner.png" alt="" />
            </div>
            <div className='px-3'>
                <h1>Username: {localStorage.getItem('username')}</h1>
                <h1>Email: <br /> {localStorage.getItem('userEmail')}</h1>
                <h1>Phone: 461346313</h1>
                <h1>About Me: I am developer</h1>
                <h1>Hobby: Reading Book</h1>
                <h1>Address: Dhaka</h1>
            </div> 
        </>
    );
};

export default Profile;