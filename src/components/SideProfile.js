import React from 'react';

const SideProfile = ({users}) => {
    const profile = `http://localhost:5000/`;
    return (
        <>
            <div className='relative'>
                <img 
                    className='w-full h-40 border-2 border-purple-500' 
                    src={profile + users?.user?.bannerImg} 
                    alt="" 
                />
                <img 
                    className='w-24 h-24 rounded-full border-2 border-purple-500 absolute left-[30%] bottom-0' 
                    src={profile + users?.user?.profileImg} 
                    alt="" 
                    />
            </div>
            <div className='px-3 py-10'>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Username:</h4>
                    <p>{users?.user?.username}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>User Email:</h4>
                    <p className='text-[13px]'>{users?.user?.email}</p>
                </div>
                
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>About Me:</h4>
                    <p>{users?.user?.description}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Hobby:</h4>
                    <p>{users?.user?.hobby}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Vision:</h4>
                    <p>{users?.user?.vision}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Address: </h4>
                    <p>{users?.user?.address}</p>
                </div>
                <div className='bg-purple-100 px-2 py-2 mt-1'>
                    <h4 className='font-bold text-purple-500'>Phone: </h4>
                    <p>{users?.user?.phone}</p>
                </div>
                
            </div> 
        </>
    );
};

export default SideProfile;