var mysql  = require('mysql');  //调用MySQL模块 
var testnum =100;

//设置模块类变量,nodejs工具类中不要使用es6的class
var pool = mysql.createPool({
            connectionLimit: 10,
            host: '127.0.0.1',
            user: 'root',
            password: 'wbb12345',
            database: 'world'
          });

/**
*使用es6类合
**/

/**
 * 获取一个连接池链接
**/ 
    function getConnection(){ 
            let promise = new Promise(function(resolve,reject){
            pool.getConnection(function(err, connection) {
                     if(err){
                        console.log('reject');
                        reject(err);
                     }
                     console.log('resolve');
                    resolve(connection)
                });
             }).catch(function(err){
                console.log('error:'+err);
             })
       return promise;
    } 

    /**
    *输入为sql语句，输出为操作数据库的结构
    *sqlState sql数据
    * param 为模板参数
    **/
  function excuteSql(sql,param){
      let promise = new Promise(function(resovle,reject){
                    getConnection().then(function(connection){
                       connection.query(sql, param,function(err, rows, fields) {
                                            if(err){
                                              reject(err);
                                            }
                                            resovle(rows);
                                    });
                              }).catch(function(err){
                                console.log('error: '+err);
                             });
       });

     return promise;
}


module.exports.excuteSql = excuteSql; 