import axios from "axios";

export const getFollow = async (id) =>{
    console.log(id)
    await axios.patch(`https://mern-blog-server-uoiu.onrender.com/api/user/profile/${id}/follow`, {
        userId: localStorage.getItem('userId')
    })
    .catch((err)=>console.log(err))
    .then((data)=>{
        console.log(data)
        console.log('successfull follow')
    });
}
export const getUnfollow = async (id) =>{
    await axios.patch(`https://mern-blog-server-uoiu.onrender.com/api/user/profile/${id}/unFollow`, {
        userId: localStorage.getItem('userId')
    })
    .catch((err)=>console.log(err))
    .then((data)=>{
        console.log(data)
        console.log('successfull follow')
    });
}