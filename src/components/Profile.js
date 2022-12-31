import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const id = localStorage.getItem('userId');
    // console.log(user)
    const userDetail = (user.user);

    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`https://mern-blog-server-uoiu.onrender.com/api/user/profile/${id}`).catch((err)=>console.log(err));
            const data = await res.data;
            setUser(data);
           
        }
        getData();
    }, [id]);

    const handleEditBlog = (id)=>{
        navigate(`/profile/${id}`)
    }
    return (
        <>
            <div>
                <button onClick={()=>handleEditBlog(id)} className='px-3 py-2 bg-purple-300 rounded-lg'><FaRegEdit /></button>
            </div>
            <div className='flex justify-center items-center p-2'>
                <img className='w-44 h-44 rounded-full border-2 border-purple-500' src="/images/banner.png" alt="" />
            </div>
            <div className='px-3'>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Username:</h4>
                    <p>{userDetail?.username}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>User Email:</h4>
                    <p className='text-[13px]'>{userDetail?.email}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Phone: </h4>
                    <p>{userDetail?.phone}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>About Me:</h4>
                    <p>{userDetail?.description}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Hobby:</h4>
                    <p>{userDetail?.hobby}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Address: </h4>
                    <p>{userDetail?.address}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Vision:</h4>
                    <p>{userDetail?.vision}</p>
                </div>
            </div> 
        </>
    );
};

export default Profile;