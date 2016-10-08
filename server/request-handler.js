var fs = require('fs');
var path = require('path');
var lineReader = require('readline');
var db = require('./db/index.js');

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var messages = [];

var getDate = function() {
  var time = new Date();
  return (('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2) + ':' + ('0' + time.getSeconds()).slice(-2) + ':' + ('0' + time.getMilliseconds()).slice(-2));
};

var requestHandler = function(request, response) {

  var saveMessages = function() {
    fs.writeFile('./messages.txt', JSON.stringify(messages), function() {});
  };

  var parseData = function(data) {
    messages = [];
    data.forEach(function(row) {
      var curMessage = {};
      curMessage.createdAt = row.time;
      curMessage.text = row.text;
      curMessage.username = row.username;
      curMessage.objectId = row.id;
      curMessage.roomname = row.room;
      messages.push(curMessage);
      //console.log('row = ' + JSON.stringify(row));
    });
  };

  var loadStaticFile = function(filePath) {
    var strFile = '';
    fs.readFile('./client/client' + filePath, 'binary', function read(err, data) {
      if (err) {
        return;
      }
      strFile = data;
      if (filePath.endsWith('.gif')) {
        response.writeHead(200, {'Content-Type': 'image/gif'});
      }
      response.end(strFile, 'binary');
    });
    return;
  };

  if (request.url.endsWith('.js') || request.url.endsWith('.gif') || request.url.endsWith('.css')) {
    loadStaticFile(request.url);
    return;
  }

  if (request.url === '/' || request.url.includes('?username=')) {
    loadStaticFile('/index.html');
    return;
  } else {

    var statusCode = 200;

    var defaultCorsHeaders = {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': 10 // Seconds.
    };
    
    var headers = defaultCorsHeaders;

    headers['Content-Type'] = 'application/json';

    if (request.method === 'POST') {
      statusCode = 201;
    } else if (request.method === 'GET' && (request.url.split('?')[0] !== '/classes/messages')) {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end();
    }

    response.writeHead(statusCode, headers);
    
    var options = {'order': '-createdAt', 'statusCode': 200, 'ended': true};
    
    if (request.method === 'OPTIONS') {
    } else if (request.method === 'GET') {

      db.query('select * from messages', function(err, rows) {
        if (err) {
          throw err;
        } else {
          //console.log('Inside Request Handler. Received data: ', rows);
          parseData(rows);
        }
      });

      //loadMessages();
      if (options.order === undefined) {
        options.results = messages;
      } else if (options.order = '-createdAt') {
        options.results = messages.sort(function(a, b) {
          if (a.objectId > b.objectId) {
            return -1;
          } else {
            return 1;
          }
        });
      }
      
    } else if (request.method === 'POST') {
      options['statusCode'] = 201;
      response.statusCode = 201;
      var body = '';
      request.on('data', function (data) {
        body += data;
      });

      request.on('end', function(data) {
        var post = JSON.parse(body);
        console.log('post = ' + JSON.stringify(post));
        
        db.query('insert into messages (id, text, username, time, room) values (?, ?, ?, ?, ?)', [messages.length + 1, post.text, post.username, getDate(), post.roomname], function(err, result) {
          if (err) {
            throw err;
          } else {
            console.log('Insert Successful');
            console.log('result = ' + JSON.stringify(result));
            //console.log('Inside Request Handler. Received data: ', rows);
            //parseData(rows);
            db.query('select * from messages', function(err, rows) {
              if (err) {
                throw err;
              } else {
                parseData(rows);
                options['results'] = messages;
                response.end(JSON.stringify(options));
              }
            });
          }
        });
        

        


      
      });
    }

    if (request.method !== 'POST') {
      response.end(JSON.stringify(options));
    }
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
module.exports.requestHandler = requestHandler;
