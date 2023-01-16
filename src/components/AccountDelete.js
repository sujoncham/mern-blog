import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AccountDelete = () => {
    const navigate = useNavigate()  
    const {id} = useParams()

    const handleDeleteAccount = async(id)=>{
        const delConfirm = window.confirm('are you sure to delete this User?');
        if(delConfirm){
            await axios.delete(`http://localhost:5000/api/user/profile/deleteAccount/${id}`)
            .then(()=>{
                localStorage.removeItem("userId")
                navigate('/login')
            })
            .catch((err)=>console.log(err))
        }
    }
    return (
        <div className='container mx-auto px-10 flex justify-center items-center py-10'>
            <div className='w-[650px] border-2 border-purple-600 p-5 rounded-md'>
                <h1 className='text-2xl font-bold border-b-2'>User Account Setting</h1>
                <h4 className='font-bold py-5'>User Name : {localStorage.getItem("username")}</h4>
                <h4 className='font-bold pb-10'>User Email : {localStorage.getItem("userEmail")}</h4>
                <div className='flex justify-between items-center border-t-2 py-2'>
                    <span>Account Delete</span>
                    <button onClick={()=>handleDeleteAccount(id)} className='bg-purple-400 py-2 px-3 rounded-md'>confirm delete</button>
                </div>
            </div>
        </div>
    );
};

export default AccountDelete;