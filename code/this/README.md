# this学习笔记

## 概要
this是一个神奇的东西，学了忘，忘了学，做个笔记，以后好复习

[这里我参考的是Mozilla的MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

## 正文

首先我们要明白this的意义。

this是什么呢？
this指的是当前的执行环境。
这句话怎么理解呢？

在js当中，作用域有两种，全局作用域与函数作用域。
当我们在全局作用域中，写下了this，那么this就是全局对象，也就是window/globalThis。
当我们在函数作用域中的时候，这个this就取决于函数调用时所处的作用域了。