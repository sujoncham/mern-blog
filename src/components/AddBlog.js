import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBlog = () => {
  const [inputs, setInputs] = useState({
      title: "", 
      description: "", 
      image: "", 
      category: "",
  });
//   const navigate = useNavigate();
  
   const handleChange = (e)=>{
      setInputs((prevState)=>({
         ...prevState,
         [e.target.name] : e.target.value,
      }))
  }

   const sendRequest = async()=>{
      const res = await axios.post('http://localhost:5000/api/blog/createBlog', {
         title: inputs.title,
         description: inputs.description,
         category: inputs.category,
         image: inputs.image,
         user: localStorage.getItem('userId'),
       }).catch((err)=>{
           console.log(err)
       })
      const data = await res.data;
      return data;
   }

   const hangleSubmit =(e)=>{
      e.preventDefault();
      console.log(inputs)
      sendRequest().then((data)=>{
         console.log(data);
         toast('user created successfull');
         e.target.reset();
         // navigate('/addBlog')
      })
   }

   const [cates, setCates] = useState([])
    

    useEffect(()=>{
        const getData = async () =>{
        await axios.get('http://localhost:5000/api/category/').catch((err)=>console.log(err))
        .then((data)=>setCates(data.data.data))
    }
    getData()
    }, [])


    return (
         <div className="bg-purple-300">
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
                     <label htmlFor="description">Category</label>
                     <select name="category" value={inputs.category} onChange={handleChange} className='border-2 px-2 py-2 w-full rounded-md'>
                        {cates.map(cate=>{
                           return (
                              <option key={cate._id} value={cate.category}>{cate.category}</option>
                           )
                        })}
                     </select>
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

export default AddBlog;