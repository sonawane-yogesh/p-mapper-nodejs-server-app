const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.get("/api/status", function(req, res){
    res.send("App is running");
});

app.use("/api/*",
    proxy({
        target: "http://localhost:1002",
        pathRewrite: (path, req) => {
            return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
        }
    })
);
app.listen(80, () => {
    console.log('Proxy listening on port 80');
});