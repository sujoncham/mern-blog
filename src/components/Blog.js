import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [searched, setSearched] = useState([]);
    const navigate = useNavigate();
    const sendRequest = async()=>{
        const res = await axios.get('https://mern-blog-server-uoiu.onrender.com/api/blog/').catch((err)=>console.log(err));
        const data = await res.data;
        return data;
     }
    //  console.log("yeah,", blogs);

     useEffect(()=>{
        sendRequest().then((data)=>{
            setBlogs(data?.data);
            setSearched(data?.data);
        })
     }, []);
     const handleDetail = (id) =>{
        navigate(`/blog/${id}`)
     }

     

   const handleSearch = (e) =>{
    const textData = e.target.value;
      const filtered = blogs?.filter(blog => blog.title.toLowerCase().includes(textData.toLowerCase()));
      setSearched(filtered);
    }

    return (
        <div className='container mx-auto px-10'>
            <div className='py-10'>
                <input
                    type="text"
                    onChange={handleSearch}
                    className='border-2 border-purple-400 focus:border-purple-500 py-2 px-3 rounded-lg w-full'
                    placeholder='search your blog'
                />
                <h1 className='font-bold py-3 text-purple-400'>Search Result Blog - {searched.length}</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                {blogs && searched?.map(blog=><div key={blog._id}>
                    <img className='w-full h-72' src={blog.image} alt="" />
                    <p className='font-bold py-3 text-purple-400'>{blog?.user?.username} - {new Date(blog.date).toLocaleDateString()}</p>
                    <h1 className='font-bold text-xl text-purple-500'>{blog.title}</h1>
                    <p>{blog.description.slice(0, 140)}...</p>
                    <div>
                        <button onClick={()=>handleDetail(blog._id)} className='px-3 py-2 bg-purple-500 rounded-lg hover:bg-purple-400 hover:text-white'>read more</button>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default Blog;