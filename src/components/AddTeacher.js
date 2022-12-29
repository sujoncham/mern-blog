import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const InputUser = () => {
    const [fname, setFName] = useState("");
    const [position, setPosition] = useState("");

    const [file, setFile] = useState("");
  
    const history = useNavigate();
  
    const setdata = (e) => {
      const { value } = e.target;
      setFName(value);
    }
    const addPosition = (e) => {
      const { value } = e.target;
      setPosition(value);
    }
  
    const setimgfile = (e) => {
      setFile(e.target.files[0])
    }
  
    // adduser data
  
    const addUserData = async (e) => {
      e.preventDefault();
  
      var formData = new FormData();
      formData.append("photo", file);
      formData.append("fname", fname);
      formData.append("position", position);
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
  
      const res = await axios.post("http://localhost:5000/register", formData, config);
  
      if (res.data.status === 401 || !res.data) {
        console.log("errror")
      } else {
        console.log(res.data)
        history("/")
      }
    }
  
    return (
        <div className="container mx-auto py-10">
            <form className="w-96 shadow-lg px-4 py-5 rounded-md" onSubmit={addUserData} action="">
                <div className="flex flex-col mt-5">
                    <label htmlFor="fname">Full name</label>
                    <input type="text" name='fname' onChange={setdata} placeholder="full name" className='border-2 px-2 py-2 w-72 rounded-md' />
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="position">Designation</label>
                    <input type="text" name='position' onChange={addPosition} placeholder="designation" className='border-2 px-2 py-2 w-72 rounded-md' />
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="fname">Full name</label>
                    <input type="file" onChange={setimgfile} name='photo' placeholder="" className='border-2 px-2 py-2 w-72 rounded-md' />
                </div>
                <button className='bg-red-500 px-2 py-2 rounded-md mt-5'>create</button>
            </form>
        </div>
    );
};

export default InputUser;