import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetProfileImg = ({id}) => {
    const [profileImg, setProfileImg] = useState({})
    const profile = `https://mern-blog-server-uoiu.onrender.com/api/user/profileImgId/${id}`;
    console.log(profileImg)
    useEffect(()=>{
        const getData = async() =>{
            await axios.get(profile)
            .catch((err)=>console.log(err))
            .then((blob)=>{
                console.log(blob);
                const imageUrl = URL.createObjectURL(blob);

                setProfileImg({ imageUrl })
            })
        }
        getData();
    }, [profile])
    return (
        <>
        <img 
            className='w-full h-40 border-2 border-purple-500' 
            src={profileImg?.bannerImg} 
            alt="" 
            />
        <img 
            className='w-24 h-24 rounded-full border-2 border-purple-500 absolute left-[30%] bottom-0' 
            src={profileImg?.profileImg} 
            alt="" 
            />
            
        </>
    );
};

export default GetProfileImg;