import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from '../Comments/CommentCreate';
import CommentList from '../Comments/CommentList';

const PostList= (props) => {
  const [posts, setPosts] = useState({});
  const userIdToFetchPosts = props.userId;

  const fetchPosts = (userIdToFetchPosts) => {
    console.log('userId in post list'+userIdToFetchPosts );

    const res = axios.get('http://localhost:4002/posts',
    {
      headers :{
        'Authorization' : window.sessionStorage.getItem('authtoken')
      },

      params: {
        userId : userIdToFetchPosts,
        followers:'1233' // placeholder
      }

    }


  ).then((response) => {
     console.log('posts by user' + JSON.stringify(response.data));
     setPosts(response.data);
  })
  .catch((error)=>{
    console.error(error);
  });

  };

  useEffect(() => {
    console.log('useeffect' + userIdToFetchPosts);
      fetchPosts(userIdToFetchPosts)
    //},9000);
  //  return () => clearInterval(id);
}, [props.userId]);


if(posts)
  console.log('postslength' + Object.values(posts).length);

  const renderedPosts = posts && Object.values(posts).length >0 && Object.values(posts).map(post => {
      return (

        <div
          className="card"
          style={{ width: '30%', marginBottom: '20px' }}
          key={post.id}
        >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
        </div>
      );

  });


  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">

      {renderedPosts}
    </div>
  );
};

export default PostList
