const querystring = require('querystring');
const https  = require('https');

const query = querystring.stringify({
  input : `
  .back-to-top {
      position: fixed;
      display: none;
      right: 30px;
      bottom: 30px;
      z-index: 99;
  }`,
});

const req = https.request(
  {
    method   : 'POST',
    hostname : 'www.toptal.com',
    path     : '/developers/cssminifier/api/raw',
  },
  function(resp) {
    // if the statusCode isn't what we expect, get out of here
    if ( resp.statusCode !== 200 ) {
      console.log('StatusCode=' + resp.statusCode);
      return;
    }

    resp.pipe(process.stdout);
  }
);
req.on('error', function(err) {
  throw err;
});
req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
req.setHeader('Content-Length', query.length);
req.end(query, 'utf8');