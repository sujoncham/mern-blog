import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const {id} = useParams();
    const [detail, setDetail] = useState({})
    console.log(detail.user)

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
            <div>
                <img className='w-full h-[350px]' src={detail?.user?.image} alt="" />
                <div>
                    <h1 className='font-bold'>Author - {detail.user?.user?.username}</h1>
                    <h1 className='font-bold'> {detail?.user?.title}</h1>
                    <h1>{detail?.user?.description}</h1>
                </div>
            </div>
            
        </div>
    );
};

export default BlogDetails;