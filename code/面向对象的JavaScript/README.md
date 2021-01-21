# 面向对象的JavaScript

## 前言

实际上，我是不太想写这篇文章的。但是，出于记录的目的，我就还是写写吧。这个东西，往深了写，可以写得很深，但这我又不会。往浅了写吧，也没什么意思，网上一大堆这种文章。权且当作记录了。我也尽量使用最简单的语言来说明。

## 正文

假设我们现在有一个函数Person(英文单词：人)

``` JavaScript
function Person() {
    console.log("hhh");
}
```

这个函数与普通的函数没有什么差别，只不过我将它的名字首字母大写了。
那么这个时候我怎么使用这个函数呢？

``` JavaScript
Person(); // hhh
```

我把它像普通函数搬调用，那么结果也就如普通函数般输出。

这是一件再普通不过的事情，没什么好说的。但是既然我们聊的是面向对象的JS，那么必然要涉及到对象。

于是，现在我抛出一个问题：我想要在我调用函数的时候，结果得到一个对象。

于是，非常自然地，我们首先想到我们可以将函数这样子改写：

``` JavaScript
function Person() {
    return {};
}
var a = Person();
```

于是，我们得到了一个能返回一个对象的函数。

这好吗？这很好。我们圆满地完成了任务。但是此时我们返回的仅仅是一个空对象，什么值都没有。一般情况下我们不会想要创建这么一个无聊的函数，而是需要一个返回某些特定结构的对象的函数，比如这样子：

``` JavaScript
function Person(name, age, gender) {
    return {
        name: name,
        age: age,
        gender: gender
    }
}
var a = Person("xiaoming", 18, "male");
```

于是我们得到了一个可以创建一个“人”的函数，这个函数接收几个值，分别是人的“姓名”，“年龄”，“性别”。

这好吗？这很好。我们依然圆满地完成了任务。像这种创建对象的模式，在设计模式中有一个专门的名字给他，叫做“工厂模式”。这个函数就像一个工厂，你填写好必要的参数，然后执行它，这个工厂就生产出一个符合要求的对象给你，非常形象。

这种创建方法其实挺好的，非常自然，实际上我们完全可以使用这种方法来编程。但是呢，我们JS，全称叫做JavaScript，它的名字带了个Java，这就注定它必定要和Java扯上点关系。我们的JS之父，在设计语言的时候，为了向Java靠齐，于是借鉴了Java里面的一个关键字，叫做new。这个关键字它是这样子用的：

``` JavaScript
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
var a = new Person("xiaoming", 18, "male");
```

这样的写法，看起来非常的Java。我们的JavaScrit，翻译过来就是Java的脚本，就显得名副其实。Java程序员一看就能懂。这其实也非常符合JavaScript一开始的定位，他就是想要成为一门浏览器上的Java，浏览器上的Java脚本语言。

那么这样子的写法与我们一开始的写法，究竟区别在哪里呢？这样看起来仿佛没有什么太大的不同，只是写代码的方式变了。

那么我们就要看看，咱们一开始那种写法，有哪些问题，这种写法，能给我们解决一个什么问题。

``` JavaScript
function Person(name, age, gender) {
    return {
        name: name,
        age: age,
        gender: gender
    }
}
var a = Person("xiaoming", 18, "male");
```

这样子的写法，固然可以创建出一个合乎要求的对象出来。然而，我们创建出来的对象，我们却无从得知它是怎么创建来的。比如我们可以自己创建一个与之类似的对象：

``` JavaScript
var b = {
    name: "xiaohong",
    age: 17,
    gender: "female"
}
```

a和b这两个对象，我们在编程的时候，没有办法判断他们究竟是怎么生产出来的。

这时候就有同学会问了。我对象创建出来不就行了，我为什么要知道它们是从哪里来的呢？

这是一个好问题，好的问题是解决问题的一半。也就是说，我们知道了对象从哪里来，有什么用呢？

作用是大大滴有。以我们现实生活中的例子来说。我们买了一个手机，这个手机是哪个产家生产的，我们会很在意。小米家的，我们会觉得物美价廉。苹果家的，我们会觉得生态闭环体验佳。三星家的，我们会想着它啥时候爆炸。同样是一个产品，它从哪里来，决定了它有哪些属性，可能做出哪些行为。以JS当中的函数举例子，当我们新建一个数组的时候，我们可以 `new Array(1, 2, 3)` ，这个时候我们知道它是一个数组，因此可以调用数组的各种方法。当我们新建一个日期对象的时候，我们 `new Date();` ，这个时候我们知道它是一个日期对象，可以调用日期对象的各种方法。

所以，我们新建对象的时候也是如此。当我们新建对象的时候，我们希望这个对象与它的创建者可以联系在一起，从而我们可以获得更多的信息。所以很显然，当我们使用工厂模式去创建一个对象的时候，我们得到a的就是一个普通的对象，与创建a的函数Person没有丝毫关联。

但是，当我们使用new操作符去创建对象的时候，情况就变得不一样了。

``` JavaScript
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
var a = new Person("xiaoming", 18, "male");
a.constructor === Person; // true
```

我们会发现，我们创建出来的这个对象，有一个constructor属性，这个属性就指向了创建它的那个函数。这个constructor是什么意思的，英文翻译它就是“构造器”的意思。所以，实际上我们在这里，把Person称之为a的构造函数，而a就称之为Person的实例。这就是我们踏入面向对象大门的第一步。记住这两个词，构造函数与实例。

但是这个时候有一个神奇的事情，就是我们可以尝试着打印一下a这个对象。既然我们说a上面有一个constructor属性，那我把a打印出来，肯定可以看到这个constructor属性吧。所以我们打印一下：

``` JavaScript
console.log(a);
```

结果当然是没有，不然我也不会说非常神奇了。我们只能看到这个a对象上面，有上面定义的name、age、gender属性。并没有什么所谓的 `constructor` 属性。倒是有一个奇怪的 `__proto__` 属性。这个东西是干什么用的呢？

这里我们尝试着点开这个 `__proto__` 属性，我们发现这是一个对象。在这个这个对象上面，我们发现了刚才找不到的 `constructor` 属性。咱们点开这个constructor属性，发现就是我们定义的那个 `Person` 函数。

这里我们就开始懂了。我们查到 `a` 对象的 `constructor` 属性的时候，查不到，于是它自动到 `a.__proto__` 上面去查找了。

我们刚才打印的 `a.constructor` 属性，其实本质上应该是 `a.__proto__.constructor` 才对。只不过系统自动帮我们把 `.__proto__` 给省略了。

这里我们就要提到JS的一个机制了。就是原型链。什么是原型链呢？非常简单，就是一系列的__proto__属性连起来的一条链，就叫原型链。

我们可以观察这个a对象，它有一个__proto__属性，点开他，它是一个对象，然后这个对象，里面又有一个__proto__属性，又是一个对象。然后我们可以不停地点开他，一直到最后它指向null为止。

``` JavaScript
a.__proto__.__proto__.__proto__ == null;
```

那么这条原型链有什么用呢？

简单来讲，这条原型链，是用来给对象查找属性用的。当我们在一个对象 `obj` 上查找某个属性的时候，首先就会在对象本身上查找。如果找不到，那么就去 `obj.__proto__` 属性上查找，如果还找不到，那就去 `obj.__proto__.__proto__` 上面去查找。一直查到null为止。

那么这样一个特性，对我们编程来讲，有什么作用吗？

当然有作用，实现继承的精髓就在于此了。

假设我们有两个对象a和b，他们都有__proto__属性，而他们的__proto__，都指向同一个对象c。那么当我们分别在a和b上查找某个值的时候，假如查不到，他们就会一起到c上面去查找。这个时候，假如c上面有他们要的值，就会直接返回该值了。

这也就是说，假如我们在c上面定义了一个值，这个值是可以分享给a和b一起使用的。继承的精髓便在于此。我们通过这种原型链的查找机制，实现了值的共享。

``` JavaScript
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
var a = new Person("xiaoming", 18, "male");
var b = new Person("xiaohong", 17, "female");
a.__proto__ === b.__proto__; // true
```

比如我现在要在原型上定义一个方法，可以说出这个人他自己的名字和年龄，那么怎么写呢？

``` JavaScript
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
var a = new Person("xiaoming", 18, "male");
a.__proto__.say = function() {
    console.log("我的名字是：" + this.name);
    console.log("我的年龄是：" + this.age);
}
```

这样写当然是可以实现效果。但是我们发现了一个问题：我们必须先创建一个对象，然后才能获取到原型，然后才能在上面添加方法。

但是实际情况里，我们往往是要在对象创建出来之前就在原型上添加方法，有什么什么渠道可以在创建对象之前就获取到原型呢？

答案当然是有，否则我也不会在这费口舌了。

在我们的构造函数Person上，其实也有一个属性，叫做prototype，这个英文单词，翻译过来就是“原型”的意思。很显然，我们可以通过它，来拿到原型，然后在原型上声明一些值。

于是我们的代码改成如下样子：

``` JavaScript
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
Person.prototype.say = function() {
    console.log("我的名字是：" + this.name);
    console.log("我的年龄是：" + this.age);
}
var a = new Person("xiaoming", 18, "male");
```

这样的代码，看起来就舒服多了。

换句话说，实例的 `__proto__` 属性，实际上就是构造函数的 `prototype` 属性，他们都指向一个共同的对象，这个对象就是所谓实例的原型。

至此，我们就明白了几个概念，实例、构造函数、原型、原型链。这就是面向对象的JavaScript中最基础的概念。面向对象的大厦就是由此建立起来。