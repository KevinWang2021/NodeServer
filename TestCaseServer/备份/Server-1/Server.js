 var http =require("http");
 // var SQLUtil =require("./mysqlPool/sqlUtil")
 // var sqlUtil = new SQLUtil();//使用连接池实现一个sql全局工具
var mysql  = require('mysql');  //调用MySQL模块 


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

        //mysql链接关闭后需要重新创建
        var connecion = mysql.createConnection({     
                host: '127.0.0.1',       //主机 
                user: 'root',               //MySQL认证用户名 
                password: 'wbb12345',        //MySQL认证用户密码 
                database: 'wbbtest', //数据库
                port: '3306'                   //端口号 
            }); 

        connecion.connect(function(err){
            if(err)
            {
                console.log("err info:"+err);
                return;
            }
            console.log("connection ok");
        });

    var sql = "select * from baseinfo"; //可以使用参数化查询
    var param = ['wbb'];
    connecion.query(sql,param,function(err,rows,fileds){
        if(err){
            console.log('select err'+err);
            return;
        }
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
        //关闭mysql
        connecion.end(function(err){
        if(err)
        {
            cosole.log("connect mysql err info:"+err);
            return;
        }
        console.log("close mysql ok");

          res.end(JSON.stringify(json)); //返回本次请求数据
    });
    });

}).listen(65531);

console.log("server starting ...");