import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
    const [detail, setDetail] = useState();
    const navigate = useNavigate();
    const {updateId} = useParams();
    console.log(detail)

    const [inputs, setInputs] = useState({
        title: "", description: "", image: ""
    });

    const handleChange = (e)=>{
        setInputs((prevState)=>({
           ...prevState,
           [e.target.name] : e.target.value,
        }))
    }

    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`http://localhost:5000/api/blog/${updateId}`).catch((err)=>console.log(err));
            const data = await res.data;
            setDetail(data);
            setInputs({
                title:data?.user?.title,
                description:data?.user?.description,
                image:data?.user?.image,
            })
        }
        getData();
    }, [updateId]);
    console.log(detail);

    const getData = async () =>{
        const res = await axios.patch(`http://localhost:5000/api/blog/updateBlog/${updateId}`, {
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
        }).catch((err)=>console.log(err));
        const data = await res.data;
        return data;
    }
    
    const hangleSubmit =(e)=>{
        e.preventDefault();
        getData().then(data=>{
            console.log(data)
            navigate(`/blog/${updateId}`)
        });
        
     }
    return (
        <div className="bg-purple-300">
            <h1>{updateId}</h1>
            <div className="container mx-auto py-10 flex justify-center gap-10">
               <img className='w-[50%]' src="/images/banner.png" alt="" />
               <form className="w-[50%] bg-white shadow-lg px-10 py-5 rounded-md" onSubmit={hangleSubmit} action="">
                  <div className="flex flex-col mt-5">
                     <label htmlFor="title">Title</label>
                     <input type="text" name='title' value={inputs.title} onChange={handleChange} placeholder="title" className='border-2 px-2 py-2 w-full rounded-md' />
                  </div>
                  <div className="flex flex-col mt-5">
                     <label htmlFor="description">Description</label>
                     <textarea type="text" value={inputs.description} name="description" onChange={handleChange} cols="30" rows="10" className='border-2 px-2 py-2 w-full rounded-md'></textarea>
                  </div>
                  <div className="flex flex-col mt-5">
                     <label htmlFor="fname">Blog Image</label>
                     <input type="text" value={inputs.image} onChange={handleChange} name='image' placeholder="blog image" className='border-2 px-2 py-2 w-full rounded-md' />
                  </div>
                  <button type='submit' className='bg-red-500 px-2 py-2 rounded-md mt-5'>create blog</button>
               </form>
            </div>
         </div>
    );
};

export default UpdateBlog;