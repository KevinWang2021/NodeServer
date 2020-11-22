 var http =require("http");

let mysqlpool = require('./mysqlPool/mysqlpool')

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


            var sqlStatement1 = 'update baseinfo  set age = ? where name =?';
            var paramArr1 = [15,'zhangmin'];

            var sqlStatement = 'SELECT * FROM baseinfo where name =?';
            var paramArr = ['zhangmin'];
            //更新和查询的链式调用，这样mysql语句可以写在配置文件中
              mysqlpool.excuteSql(sqlStatement1,paramArr1).then(function(rows){
                                  console.log('update success');
                                  //异步查询
                                return mysqlpool.excuteSql(sqlStatement,paramArr);
                        }).then(function(rows){ //查询回到，这个then是第一个then回调返回的promise对象的回调
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
                                            res.end(json);
                                }).catch(function(err){
                          console.log('error2: '+err);
                        });
}).listen(65531);

console.log("server starting ...");