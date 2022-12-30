import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    return (
        <>
            <h1 className='font-bold text-xl text-purple-500 py-3'>Blog Categories</h1>
            <ul className='flex flex-col gap-2'>
                <li><Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-2 rounded-lg w-full block'>Music</Link></li>
                <li><Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-2 rounded-lg w-full block'>Sports</Link></li>
                <li><Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-2 rounded-lg w-full block'>Health</Link></li>
                <li><Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-2 rounded-lg w-full block'>LifeStyle</Link></li>
                <li><Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-2 rounded-lg w-full block'>Celebraty</Link></li>
                <li><Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-2 rounded-lg w-full block'>Food</Link></li>
                <li><Link to='/' className='bg-purple-500 hover:bg-purple-400 hover:text-white px-3 py-2 rounded-lg w-full block'>Current World</Link></li>
            </ul>
            
        </>
    );
};

export default Category;