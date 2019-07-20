const express = require('express');

const app = express();

app.get('/', function(request, response) {
  return response.send('hello world');
});

app.listen(3000, function(){
  console.log('App on port 3000');
}) 