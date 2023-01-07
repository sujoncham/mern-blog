import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getFollow } from './SharedData/Follow';

const ActiveUser = () => {
    const navigate = useNavigate()
  
   const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('http://localhost:5000/api/user/').then(
        (res) => res.json(),
      ),
  })

//    console.log(data)
   const profile = `http://localhost:5000/`;
 
   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message;

   const handleFollow =(id)=>{
        getFollow(id);
    }

    const singleUserProfile = (id) =>{
        navigate(`/userProfile/${id}`)
    }
   
    return (
        <div>
            <h1>{data?.length}</h1>
            {
                data?.data?.map(user => {
                    return(
                        <div key={user._id} className='flex justify-start items-center gap-3 mt-2 bg-white p-1'>
                            <img 
                                className='w-10 h-10 border-2 border-purple-600 rounded-full' 
                                src={profile + user?.profileImg}  
                                alt="" 
                            />
                            <div className='flex justify-between items-center w-[190px]'>
                                <span>
                                    <button onClick={()=>singleUserProfile(user._id)} className='cursor-pointer hover:text-purple-600 hover:underline'>{user.username}</button>
                                    <h3>{user.address}</h3>
                                </span>
                                <span onClick={()=>handleFollow(user._id)} className='bg-purple-500 hover:bg-purple-400 p-1 text-white cursor-pointer'>
                                   { user?.followers.length ? <FaCheckCircle /> : <FaPlus /> }
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