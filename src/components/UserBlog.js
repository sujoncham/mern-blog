import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActiveUser from './ActiveUser';
import Profile from './Profile';
import { getFollow, getUnfollow } from './SharedData/Follow';
import UserData from './SharedData/UserData';

const UserBlog = () => {
    const {users} = UserData();
    const navigate = useNavigate();
    console.log(users)
    const profile = `https://mern-blog-server-uoiu.onrender.com/`;



    const handleDetail = (id) =>{
        navigate(`/blog/${id}`)
    }

    const handleEditBlog = (id) =>{
        navigate(`/userBlog/${id}`)
    }

    const handleDeleteBlog = async(id)=>{
        const delConfirm = window.confirm('are you sure to delete this blog?');
        if(delConfirm){
            await axios.delete(`https://mern-blog-server-uoiu.onrender.com/api/blog/${id}`)
            .then(()=>{
                toast('deleted successfully');
                window.location.reload();
                navigate('/userBlog')
            })
            .catch((err)=>console.log(err))
        }
    }

    const handleFollow =(id)=>{
        getFollow(id);
    }
    const handleUnfollow =(id)=>{
        getUnfollow(id);
    }

    return (
        <div className='container mx-auto px-10 bg-purple-100'>
            <h1 className='text-3xl font-bold text-purple-600'>My Blogs</h1>
            <div className='flex gap-5'>
                <div className='w-[25%] bg-purple-200'> 
                    <Profile users={users} />
                </div>
                <div className='w-[50%]'> 
                <div>
                    <div className='relative'>
                        <img 
                            className='w-full h-80 border-2 border-purple-500' 
                            src={profile + users?.user?.bannerImg} 
                            alt="" 
                        />
                        <img 
                            className='w-48 h-48 rounded-full border-2 border-purple-500 absolute left-[32%] bottom-0' 
                            src={profile + users?.user?.profileImg} 
                            alt="" 
                        />
                    
                
                    </div>
                    <div className='flex justify-evenly items-center py-5'>
                        <span>{users?.user?.address}</span>
                        <span>
                            {
                                users?.user?.followers === users?.user?._id ?
                                <button onClick={handleUnfollow} className='bg-purple-500 px-2 py-1 rounded-lg'>Unfollow</button>
                                :
                                <button onClick={handleFollow} className='bg-purple-500 px-2 py-1 rounded-lg'>Follow</button>
                            }
                        </span>
                        <span>{users?.user?.phone}</span>
                    </div>
                </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                        {
                        users?.user?.blogs.length
                         && users?.user?.blogs?.map(blog=><div key={blog._id} className='bg-white p-2 rounded-lg'>
                            <img className='w-full h-56' src={blog?.image} alt="" />
                            <div className='flex justify-between items-center'>
                                <span>
                                    <h3 className='text-[14px] text-purple-400 font-bold mt-5'>Posted date : {moment.utc(blog?.date).local().startOf('seconds').fromNow()}</h3>
                                    <h3 className='text-[16px] font-bold'><span className='text-purple-500'>Author:</span> <span className='text-purple-400'>{users?.data?.username}</span></h3>
                                </span>
                                <span>
                                    <button onClick={()=>handleEditBlog(blog._id)} className='text-purple-400 rounded-lg'><FaRegEdit /></button>
                                    <button onClick={()=>handleDeleteBlog(blog._id)} className='text-purple-400 rounded-lg'><FaTrashAlt /></button>
                                </span>
                            </div>
                            <h3 className='text-xl font-bold text-purple-500'>{blog?.title}</h3>
                            <p>{blog?.description?.slice(0, 140)}...</p>
                            <div>
                                <button onClick={()=>handleDetail(blog._id)} className='px-3 py-2 bg-purple-500 rounded-lg hover:bg-purple-400'>read more</button>
                            </div>
                        </div>) }
                        {!users?.user?.blogs.length && "no blog yet"}
                    </div>
                </div>

                <div className='w-[25%] bg-purple-200 px-3'> 
                    <ActiveUser />
            </div>
            </div>
        </div>
    );
};

export default UserBlog;
