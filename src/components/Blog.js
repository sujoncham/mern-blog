import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [searched, setSearched] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const navigate = useNavigate();
    // console.log(blogs)

    useEffect(()=>{
        const getData = async()=>{
            await axios.get('http://localhost:5000/api/blog/blogsCount')
            .catch((err)=>console.log(err))
            .then(data=>{
                console.log(data)
                const count = data?.data?.count;
                const pages = Math.ceil(count/10)
                setPageCount(pages)
            });
        }
        getData()
    }, [])

  

     useEffect(()=>{
        const sendRequest = async()=>{
            await axios.get(`http://localhost:5000/api/blog?page=${page}&size=${size}`)
            .catch((err)=>console.log(err))
            .then((data)=>{
            setBlogs(data?.data);
            setSearched(data?.data);
        })
    }
    sendRequest()
     
}, [page, size]);



     const handleDetail = (id) =>{
        navigate(`/blog/${id}`)
     }

     

   const handleSearch = (e) =>{
    const textData = e.target.value;
      const filtered = blogs?.filter(blog => blog.title.toLowerCase().includes(textData.toLowerCase()));
      setSearched(filtered);
    }

    return (
        <div className='container mx-auto px-10'>
            <div className='py-10'>
                <input
                    type="text"
                    onChange={handleSearch}
                    className='border-2 border-purple-400 focus:border-purple-500 py-2 px-3 rounded-lg w-full'
                    placeholder='search your blog'
                />
                <h1 className='font-bold py-3 text-purple-400'>Search Result Blog - {searched?.data?.length}</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                {blogs && searched?.data?.map(blog=><div key={blog._id}>
                    <img className='w-full h-60' src={blog.image} alt="" />
                    <p className='font-bold pt-3 text-purple-400'>{blog?.user?.username} - </p>
                     <p className='text-purple-400 text-[14px]'>{moment.utc(blog?.date).local().startOf('seconds').fromNow()}</p>
                    <h1 className='font-bold text-xl text-purple-500'>{blog.title}</h1>
                    <p>{blog.description.slice(0, 140)}...</p>
                    <div>
                        <button onClick={()=>handleDetail(blog._id)} className='px-2 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-400 hover:text-white'>read more</button>
                    </div>
                </div>)}
                <div className='w-full'>
                    {
                        [...Array(pageCount).keys()].map((number, index)=><button 
                            key={index}
                            onClick={()=>setPage(number)}
                            className={(page === number ? "bg-purple-300 border-2 border-purple-500 px-2 py-1 ml-1":"border-2 border-purple-500 px-2 py-1 ml-1")}
                            >
                                {number}
                            </button>)
                    }
                    {size}
                    <select onChange={(e)=>setSize(e.target.value)}>
                        <option value="10" defaultValue>10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Blog;