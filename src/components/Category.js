import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFolderPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Category = () => {
    const [cates, setCates] = useState([])
    const id = localStorage.getItem('userId');
    const navigate = useNavigate()
    // console.log(cates)

    useEffect(()=>{
        const getData = async () =>{
        await axios.get('http://localhost:5000/api/category/')
        .catch((err)=>{
             console.log(err)
         })
        .then((data)=>{
        //    console.log("data get", data);
           setCates(data.data.data)
        })
    }
    getData()
    }, [])

    const handleCreateCategory = (id)=>{
        navigate(`/createCategory/${id}`)
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-xl text-purple-500 py-3'>Blog Categories</h1>
                <button onClick={()=>handleCreateCategory(id)} className='px-3 py-2 bg-purple-300 rounded-lg'><FaFolderPlus /></button>
            </div>
            <ul className='flex flex-col gap-1'>
                {  
                cates.map(cate=> {
                    return (
                        <li key={cate._id}>
                        <Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-1 rounded-lg w-full block'>{cate.category}</Link>
                        </li>
                )
                })
                
                }
            
            </ul>
            
        </>
    );
};

export default Category;