const express = require('express');

const app = express();

app.get('*', (req, res) => {
  res.send('Site coming soon!');
});

const port = process.env.PORT || 3000;
app.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${port}/`);
});

process.on('SIGINT', () => {
  console.log('I am going down now!');
  process.exit(0);
});
