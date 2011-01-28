var connect = require('connect');
var webserver = connect.createServer();
webserver.use(require('resware'));

webserver.use(connect.cookieDecoder());
webserver.use(function (req, res, next) {
    if (!req.cookies.bizzle) {
        var rand = Math.random();
        res.setCookie('bizzle', rand);
        req.cookies.bizzle = rand;
    }
    next();
});

webserver.use(connect.router(function (app) {
    app.get('/', function (req, res) {
        res.writeHead(200, { 'Content-Type' : 'text/plain' });
        res.end('bizzle = ' + req.cookies.bizzle);
    });
}));

webserver.listen(9999);
console.log('Listening on 9999');
