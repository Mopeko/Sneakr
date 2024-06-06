const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
const cors = require('cors');
app.use(cors());
const Account = require('./Account.json');
const admin = require('./admin.json');


app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const account = Account.find(acc => acc.user === username && acc.password === password);
  
  if (account) {
    const { password, ...accountWithoutPassword } = account;
    res.json({ success: true, account: accountWithoutPassword });
  } else {
    res.json({ success: false });
  }
});

app.get('/wishlist', (req, res) => {
  res.json(admin.sneakers);
});

app.post('/addsneaker', (req, res) => {
  const sneaker = req.body;
  admin.sneakers.push(sneaker);
  res.status(201).json(sneaker);
});

app.delete('/wishlist/:id', (req, res) => {
  const { id } = req.params;
  const index = admin.sneakers.findIndex(sneaker => sneaker.id == id);

  if (index !== -1) {
      admin.sneakers.splice(index, 1);
      res.json({ success: true });
  } else {
      res.status(404).json({ success: false, message: 'Sneaker not found' });
  }
});


app.listen(5000, () => console.log('Server listening on port 5000'));