import React, { useState } from 'react';
import axios from 'axios';

export default (props) => {
  const [title, setTitle] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    console.log('UserId is ' + props.id);
    await axios.post('http://localhost:4000/posts/create', {
      title
      props.id
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
