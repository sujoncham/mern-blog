import { useQuery } from '@tanstack/react-query';

const UserData = () => {
    const id = localStorage.getItem('userId');
  
    const { isLoading, error, data } = useQuery({
        queryKey: ['userLogin', id],
        queryFn: () =>
          fetch(`https://mern-blog-server-uoiu.onrender.com/api/user/profile/${id}`).then(
            (res) => res.json(),
          ),
        })

        if (isLoading) return 'Loading...'
 
        if (error) return 'An error has occurred: ' + error.message;
  
    return {
        users:data,
    };
  };

export default UserData;