exports = module.exports = function (req, res, next) {
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
    
    res.setCookie = function (key, value, opts) {
        // opts: Expires, Max-Age, Path, Secure, Version, Domain, Comment
        opts = opts || {};
        
        res.setHeader('Set-Cookie',
            escape(key) + '=' + escape(value)
            + Object.keys(opts)
                .map(function (k) {
                    if (opts[k] === true)
                        return escape(k)
                    else if (opts[k] === false)
                        return undefined
                    else 
                        return escape(k) + '=' + escape(opts[k])
                })
                .filter(function (x) { return x !== undefined })
                .join('; ')
        );
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

exports.wrap = function (res) {
    exports({}, res, function () {});
    return res;
};
