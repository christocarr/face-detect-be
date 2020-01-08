const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: 123,
      name: 'John',
      email: 'john@gmail.com',
      password: 'password',
      entries: 3,
      joined: new Date(),
    },
    {
      id: 124,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
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
  database.users.push({
    id: 125,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

//user route
app.get('profile/:id', (req, res) => {
  const { id } = req.params;
  database.users.forEach(user => {
    if (user.id === id) {
      res.json(user);
    } else {
      res.status(404).json('No such user');
    }
  });
});

app.listen(3000, () => {
  console.log('listening');
});
