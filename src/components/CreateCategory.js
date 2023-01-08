import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateCategory = () => {
    const [inputs, setInputs] = useState("");
    const navigate = useNavigate();
    // console.log(inputs)
   
     const hangleSubmit =async (e)=>{
        e.preventDefault();
        await axios.post('https://mern-blog-server-uoiu.onrender.com/api/category/createCategory', {
            category : inputs,
            user: localStorage.getItem('userId'),
         }).catch((err)=>{
             console.log(err)
         })
        .then((data)=>{
        //    console.log(data);
           toast('user created successfull');
           e.target.reset();
           navigate('/createCategory')
        })
     }
    return (
        <div className="bg-purple-300">
            <div className="container mx-auto py-10 flex justify-center gap-10">
               <img className='w-[50%]' src="/images/banner.png" alt="" />
               <form className="w-[50%] bg-white shadow-lg px-10 py-5 rounded-md" onSubmit={hangleSubmit} action="">
                  <div className="flex flex-col mt-5">
                     <label htmlFor="category" className='text-xl py-5'>Category</label>
                     <input type="text" name='category' onChange={(e)=>setInputs(e.target.value)} placeholder="category" className='border-2 px-2 py-2 w-full rounded-md' />
                  </div>
                 
                  <button type='submit' className='bg-red-500 px-2 py-2 rounded-md mt-5'>create category</button>
               </form>
            </div>
         </div>
    );
};

export default CreateCategory;