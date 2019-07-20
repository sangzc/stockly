const express = require('express');

const app = express();


app.get('/login', function(req, res) {
  return res.send('hello world');
});

app.get('/signup', function(req, res) {
  return res.send('hello world');
});

app.get('/portfolio', function(req, res) {
  return res.send('hello world');
});

app.get('/transactions', function(req, res) {
  return res.send('hello world');
});

app.listen(3000, function(){
  console.log('App on port 3000');
}) 