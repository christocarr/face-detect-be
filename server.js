const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'face_detect',
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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
    console.log(hash);
  });
  db('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json('Unable to register'));
});

//user route
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id: id })
    .then(user => res.json(user[0]));
  // if (!found) {
  //   res.status(400).json('not found');
  // }
});

//
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
});

app.listen(3001, () => {
  console.log('listening');
});
