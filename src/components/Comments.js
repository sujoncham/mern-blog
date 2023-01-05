import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Comments = ({post}) => {
    const [comment, setComment] = useState("")
    const {id} = useParams();
    console.log(post?.comments)
    const profile = `https://mern-blog-server-uoiu.onrender.com/`;

     const hangleComment =(e)=>{
        e.preventDefault();
        const getComment = async () =>{
            await axios.patch(`https://mern-blog-server-uoiu.onrender.com/api/blog/${id}/comment`, {
                comments: comment,
                user: localStorage.getItem('userId'),
            })
            .catch((err)=>console.log(err))
            .then((data)=>{
                console.log(data)
                console.log('successfull comment')
                e.target.reset();
            });
        }
        getComment();
    }
    return (
        <div>
            
            <div>
                <form onSubmit={hangleComment} className='border-b-2 py-3 border-purple-200'>
                    <div className="flex flex-col mb-2">
                        <label className='font-bold text-xl text-purple-400' htmlFor="comment">Comments : </label>
                        <textarea type="text" onChange={(e)=>setComment(e.target.value)} name="comment" cols="10" rows="3" className='border-2 px-2 py-2 w-[550px] rounded-md'></textarea>
                    </div>
                    <button type='submit' className='bg-purple-500 px-3 py-2 rounded-lg hover:bg-purple-600 hover:text-white'>comment</button>
                </form>
                <div className="flex flex-col py-2">
                    {post?.comments?.map((comment,index) =><div key={index} className="border-b-2 border-purple-200 py-3">
                    <div className='py-2'>
                        <div className='flex justify-start gap-3 py-3'>
                            <img 
                                className='w-12 h-12 border-2 border-purple-600 rounded-full' 
                                src={profile + post?.user?.profileImg}  
                                alt="" 
                            />
                            <span>
                                <h4 className='font-bold text-purple-500'>{post?.user?.username}</h4>
                                <h5 className='font-bold text-gray-800'>{moment.utc(comment.date).local().startOf('seconds').fromNow()}</h5>
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <p>{comment.comments}</p>
                        </div>
                    </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Comments;