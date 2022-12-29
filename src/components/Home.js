import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <div className='container mx-auto px-16'>
            <div className='flex justify-between items-center'>
                
                <Link to='/addTeacher'>Add Teacher</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                
            </div>
        </div>
    );
};

export default Home;