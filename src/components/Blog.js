import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate();
    const sendRequest = async()=>{
        const res = await axios.get('http://localhost:5000/api/blog/').catch((err)=>console.log(err));
        const data = await res.data;
        return data;
     }
     console.log(blogs);

     useEffect(()=>{
        sendRequest().then((data)=>{
            setBlogs(data.data);
        })
     }, []);
     const handleDetail = (id) =>{
        navigate(`/blog/${id}`)
     }
    return (
        <div className='container mx-auto px-10'>
            <h1>Blogs -{blogs.length}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {blogs && blogs?.map(blog=><div key={blog._id}>
                    <img className='w-full h-80' src={blog.image} alt="" />
                    <span>Posted date: {new Date(blog.date).toLocaleDateString()}</span>
                    <h1>{blog.title}</h1>
                    <p>{blog.description.slice(0, 140)}...</p>
                    <p className='font-bold'>author: {blog?.user?.username}</p>
                    <div>
                        <button onClick={()=>handleDetail(blog._id)} className='px-3 py-2 bg-purple-500 rounded-lg hover:bg-purple-400'>read more</button>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Blog;