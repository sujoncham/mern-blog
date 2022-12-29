import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserBlog = () => {
    const [users, setUsers] = useState([])
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();
    console.log(users)
    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err)=>console.log(err));
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
            await axios.delete(`http://localhost:5000/api/blog/${id}`)
            .then(()=>{
                console.log('deleted successfully');
                window.location.reload();
                navigate('/userBlog')
            })
            .catch((err)=>console.log(err))
        }
     }
    return (
        <div className='container mx-auto px-10'>
            <h1 className='text-3xl font-bold py-10'>My Blogs</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {users.data && users?.data?.blogs?.map(blog=><div key={blog._id}>
                    <img className='w-full' src={blog.image} alt="" />
                    <div className='flex justify-between items-center'>
                        <span>
                            <h3 className='text-[14px] text-purple-300 font-bold mt-5'>Posted date : {new Date(blog.date).toLocaleDateString()}</h3>
                            <h3 className='text-xl font-bold'>{users.data.username}</h3>
                        </span>
                        <span>
                            <button onClick={()=>handleEditBlog(blog._id)} className='px-3 py-2 bg-purple-300 rounded-lg'>edit</button>
                            <button onClick={()=>handleDeleteBlog(blog._id)} className='px-3 py-2 bg-purple-300 rounded-lg'>del</button>
                        </span>
                    </div>
                    <h3 className='text-xl font-bold'>{blog.title}</h3>
                    <p>{blog.description.slice(0, 140)}...</p>
                    <div>
                        <button onClick={()=>handleDetail(blog._id)} className='px-3 py-2 bg-purple-500 rounded-lg hover:bg-purple-400'>read more</button>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default UserBlog;
