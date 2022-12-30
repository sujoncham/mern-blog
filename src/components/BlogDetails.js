import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const {id} = useParams();
    const [detail, setDetail] = useState({})
    const [comments, setComments] = useState({})
    console.log(detail.user)
    console.log("comments - ", comments)

    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err)=>console.log(err));
            const data = await res.data;
            setDetail(data);
        }
        getData();
    }, [id]);


    useEffect(()=>{
        const getComment = async () =>{
            const res = await axios.get(`http://localhost:5000/api/comment/`).catch((err)=>console.log(err));
            const data = await res.data;
            setComments(data);
        }
        getComment();
    }, [id]);
    

    const [inputs, setInputs] = useState({
        comment: "",
    });
    
     const handleChange = (e)=>{
        setInputs((prevState)=>({
           ...prevState,
           [e.target.name] : e.target.value,
        }))
    }
  
     const sendRequest = async()=>{
        const res = await axios.post('http://localhost:5000/api/comment/createComment', {
           comment: inputs.comment,
           username: localStorage.getItem('username'),
         }).catch((err)=>{
             console.log(err)
         })
        const data = await res.data;
        return data;
     }
  
     const hangleComment =(e)=>{
        e.preventDefault();
        console.log(inputs)
        sendRequest().then((data)=>{
           console.log(data);
           console.log('comment created successfull');
        //    e.target.reset();
        })
     }
    
    return (
        <div className="container mx-auto px-24 py-10">
            <div>
                <img className='w-full h-[350px]' src={detail?.user?.image} alt="" />
                <div className='flex justify-start gap-3'>
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
            <div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="comment">like</label>
                    
                </div>
            </div>
            <div>
                <form onSubmit={hangleComment}>
                    <div className="flex flex-col mt-5 mb-2">
                        <label className='font-bold' htmlFor="comment">Comments : </label>
                        <textarea type="text" onChange={handleChange} name="comment" cols="10" rows="3" className='border-2 px-2 py-2 w-[550px] rounded-md'></textarea>
                    </div>
                    <button type='submit' className='bg-purple-500 px-3 py-2 rounded-lg hover:bg-purple-600 hover:text-white'>comment</button>
                </form>
                <div className="flex flex-col mt-5 border-t-2 border-gray-500 py-2">
                    {comments && comments?.data?.map(comment =><div key={comment._id}>
                    <div className='flex justify-start gap-3'>
                        <img className='w-12 h-12 border-4 border-purple-600 rounded-full' src="/images/banner.png" alt="" />
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

export default BlogDetails;