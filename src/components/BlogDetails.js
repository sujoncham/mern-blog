import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import Profile from './Profile';

const BlogDetails = () => {
    const {id} = useParams();
    const [detail, setDetail] = useState({})

    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err)=>console.log(err));
            const data = await res.data;
            setDetail(data);
        }
        getData();
    }, [id]);

    
    return (
        <div className="container mx-auto px-24 py-10">
            <div className='flex gap-5'>
                <div className='w-[30%] bg-purple-200'> 
                    <Profile />
                </div>
                <div className='w-[70%]'> 
                    <div>
                        <img className='w-full h-[350px]' src={detail?.user?.image} alt="" />
                        <div className='flex justify-start gap-3 py-3'>
                            <img className='w-12 h-12 border-4 border-purple-600 rounded-full' src="/images/banner.png" alt="" />
                            <span>
                                <h1 className='font-bold text-purple-500'>{detail.user?.user?.username}</h1>
                                <h1 className='font-bold text-gray-800'>{new Date(detail.user?.date).toLocaleDateString()}</h1>
                            </span>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold text-purple-600'> {detail?.user?.title}</h1>
                            <p className='text-gray-800'>{detail?.user?.description}</p>
                        </div>
                    </div>
                    <Comments id={id} />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;