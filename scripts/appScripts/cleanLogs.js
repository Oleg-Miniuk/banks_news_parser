const empty = require('empty-folder');
const path = require('path');

empty(path.join(__dirname, '../../logs'), false, (o) => {
  if (o.error) console.error(o.error);
});
