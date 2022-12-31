import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Profile from './Profile';

const UserBlog = () => {
    const [users, setUsers] = useState([])
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();
    console.log(users)
    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`https://mern-blog-server-uoiu.onrender.com/api/blog/user/${id}`).catch((err)=>console.log(err));
            const data = await res.data;
            setUsers(data);
        }
        getData();
    }, [id]);
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
    return (
        <div className='container mx-auto px-10 bg-purple-100'>
            <h1 className='text-3xl font-bold py-10 text-purple-600'>My Blogs</h1>
            <div className='flex gap-5'>
                <div className='w-[30%] bg-purple-200'> 
                    <Profile />
                </div>
                <div className='w-[70%]'> 
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {users.data && users?.data?.blogs?.map(blog=><div key={blog._id} className='bg-white p-2 rounded-lg'>
                            <img className='w-full h-56' src={blog.image} alt="" />
                            <div className='flex justify-between items-center'>
                                <span>
                                    <h3 className='text-[14px] text-purple-400 font-bold mt-5'>Posted date : {new Date(blog.date).toLocaleDateString()}</h3>
                                    <h3 className='text-[16px] font-bold'><span className='text-purple-500'>Author:</span> <span className='text-purple-400'>{users.data.username}</span></h3>
                                </span>
                                <span>
                                    <button onClick={()=>handleEditBlog(blog._id)} className='text-purple-400 rounded-lg'><FaRegEdit /></button>
                                    <button onClick={()=>handleDeleteBlog(blog._id)} className='text-purple-400 rounded-lg'><FaTrashAlt /></button>
                                </span>
                            </div>
                            <h3 className='text-xl font-bold text-purple-500'>{blog.title}</h3>
                            <p>{blog.description.slice(0, 140)}...</p>
                            <div>
                                <button onClick={()=>handleDetail(blog._id)} className='px-3 py-2 bg-purple-500 rounded-lg hover:bg-purple-400'>read more</button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBlog;
