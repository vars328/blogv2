const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const usersById = [];

const usersAuthtokens = [];

// need to add support for duplicate registration.
app.post('/user/register', async (req, res) => {
  const id = crypto.randomBytes(4).toString('hex');
  const { data } = req.body;

  //create a hash using the email+pwd and map it to the user Id.
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(data.email+'_'+data.password, salt,
    1000, 64, `sha512`).toString(`hex`);

  const userData = {
    "id" : id ,
    "email": data.email,
    "name": data.name,
    "hash":hash,
    "salt":salt
  }
  usersById.push(userData);
  console.log(usersById);
  res.status(201).send("success");
});

//Get a specific user from the authToken

app.get('/user', async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log('AuthHeader' + authHeader);

  let userIdByToken = null;
  let identifiedUser = null;

  usersAuthtokens.forEach((item, i) => {
    console.log(item.authToken);
    console.log(authHeader);
    if (String(item.authToken) === String(authHeader)) {

      userIdByToken = item.id;
    }// should also check for expiry

  });

  // loop through the user data and get the identified user based on ID
  usersById.forEach((item, i) => {
    console.log('Itemid' + item.id);
    console.log('UserIdbyToken' + userIdByToken)
    if(item.id === userIdByToken){
      console.log('match')
      identifiedUser = item;
    }
  });
  console.log(identifiedUser);
  res.status(200).send({identifiedUser});

})

app.post('/user/login', async (req, res) => {
  const { data } = req.body;
  let filteredUser = usersById.find(el => el.email === data.email); ;

  // usersById.forEach((item, i) => {
  //   if(item.email === data.email){
  //     filteredUser=item;
  //   }
  // });


  if(filteredUser == null ){
    res.status(201).send({error: "Login failed"});
  }
  //create a hash using the email+pwd and map it to the user Id.
  const salt = filteredUser.salt;
  const hash = crypto.pbkdf2Sync(data.email+'_'+data.password, salt,
    1000, 64, `sha512`).toString(`hex`);
  console.log('computed hash is '+ hash);
  console.log('filtered hash is ' + filteredUser.hash);
  if(String(hash) === String(filteredUser.hash)){
    console.log('Bingo!! ');
    //create a token for this user
    const authToken = crypto.randomBytes(16).toString('hex');
    const userToken= {
      "id" : filteredUser.id,
      "authToken": authToken
    }
    usersAuthtokens.push(userToken);


    res.status(201).send({authtoken: authToken,status: "successful login"});
  }

  else {
    res.status(201).send({
      error:"Login failed"
    });
  }

});

app.listen(4006, () => {
  console.log('Listening on 4006');
});
