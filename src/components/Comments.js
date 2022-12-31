import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";

const Comments = ({id}) => {
    const [inputs, setInputs] = useState({ comment: "" });
    const [comments, setComments] = useState({})


    useEffect(()=>{
        const getComment = async () =>{
            const res = await axios.get(`https://mern-blog-server-uoiu.onrender.com/api/comment/`).catch((err)=>console.log(err));
            const data = await res.data;
            setComments(data);
        }
        getComment();
    }, [id]);
    
    
     const handleChange = (e)=>{
        setInputs((prevState)=>({
           ...prevState,
           [e.target.name] : e.target.value,
        }))
    }
  
     const sendRequest = async()=>{
        const res = await axios.post('https://mern-blog-server-uoiu.onrender.com/api/comment/createComment', {
           comment: inputs.comment,
           username: localStorage.getItem('username'),
         }).catch((err)=>{
             console.log(err);
         })
        const data = await res.data;
        return data;
     }
  
     const hangleComment =(e)=>{
        e.preventDefault();
        console.log(inputs)
        sendRequest().then((data)=>{
           console.log('comment created successfull', data);
        //    e.target.reset();
        })
     }
    return (
        <div>
            <div>
                <div className="flex justify-start gap-3 mt-5">
                    <span className='flex justify-start items-center'>1 <FaHeart /></span>
                    <button htmlFor="comment">like</button>
                </div>
            </div>
            <div>
                <form onSubmit={hangleComment} className='border-b-2 py-3 border-purple-200'>
                    <div className="flex flex-col mb-2">
                        <label className='font-bold text-xl text-purple-400' htmlFor="comment">Comments : </label>
                        <textarea type="text" onChange={handleChange} name="comment" cols="10" rows="3" className='border-2 px-2 py-2 w-[550px] rounded-md'></textarea>
                    </div>
                    <button type='submit' className='bg-purple-500 px-3 py-2 rounded-lg hover:bg-purple-600 hover:text-white'>comment</button>
                </form>
                <div className="flex flex-col mt-5 py-2">
                    {comments && comments?.data?.map(comment =><div key={comment._id} className="border-b-2 border-purple-200 py-3">
                    <div className='flex justify-start gap-3'>
                        <img className='w-12 h-12 border-2 border-purple-600 rounded-full' src="/images/banner.png" alt="" />
                        <span className='flex flex-col'>
                            <span>{comment.username}</span>
                            <span>{new Date(comment.commentDate).toDateString()}</span>
                        </span>
                    </div>
                    <p>{comment.comment}</p> 
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Comments;