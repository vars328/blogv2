const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = [];

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title, postedBy } = data;

    posts.push({ id, title, postedBy, comments: [] });
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    console.log('comment from event publish' + JSON.stringify(data) + 'Posts are ' + JSON.stringify(posts));
    let post = posts.find(el => el.id === postId);
    //const post = posts[postId];
    console.log('Matched post for comment' + JSON.stringify(post))
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    let post = posts.find(el => el.id === postId);
    console.log('Matcged postId' + JSON.stringify(post))
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  //fetch the posts that belong to the user and his followers and send back

  const authToken = req.headers.authorization
  //check if the token is valid still
  console.log('Body in query' + JSON.stringify(req.query));
  const {userId} = req.query;

  console.log('userId is ' + req.query.userId);

  let  postsForuser = [];

  posts.forEach((item, i) => {
    console.log('postedbyitem Id' + item.postedBy);
    if(String(item.postedBy) === String(userId) ){
      console.log('post match')
      postsForuser.push(item);
    }
  });

  res.send(postsForuser);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  const res = await axios.get('http://localhost:4005/events');

  for (let event of res.data) {
    console.log('Processing event:', event.type);

    handleEvent(event.type, event.data);
  }
});
