# this详解

## 概要

this是一个神奇的东西，学了忘，忘了学，做个笔记，以后好复习

[这里我参考的是Mozilla的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

## this写在哪里

首先我们要明白this的意义。

this是什么呢？
this指的是当前的执行环境。
这句话怎么理解呢？

在js当中，作用域有两种，全局作用域与函数作用域。

* 当我们在全局作用域中，写下了this，那么this就是在全局的环境中执行，this就是全局对象，也就是window/globalThis。
* 当我们在函数作用域中写下this的时候，那么这个this在哪里执行呢？这就取决于这个函数在哪里执行了。函数可以在全局执行，也可以在别的函数内部执行，也可以作为某个对象的方法执行。

## 从函数中的this谈起

重点就是当this在函数中的时候，this指向什么？

* 这里我们不考虑箭头函数，箭头函数的this与作用域外部的this一致。我们只考虑用function关键字声明的函数。

* 这里我们也不考虑严格模式下的调用，严格模式与混杂模式改变的是this的默认值，以及this可能的取值。严格模式下，this可以为任意值；混杂模式下，this必须是一个对象。

这里我们就必须来考察，函数可以在哪些地方调用了？

01. 在全局作用域直接调用
02. 在函数作用域直接调用
03. 作为对象的方法调用
04. 使用call、apply进行调用
05. 使用bind进行绑定后调用
06. 作为DOM元素的事件处理函数调用
07. 作为原型方法进行调用
08. 作为对象属性的getter/setter调用
09. 作为构造函数调用
10. 在setTimeout/setInterval中调用
11. 在Promise中调用

这里我们可以看到，js的函数实在是太灵活了，可以在几乎所有地方进行调用。这就导致了this的判断也变成了一个复杂的问题。

反观其他语言，像Java中同样存在this关键字，但我们从来没有听说Java程序员困扰于“this究竟是什么”这样一个问题。问题就在于，在Java当中，函数始终是作为对象的方法调用的，因此，this永远指向的就是那个实例。

实际上，js当中，this的原义也是如此。this的作用就是想要知道，函数究竟是由谁调用的，调用者是谁，或者说是谁拥有了这个函数。也有文章说，脱离了对象的方法，讨论this是没有意义的。我认为说得也有道理。毕竟一个方法如果不作为对象的方法来调用的话，我们写this的意义其实是不明的。

js的灵活，带来的既有方便，也有困扰。

所以接下来我们还是要来搞懂，各种环境下调用函数，this究竟指向什么？

## 分情况讨论

接下来我们分情况进行讨论，最后再做一个总结

01. 全局作用域直接调用

``` JavaScript
function fn() {
    console.log(this);
}
fn();
```

这里的this指向什么？window吗？对，但也不对。
严格来讲，这里的this指向默认值，严格模式下是undefined，混杂模式下是window或者globalThis。

02. 函数作用域直接调用

``` JavaScript
function foo() {
    function bar() {
        console.log(this);
    }
    bar();
}
foo();
```

同样的，这里指向默认值。

03. 作为对象的方法进行调用

``` JavaScript
var obj = {
    name: "edward",
    say: function() {
        console.log(this.name);
    }
}
obj.say(); // "edward"
```

这里的this，就体现出了this的原始含义了，就是指函数的调用者。

这里我们面试的时候经常会碰到一个陷阱：

``` JavaScript
var obj = {
    name: "edward",
    say: function() {
        console.log(this.name);
    }
}
var fn = obj.say;
fn();
```

这里会输出什么呢？

实际上这里会输出默认值。我们需要观察的是函数在哪里调用，而不是在哪里定义。这就相当于函数在全局作用域下调用是一样的。

04. 使用call、apply进行调用

``` JavaScript
var obj = {
    name: "edward"
}

function fn() {
    console.log(this);
}
fn.call(obj);
fn.apply(obj);
```

这里函数的this，通过call进行了绑定，显式地强制绑定为传入的对象了。

这里我们还需要说明的一点是，由于这里可以接收任意的参数，所以我们除了传入一个对象以外，其实还能传入其他的值，比如：

``` JavaScript
function fn() {
    console.log(this);
}
fn.call(1);
```

这里我们会得到什么呢？

答案有两种，根据模式不同而定。

在严格模式下，我们传进去什么值，就返回出来什么值。所以这里会得到1。

但是在混杂模式下，this的值必定为一个对象。因此，这里会得到1的包装对象，也就是new Number(1)。

05. 使用bind进行绑定后调用

``` JavaScript
var obj = {
    name: "edward"
}

function fn() {
    console.log(this);
}
let bindFn = fn.bind(obj);
bindFn();
obj.bindFn2 = fn.bind(window);
obj.bindFn2();
```

可以看到，bind与call/apply是类似的，只不过它返回的是一个函数，而不是立即调用。经过绑定后的函数，不管它是怎么调用的，其this的值都已经固定了。

call、apply、bind三者称为this的显式绑定。

06. 作为DOM元素的事件处理函数调用

``` html
<div id="1">click me</div>
```

``` JavaScript
let dom = document.getElementById("1");
dom.onclick = function() {
    console.log(this);
}
```

这里的this就指向这个dom元素。即使我们写成内联形式的也是如此。

其实这也可以理解成onclick作为dom对象的方法来调用。

07. 作为原型方法进行调用

``` JavaScript
var proto = {
    name: "proto",
    fn() {
        console.log(this);
    }
}
var instance = Object.create(proto);
instance.name = "instance";
instance.fn();
proto.fn();
```

可以看到，这里的this指向调用者。

08. 作为对象属性的getter/setter调用

``` JavaScript
var obj = {
    val: ""
};
Object.defineProperty(obj, "key", {
    get() {
        console.log(this);
        return this.val;
    },
    set(value) {
        console.log(this);
        this.val = value;
    }
});
obj.key;
obj.key = "4";
```

我们可以看到，这里的this指向的是定义属性的对象。

09. 作为构造函数调用

``` JavaScript
function Person(name) {
    this.name = name;
}
var edward = new Person("edward");
console.log(edward);
```

这个就老生常谈了，this指向的是实例。

10. 在setTimeout/setInterval中调用

``` JavaScript
setTimeout(function() {
    console.log(this);
}, 1);
setInterval(function() {
    console.log(this);
}, 1000);
```

在这里我们发现了一个有趣的事情：

在setTimeout/setInterval中，无论是不是严格模式，this的指向永远是全局。

这里我们不禁联想到了另外一个关键字eval。
让我们来试试eval中的this吧。

``` JavaScript
eval("console.log(this);");
```

这里eval的表现，就好像透明的。eval的作用域，就是当前的作用域。eval的this，就是当前环境的this。这一点又和setTimeout/setInterval不太一样。

11. 在Promise中调用

``` JavaScript
new Promise(function() {
    console.log(this);
});
```

在Promise中，函数内的this就是默认值。

## 总结

列举了这么多情况，让我们做一个总结。

怎么判断函数中this的指向呢？我认为按照以下四步来走：
1. 首先判断是否显式绑定，或者说手动的绑定，也就是call、apply、bind，如果有，this指向手动绑定的值。
这里需要注意的就是，严格模式下，this可以为任意值，混杂模式下，this必须为对象，如果不是对象，则会自动将值转换为包装对象。
2. 其次判断函数是否以构造函数来调用，是的话，this指向实例。
3. 第三判断函数是否作为某对象的方法调用，是的话则指向该对象。这里需要注意容易有陷阱，函数是可以传递的，如果不确定的话，可以将其改写为call的形式，更加一目了然。
4. 是否在setTimeout/setInterval的函数中调用，如果是的话，则指向全局对象，不管什么模式。
5. 其余情况皆为默认情况。包括函数直接在全局调用，在函数作用域中调用，在Promise中调用等等。