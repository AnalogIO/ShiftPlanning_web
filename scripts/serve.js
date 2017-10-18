const path = require('path');
const serve = require('serve');

const server = serve(path.resolve(__dirname, '..', 'build'), {
  port: process.env.PORT || 13337,
  ignore: ['node_modules'],
});
