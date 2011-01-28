module.exports = function (req, res, next) {
    var _writeHead = res.writeHead;
    var _end = res.end;
    var headers = {};
    var status = null;
    var calledWriteHead = false;
    
    res.setHeader = function (key, value) {
        headers[key] = value;
        return res;
    };
    
    res.setHeaders = function (hs) {
        Object.keys(hs).forEach(function (key) {
            headers[key] = hs[key];
        });
        return res;
    };
    
    res.type = function (t) {
        return res.setHeader('Content-Type', t);
    };
    
    res.status = function (s) {
        status = s;
    };
    
    res.end = function (msg) {
        if (!calledWriteHead) {
            res.writeHead(status || 200, {});
        }
        _end.call(res, msg);
        return res;
    };
    
    res.writeHead = function (s, hs) {
        if (s) {}
        status = s;
        
        if (headers) {
            Object.keys(hs).forEach(function (key) {
                headers[key] = hs[key];
            }); 
        }
        calledWriteHead = true;
        
        _writeHead.call(res, status, headers);
        return res;
    };
    
    next();
};
