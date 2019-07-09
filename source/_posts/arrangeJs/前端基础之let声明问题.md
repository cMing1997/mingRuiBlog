---
title: 前端基础之let声明问题
date: 2019/7/9 17:05:47 
tags: [let声明]
categories: 重学前端系列笔记
cover: "https://cdn.nlark.com/yuque/0/2019/jpeg/221851/1555489235300-77ec8cfd-2be0-448e-a3d3-9dead9ff2d33.jpeg"

---

<a name="yuvss"></a>
### let变量问题
<a name="Cywoi"></a>
#### es6之前
在EA6之前声明变量或者函数，都是使用 **`var`**  ，但是这种声明会有个问题，就是 **预处理 **不管是声明变量，还是声明函数，都会进行**预处理**  
```javascript
console.log(b);
var b = 2;
var test = function(){
	console.log(this)
};
test();
// 下面的解析过程
var b;
var test;
console.log(b);
b = 2;
test = function(){
	console.log(this)
};
test();
console.log(this) // 这个时候，this 指向 window
```
<a name="6PlZP"></a>
#### es6出来之后
> 由于预处理的问题，我们在写代码的时候，会出很多问题，而且 **`var`** 能穿透一切语句结构，它只认脚本、模块和函数体三种语法结构。 **`ES6`** 新增的 **`let`** 定义变量以及 **`const`** 定义常量， **`ES6`** 不仅新增了定义变量常量的方式，并且新增的声明方式，可以形成 **暂存死区 ** 也就是在声明变量或者函数之前，无法调用。否则就会报错

```javascript
console.log(a);
let a = "测试";
test();
let test = function(){return console.log("我想睡觉")}
```
上面的代码如果运行，便会报一条 **`a is not defined`** ；但是如果是使用 **`var`** 
```javascript
console.log(a);
var a = "测试";
test();
var test = function(){return console.log("我想睡觉")}

// 这里会报两条错，undefined以及 test is not a function
```
<a name="gZ4Dr"></a>
#### 认识let

- **`let`**  声明的变量的作用域是块级的；
- **`let`**  不能重复声明已存在的变量；
- **`let`**  有暂时死区，不会被提升。
<a name="6uHWo"></a>
#### 疑问
> 我们都知道有的时候，需要循环给某类元素注册事件

```javascript
for(var i =0;i<10;i++){
	document.body.onclick=function(){
		console.log(i);	
  }
}
```
上面输出的结果是10；但是我们最开始期望的应该是0~9十个数，一查看原来是 **`JavaScript`**  的任务队列惹的祸。点击等事件属于宏任务，需要等循环执行完之后，才会执行。在没有 **`es6`** 的 **`let`** 的时候，一般是使用立即执行函数，将变量实时传递进去
```javascript
for(var i =0;i<10;i++){
	(function(i){
		document.body.onclick=function(){
			console.log(i);	
  	}
	})(i)	
}
```
使用立即执行函数有个问题，就是如果多个立即执行函数在一起的时候，如果没有使用 **`;`** 分号分开，下一个函数就很容易被上一个函数当成参数调用。这种一般是有两种解决办法，一：每个使用分号。二：每个函数前面加 **`void`** 关键词。<br />这种方法，在 **`es6`** 出现之后可以换一种方式
```javascript
for(let i =0;i<10;i++){
	 document.body.onclick=function(){
			console.log(i);	
   }
}
// 当你运行这个代码的时候，你会发现可以打出 0~9 的一串数字。
```
这里我就有点不懂了。为什么使用 **`let`** 就可以了。 在再次翻看MDN上面的例子时有个 **`let j = i`** ，看到这里不仅有点疑惑了，为啥平时我们写代码的时候可以不用写呢 ![image.png](https://cdn.nlark.com/yuque/0/2019/png/221851/1562593617300-71cc952b-7bf5-429b-b2a2-2e04f80921e0.png#align=left&display=inline&height=97&name=image.png&originHeight=224&originWidth=240&size=48660&status=done&width=104)，原来MDN为了容易理解，才这么写的。<br />翻了不少文章，都没怎么说明白，但是都猜想， **`let`** 在 **`for`** 循环中形成了局部作用域，每次循环都相当于在内存中赋值给了 **`for`** 循环作用域中的隐藏变量，然后打印的时候就可以打印期待的数值
```javascript
for(let i =0;i<10;i++){
   let j = i; // 此处的j为局部作用域中的隐藏内存变量
	 document.body.onclick=function(){
			console.log(j);	
   }
}
```
这里还有个疑问就是 **`let x = x`** 报错之后，再次 **`let x`** 依然报错<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/221851/1562659321374-c55608d9-beb3-4a84-89fb-13867c6eecd7.png#align=left&display=inline&height=293&name=image.png&originHeight=293&originWidth=743&size=21274&status=done&width=743)<br />研究之后发现：<br />**`let、var`** 在定义一个变量的时候。都会经历三个阶段 **创建内存、初始化变量、赋值**
```javascript
var a = "one";
/*  上面一句代码， 可以分为
*		var为a 在内存中创立一个地址
*   然后给a初始化为 undefined
*   最后给a赋值为字符串类型的 "one"
*/
```
我们一般说的 **`var`** 变量提升，都是讲的，前两个阶段提升。<br />而从上面报错来看。在  **`let x`** 之后再次 **`let x`** 时，初始化失败，说明内存中已经创建了 **`x`**  的地址<br />我们再来看这么一个例子
```javascript
{
   console.log(x) //Uncaught ReferenceError: Cannot access 'x' before initialization
   let x = 1
}
```
上面的例子说明。 **`let`**  并不是没有提升，也是有提升，不过只是先把变量在内存中创建了地址，没有初始化，也没有赋值<br />总结就是：如果 let x 的初始化过程失败了，那么

1. x 变量就将永远处于 created 状态。
1. 你无法再次对 x 进行初始化（初始化只有一次机会，而那次机会你失败了）。
1. 由于 x 无法被初始化，所以 x 永远处在暂时死区






