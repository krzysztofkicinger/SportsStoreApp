/**
 * Created by Krzysztof Kicinger on 2015-03-18.
 */
var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();
app.use(serveStatic(".."));
app.listen(5000);