const express = require('express')

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const database = {
  users: [
    {
      id: 123,
      name: 'John',
      email: 'john@gmail.com',
      password: 'password',
      entries: 3,
      joined: new Date()
    },
    {
      id: 124,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send('working')
})

//signin route
app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && 
      req.body.password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error logging in')
  }
})

app.listen(3000, () => {
  console.log('listening')
})