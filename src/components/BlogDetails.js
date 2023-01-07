import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import Profile from './Profile';
import UserData from './SharedData/UserData';

const BlogDetails = () => {
    const {id} = useParams();
    const {users} = UserData();
    console.log(users)
    const [detail, setDetail] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const post = detail?.data?.user;
    const profile = `http://localhost:5000/`;
   

    useEffect(()=>{
        const getData = async () =>{
            await axios.get(`http://localhost:5000/api/blog/${id}`)
            .catch((err)=>console.log(err))
            .then((data)=>{
                console.log(data)
                setDetail(data);
                setIsLoading(false)
            });
        }
        getData();
    }, [id]);

    if(isLoading){
        return <p>Loading...</p>
    }

    const handleLike =()=>{
        const getLike = async () =>{
            await axios.patch(`http://localhost:5000/api/blog/${id}/like`, {
                user: localStorage.getItem('userId')
            })
            .catch((err)=>console.log(err))
            .then((data)=>{
                console.log(data)
                console.log('successfull like')
            });
        }
        getLike();
    }
    
    return (
        <div className="container mx-auto px-24 py-10">
            <div className='flex gap-5'>
                <div className='w-[30%] bg-purple-200'> 
                    <Profile users={users} />
                </div>
                <div className='w-[70%]'> 
                    <div>
                        <img className='w-full h-[350px]' src={post?.image} alt="" />
                        <div className='flex justify-start gap-3 py-3'>
                            <img 
                                className='w-12 h-12 border-2 border-purple-600 rounded-full' 
                                src={profile + post?.user?.profileImg}  
                                alt="" 
                            />
                            <span>
                                <h1 className='font-bold text-purple-500'>{post?.user?.username}</h1>
                                <h1 className='font-bold text-gray-800'>{moment.utc(post?.date).local().startOf('seconds').fromNow()}</h1>
                            </span>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold text-purple-600'> {post?.title}</h1>
                            <p className='text-gray-800'>{post?.description}</p>
                        </div>
                        <div>
                            <div className="flex justify-start gap-3 mt-5">
                                <span className={( post?.likes?.length ? "text-purple-500 flex justify-start items-center" : "hidden" )}>{post?.likes?.length} <FaHeart /></span>
                                <button className={(post?.likes?.length ? "bg-purple-500 border-[1px] border-purple-300 p-1 rounded-lg":"")} onClick={()=>handleLike(id)} >{post?.likes?.length <= 1 ? "Like" : "Likes" }</button>
                            </div>
                        </div>
                    </div>
                    <Comments id={id} post={post} />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;