http = require('http');
function ajaxPost(postData){
    // 用于请求的选项  
    var options = {  
        host: 'localhost',  
        port: '65531',  
        path: '',
        headers:{
            'withCredentials':false,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };  
    var promise = new Promise(function(resolve,reject){
    
            // 向服务端发送请求  
            var req = http.request(options, (response)=>{
            // 不断更新数据  
               var body = '';  
               response.on('data', function(data) {  
                  body += data;  
               });  
                 
               response.on('end', function() {  
                  // 数据接收完成  
                  console.log(body);  
                  resolve(body);
                   //res.end(body);//主server中的响应
               });  
            });  
            // 写入post请求主体参数,必须设置Content-Length为参数长度
            req.write(postData);
            req.end(); //end不能丢，是本次请求的。
            
    });
    return promise;
}

module.exports.ajaxPost = ajaxPost;
