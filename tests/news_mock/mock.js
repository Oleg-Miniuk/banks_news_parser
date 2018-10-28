var static = require('node-static');
const path = require('path');

var publicPath = path.join(__dirname, 'public');
var file = new static.Server(publicPath);

console.log(publicPath);

require('http')
  .createServer(function(request, response) {
    request
      .addListener('end', function() {
        //
        // Serve files!
        //
        file.serve(request, response);
      })
      .resume();
  })
  .listen(1320, () => console.log('server is on 1320'));
