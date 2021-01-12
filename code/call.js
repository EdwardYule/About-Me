// 传统的call用法是这样子的
var man = {
  name: "edward",
  say() {
    console.log(this.name)
  }
}
// man.say(); // "edward"
var woman = {
  name: "lucy"
}
// man.say.call(woman); // "lucy"

// 这时候我们来模拟一个call
Function.prototype.MyCall = function () {
  var args = [...arguments];
  var context = args.shift() || window;
  var fn = this;
  var fnKey = Symbol("fnKey");
  context[fnKey] = fn;
  context[fnKey](args);
  delete context[fnKey]
}

man.say.MyCall(woman); // "lucy"

/*
与网上的很多答案不同，我这里用了一个Symbol作为一个key值
因为我们并不知道我们传进来的对象中，究竟有哪些key，如果用了常规的字符串作为key
那么就存在覆盖掉原有值的风险

另外，这里实际上用了一个ES6的特性，展开运算符
如果是要写一个shim的话，用高级特性来模拟低级特性那是不允许的
所以严格来讲，这里实际上还需要一个将类数组转换为数组的方法
这个过于简单就不写了
*/