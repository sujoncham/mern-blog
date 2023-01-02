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
    const profile = `https://mern-blog-server-uoiu.onrender.com/`;
    

    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`https://mern-blog-server-uoiu.onrender.com/api/user/profile/${id}`)
            .catch((err)=>console.log(err));
            const data = await res.data;
            setUser(data);
           
        }
        getData();
    }, [id]);

    const handleEditBlog = (id)=>{
        navigate(`/profile/${id}`)
    }
    const handleProfileImg = (id)=>{
        navigate(`/profileImg/${id}`)
    }
    return (
        <>
            <div>
                <button onClick={()=>handleProfileImg(id)} className='px-3 py-2 bg-purple-300 rounded-lg'><FaRegEdit /></button>
            </div>
            <div className='flex flex-col justify-center items-center relative'>
            <img 
                className='w-full h-40 border-2 border-purple-500' 
                src={profile + userDetail?.bannerImg} 
                alt="" 
            />
            <img 
                className='w-24 h-24 rounded-full border-2 border-purple-500 absolute left-[30%] bottom-0' 
                src={profile + userDetail?.profileImg} 
                alt="" 
                />
            
        
            </div>
            <div className='px-3 py-10'>
                <div>
                    <button onClick={()=>handleEditBlog(id)} className='px-3 py-2 bg-purple-300 rounded-lg'><FaRegEdit /></button>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Username:</h4>
                    <p>{userDetail?.username}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>User Email:</h4>
                    <p className='text-[13px]'>{userDetail?.email}</p>
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
                    <h4 className='font-bold text-purple-500'>Vision:</h4>
                    <p>{userDetail?.vision}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Address: </h4>
                    <p>{userDetail?.address}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Phone: </h4>
                    <p>{userDetail?.phone}</p>
                </div>
                
            </div> 
        </>
    );
};

export default Profile;