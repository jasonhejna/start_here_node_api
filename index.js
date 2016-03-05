// Vanilla node framework
// Create components by copying the example: test-component.

var http = require('http');

// Add components here!
const testComponent = require('./components/test-component/');


http.createServer(function(request, response) {
    var headers = request.headers;
    var method = request.method;
    var url = request.url;
    var body = [];
    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();

        console.log('body',body);
        console.log('url',url);

        var worked = true;
        var output = '';

        // Define component url, and entry method.
        switch (url) {
            case '/':
                worked = false;
                response.statusCode = 404;
                break;
            case '/test-component':
                output = testComponent.area(4);
                break;
            case '/test-component/speak':
                output = testComponent.speak(4);
                break;
        }

        response.on('error', function(err) {
            worked = false;
            response.statusCode = 500;
            console.error(err);
        });

        if (worked) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            // Note: the 2 lines above could be replaced with this next one:
            // response.writeHead(200, {'Content-Type': 'application/json'})
        }

        //var packedRequest = {
        //    headers: headers,
        //    method: method,
        //    url: url,
        //    body: body
        //};
        //console.log(packedRequest);

        response.end(JSON.stringify(output));

        // END
    });
}).listen(8080);