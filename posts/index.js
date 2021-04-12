const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

//not needed.
// app.get('/posts', (req, res) => {
//   res.send(posts);
// });

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title,userId} = req.body;

  posts[id] = {
    id,
    title,
    postedBy:userId
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
      postedBy:userId
    }
  });
  console.log('Posts Data is'+ posts);
  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
