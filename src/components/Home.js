import React from 'react';
import ActiveUser from './ActiveUser';
import Blog from './Blog';
// import Category from './Category';
import Profile from './Profile';
import UserData from './SharedData/UserData';


const Home = () => {
    const {users} = UserData();

    return (
        <div className='container mx-auto px-10'>
            <div className='flex gap-5'>
                <div className='w-[25%] bg-purple-200 sticky top-0'> 
                    <Profile users={users} />
                </div>
                <div className='w-[50%]'> 
                    <Blog />
                </div>
                <div className='w-[25%] bg-purple-200 px-3 sticky top-0'> 
                    <ActiveUser />
                </div>
            </div>
        </div>
    );
};

export default Home;