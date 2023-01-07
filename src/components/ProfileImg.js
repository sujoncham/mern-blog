import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfileImg = () => {
    const {id} = useParams();
    const [bannerImg, setBannerImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);

    const handleBannerImageChange = (event) => {
        setBannerImg(event.target.files[0]);
    };

    const handleProfileImageChange = (event) => {
        setProfileImg(event.target.files[0]);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('bannerImg', bannerImg);
        formData.append('profileImg', profileImg);

        await axios.patch(`http://localhost:5000/api/user/profileImgUpdate/${id}`, formData).catch((err)=>console.log(err)).then((data)=>{
            console.log("successfull", data)
        });
    };
    return (
        <div className="bg-purple-300">
            <h1>{id}</h1>
            <div className="container mx-auto py-10 flex justify-center gap-10">
                <img className='w-[50%]' src="/images/banner.png" alt="" />
                <form className="w-[50%] bg-white shadow-lg px-10 py-5 rounded-md" onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="image">Profile Banner</label>
                        <input type="file" 
                        name='bannerImg'
                        onChange={handleBannerImageChange} />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="image">Profile Avatar</label>
                        <input type="file" 
                        name='profileImg'
                        onChange={handleProfileImageChange} />
                    </div>
                    <button type='submit' className='bg-red-500 px-2 py-2 rounded-md mt-5'>Add image</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileImg;