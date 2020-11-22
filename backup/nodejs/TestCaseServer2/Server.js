var http =require("http");
var ajaxUitl = require('./ajaxUitl');
var querystring = require("querystring");
    /*
     创建server
    */
    http.createServer(function(req,res){
       res.writeHead(200,{"Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*",
            'Access-Control-Allow-Methods':'POST',
            'Access-Control-Allow-Credentials':true
          });
          const postData = querystring.stringify({'msg' : 'Hello World!'}); 
          ajaxUitl.ajaxPost(postData).then(function(data){
                res.end(data);
           });
}).listen(65532);

console.log("server1 starting ...");