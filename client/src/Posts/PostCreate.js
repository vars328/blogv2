import React, { useState } from 'react';
import axios from 'axios';

const PostsCreate = (props) => {
  const [title, setTitle] = useState('');
  //console.log('post create UserId is ' + props.userId);
  const onSubmit = async event => {
    event.preventDefault();
    console.log('post create UserId is ' + props.userId);


    await axios.post('http://localhost:4000/posts/create', {
      title,
      userId:props.userId
    });

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostsCreate
