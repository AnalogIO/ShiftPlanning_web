const path = require('path');
const webpack = require('webpack');
const express = require('express');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config');

  const compiler = webpack(config);

  app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
  }));

  app.use(hotMiddleware(compiler));
}

app.use('/dist', express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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
