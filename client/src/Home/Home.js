import React, { useState, useEffect }  from 'react';
import PostCreate from '../Posts/PostCreate';
import PostList from '../Posts/PostList';
import axios from "axios";
import { useHistory} from "react-router-dom";

const Home = () => {
  const history = useHistory();

//get the logged in user auth token from the browser local storage
//and then get the user Id from the user service to pass to create post
const [user, setUser] = useState({});

useEffect(() => {
    fetchUser()
}, []);

const logout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    if (toLogout) {
      sessionStorage.removeItem('authtoken');
      history.push("/login");
    }
  };

const profile = () =>{
  alert('Under development');
}

const fetchUser = () => {
  //make a get call to user servuce which will validate the token and return the user
  //associated with the token

  axios.get(`http://localhost:4006/user/`,{
    headers :{
      'Authorization' : window.sessionStorage.getItem('authtoken')
    }
  })
  .then((response) => {

     setUser(response.data.identifiedUser);
  })
  .catch((error)=>{
    console.error(error);
  })
};



  return (
    <div className="container">
    <nav className = "navbar navbar-default" role = "navigation">

   <div className = "navbar-header">
      <a className = "navbar-brand" href = "#">Welcome {user.name}</a>
   </div>

   <div>
      <ul className = "nav navbar-nav">
         <li className = "active"><a href = "#" onClick = {profile}>Profile</a></li>
         <li><a href = "#" onClick = {logout}>Logout</a></li>


      </ul>
   </div>
</nav>
      <h1>Create Post!!!</h1>
      <PostCreate userId={user.id}/>
      <hr />
      <h1>Posts</h1>
      <PostList userId={user.id}/>
    </div>

  );
};
export default Home;
