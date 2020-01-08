const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'password',
      entries: 3,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

//signin route
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
});

//register route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, null, null, (err, hash) => {
    console.log(hash)
  })
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

//user route
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
});

//
app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries ++
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
})

app.listen(3001, () => {
  console.log('listening');
});
