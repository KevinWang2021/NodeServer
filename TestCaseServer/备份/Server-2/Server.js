 var http =require("http");
 // var SQLUtil =require("./mysqlPool/sqlUtil")
 // var sqlUtil = new SQLUtil();//使用连接池实现一个sql全局工具
var mysql  = require('mysql');  //调用MySQL模块 

  var pool = mysql.createPool({
            connectionLimit: 10,
            host: '127.0.0.1',
            user: 'root',
            password: 'wbb12345',
            database: 'wbbtest'
        });
    /*
     创建server
    */
    http.createServer(function(req,res){
       
        res.writeHead(200,{"Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*",//
            'Access-Control-Allow-Methods':'POST',
           // 'Access-Control-Allow-Headers':'x-requested-with,content-type',
            'Access-Control-Allow-Credentials':true
          });
        
        pool.getConnection(function(err, connection) {
            // 使用连接
            connection.query('SELECT * FROM baseinfo', function(err, rows, fields) {
                console.log(rows.length);
                // 释放连接
                connection.release();
                // 错误处理
                if (err) throw err;
               
                var arr=[];
               
                console.log("rows.length:"+rows.length);
                for(var i = 0;i<rows.length;i++)
                {
                     var tmp = {};
                    tmp.name = rows[i].name;
                    tmp.age = rows[i].age;
                    tmp.brief = rows[i].brief;
                    arr.push(tmp);
                }
                var  json =JSON.stringify({"data":arr});
                console.log(json);
                res.end(json)
            });
            
        });


}).listen(65531);

console.log("server starting ...");