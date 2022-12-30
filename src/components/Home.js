import React from 'react';
import Blog from './Blog';
import Category from './Category';
import Profile from './Profile';


const Home = () => {

    return (
        <div className='container mx-auto px-10'>
            <div className='flex gap-5'>
                <div className='w-[20%] bg-purple-200'> 
                    <Profile />
                </div>
                <div className='w-[60%]'> 
                    <Blog />
                </div>
                <div className='w-[20%] bg-purple-200 px-3'> 
                    <Category />
                </div>
            </div>
        </div>
    );
};

export default Home;