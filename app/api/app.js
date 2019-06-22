'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing
const routingPath = '/api/v1';

var config = {
  appRoot: __dirname // required config
};

app.get('/', (_, res) => {
  res.redirect(routingPath);
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log(`server started on PORT ${port}`);
});
