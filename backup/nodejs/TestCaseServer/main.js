
let MySqlPool = require('./mysqlPool/mysqlpool')
let pool =new MySqlPool();

pool.getConnection().then(function(connection){
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
            });


}).catch(function(err){
console.log('err1'+err);
})



