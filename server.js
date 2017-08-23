var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
 
   // if pathname contains “listings”, display formatted file data
   if( parsedUrl.pathname == '/listings' ){
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write(JSON.stringify(listingData));
   }

   // else, return 404 error
   else{
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('Bad gateway error');
   }

   response.end();
};

//create server
server = http.createServer(requestHandler);

//read file contents
fs.readFile('listings.json', 'utf8', function(err, data) {
  
  //save file data to listingData
  listingData = JSON.parse(data);

  //start server
  server.listen(port, function() {
    console.log('Server listening on: http://127.0.0.1:' + port);
  });
});

