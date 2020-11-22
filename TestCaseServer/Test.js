class Test{
constructor(){
  this.x =1;
  this.y =2;
}

toString(){
return 'x is:'+this.x+' y is:'+this.y;
}

print(){
 console.log(this.toString());
}
}

module.exports = Test