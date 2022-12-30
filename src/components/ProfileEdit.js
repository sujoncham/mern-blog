import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfileEdit = () => {
 

    const [inputs, setInputs] = useState({
        username: "", 
        email: "", 
        description: "", 
        address: "", 
        phone: "", 
        hobby: "", 
        vision: "", 
    });

    const [detail, setDetail] = useState();
    const {id} = useParams();
    console.log(detail)

    const handleChange = (e)=>{
        setInputs((prevState)=>({
           ...prevState,
           [e.target.name] : e.target.value,
        }))
    }

    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(`http://localhost:5000/api/user/profile/${id}`).catch((err)=>console.log(err));
            const data = await res.data;
            setDetail(data);
            setInputs({
                username:data?.user?.username,
                email:data?.user?.email,
                address:data?.user?.address,
                phone:data?.user?.phone,
                hobby:data?.user?.hobby,
                description:data?.user?.description,
                vision:data?.user?.vision,
            })
        }
        getData();
    }, [id]);
    console.log(detail);

    const getData = async () =>{
        const res = await axios.patch(`http://localhost:5000/api/user/profileUpdate/${id}`, {
            username:inputs.username,
            email:inputs.email,
            description:inputs.description,
            address:inputs.address,
            phone:inputs.phone,
            hobby:inputs.hobby,
            vision:inputs.vision,
        }).catch((err)=>console.log(err));
        const data = await res.data;
        return data;
    }
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        getData().then(data=>{
            console.log(data)
        });
     }

    return (
        <div className="bg-purple-300">
            <h1>{id}</h1>
            <div className="container mx-auto py-10 flex justify-center gap-10">
               <img className='w-[50%]' src="/images/banner.png" alt="" />
               <form className="w-[50%] bg-white shadow-lg px-10 py-5 rounded-md" onSubmit={handleSubmit} action="">
                    <div className="flex flex-col mt-5">
                        <label htmlFor="username">username</label>
                        <input type="text" 
                        name='username' 
                        value={inputs.username}
                        onChange={handleChange}
                        className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="email">email</label>
                        <input type="text" 
                        name='email' 
                        value={inputs.email}
                        onChange={handleChange}
                        className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                
                    <div className="flex flex-col mt-5">
                        <label htmlFor="description">description</label>
                        <textarea type="text" 
                        name='description'  
                        value={inputs.description}
                        onChange={handleChange}
                        className='border-2 px-2 py-2 w-full rounded-md'></textarea>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="hobby">hobby</label>
                        <input type="text" 
                        name='hobby' 
                        value={inputs.hobby}
                        onChange={handleChange}
                        className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="vision">vision</label>
                        <input type="text" 
                        name='vision'  
                        value={inputs.vision}
                        onChange={handleChange}
                        className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="address">address</label>
                        <input type="text" 
                        name='address' 
                        value={inputs.address}
                        onChange={handleChange}
                        className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="phone">phone</label>
                        <input type="text" 
                        name='phone'  
                        value={inputs.phone}
                        onChange={handleChange}
                        className='border-2 px-2 py-2 w-full rounded-md' />
                    </div>
                    {/* <div className="flex flex-col mt-5">
                        <label htmlFor="image">Profile Img</label>
                        <input type="file" 
                        name='image' 
                        value={user.image}
                        onChange={(e) => setProfile({ ...profile, image: e.target.files[0] })}
                        />
                    </div> */}
                
                  <button type='submit' className='bg-red-500 px-2 py-2 rounded-md mt-5'>create blog</button>
               </form>
            </div>
         </div>
    );
};

export default ProfileEdit;