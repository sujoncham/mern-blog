import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UserData from './SharedData/UserData';

const ActiveUser = () => {
    const navigate = useNavigate()

    const {users} = UserData();
    // console.log(users)
  
   const { isLoading, error, data } = useQuery({
    queryKey: ['users'], queryFn: () => fetch('http://localhost:5000/api/user/').then( (res) => res.json() ), })

//    console.log(data.data)

    const allUser = data?.data?.filter(username => username?._id !== users?.user._id)
    const follower = allUser?.filter(follow=>follow?.followings === users?.user?.followers)

    const profile = `https://mern-blog-server-uoiu.onrender.com/`;
 
    if (isLoading) return 'Loading...'
 
    if (error) return 'An error has occurred: ' + error.message;

    const handleFollow =async (id)=>{
        await axios.patch(`http://localhost:5000/api/user/profile/${id}/follow`, {
                userId: localStorage.getItem('userId')
            })
            .catch((err)=>console.log(err))
            .then((data)=>{
                console.log(data)
                console.log('successfull follow')
            });
    }

    const handleUnfollow =async (id)=>{
        await axios.patch(`http://localhost:5000/api/user/profile/${id}/unfollow`, {
            userId: localStorage.getItem('userId')
        })
        .catch((err)=>console.log(err))
        .then((data)=>{
            console.log(data)
            console.log('successfull follow')
        });
    }

    const singleUserProfile = (id) =>{
        navigate(`/userProfile/${id}`)
    }
   
    return (
        <div className='border-2 border-purple-300 bg-purple-300 px-1 py-1 mt-2 rounded-lg'>
            <h1>Followers : {follower?.length}</h1>
            {
                follower?.map(user => {
                    return(
                        <div key={user._id} className='flex justify-start items-center gap-3 mt-2 bg-white p-1 rounded-lg'>
                            <img 
                                className='w-10 h-10 border-2 border-purple-600 rounded-full' 
                                src={profile + user?.profileImg}  
                                alt="" 
                            />
                            <div className='flex justify-between items-center w-[190px]'>
                                <span>
                                    <button onClick={()=>singleUserProfile(user._id)} className='cursor-pointer hover:text-purple-600 hover:underline'>{user?.username}</button>
                                    <h3>{user?.address}</h3>
                                </span>
                                <span>
                                {
                                user?.followers.length ? 
                                <div 
                                    onClick={()=>handleFollow(user._id)} 
                                    className='bg-purple-500 hover:bg-purple-400 p-1 text-white cursor-pointer'>
                                    <FaCheckCircle size={20} />
                                </div>
                                :
                                <div 
                                    onClick={()=>handleUnfollow(user._id)} 
                                    className='bg-purple-500 hover:bg-purple-400 p-1 text-white cursor-pointer'>
                                   <FaPlus size={20} /> 
                                </div>
                                }
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ActiveUser;