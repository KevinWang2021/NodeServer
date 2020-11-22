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
            var paramArr1 = [14,'wbb'];

              mysqlpool.excuteSql(sqlStatement1,paramArr1).then(function(rows){
                                  console.log('ok update')
                        }).catch(function(err){
                          console.log('error2: '+err);
                        });

            var sqlStatement = 'SELECT * FROM baseinfo where name =?';
            var paramArr = ['wbb'];

            mysqlpool.excuteSql(sqlStatement,paramArr).then(function(rows){
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