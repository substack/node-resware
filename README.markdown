resware
=======

Hack an http.ServerResponse object to set headers piece-wise before writeHead().

Example
=======

First make a webapp and require the resware middleware:

    var connect = require('connect');
    var webserver = connect.createServer();
    webserver.use(require('resware'));

And then in your middleware you can do fun stuff like...
 
    webserver.use(connect.cookieDecoder());
    webserver.use(function (req, res, next) {
        if (!req.cookies.bizzle) {
            var rand = Math.random();
            res.setCookie('bizzle', rand);
            req.cookies.bizzle = rand;
        }
        next();
    });

and the headers you set in the middleware are magically wrapped
so it just works™!

    webserver.use(connect.router(function (app) {
        app.get('/', function (req, res) {
            res.writeHead(200, { 'Content-Type' : 'text/plain' });
            res.end('bizzle = ' + req.cookies.bizzle);
        });
    }));
    
    webserver.listen(9999);
    console.log('Listening on 9999');

Kudos
=====
Based heavily on Marak's [response project](http://github.com/marak/response).
