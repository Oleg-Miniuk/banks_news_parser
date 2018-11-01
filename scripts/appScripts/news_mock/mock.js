const staticModule = require('node-static');
const path = require('path');

const { mockPort } = require('../../../config/appConfig');

const publicPath = path.join(__dirname, 'public');
const file = new staticModule.Server(publicPath);

console.log(publicPath);

require('http')
  .createServer((request, response) => {
    request
      .addListener('end', () => {
        //
        // Serve files!
        //
        file.serve(request, response);
      })
      .resume();
  })
  .listen(mockPort, () => console.log(`server is on ${mockPort}'));
