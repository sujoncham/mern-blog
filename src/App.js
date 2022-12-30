import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import Header from "./components/Header";
import Home from './components/Home';
import Login from "./components/Login";
import Register from "./components/Register";
import UpdateBlog from "./components/UpdateBlog";
import UserBlog from "./components/UserBlog";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addBlog' element={<AddBlog />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/blog/:id' element={<BlogDetails />}></Route>
        <Route path='/userBlog/:updateId' element={<UpdateBlog />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/userBlog' element={<UserBlog />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
