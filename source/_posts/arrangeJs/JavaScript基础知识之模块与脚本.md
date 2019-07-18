---
title: JavaScript基础知识之模块与脚本
tags: [模块,脚本]
categories: 重学前端系列笔记
cover: "https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/4d974773e5.jpg"
date: 2019/7/2 18:15:32 

---

<a name="g7fJD"></a>
### 前言
> 其实在 **`ES5`** 之前 **`JavaScript`**  所写的代码都称之为脚本，那个时候的 **`JavaScript`** 所写的代码都称之为脚本。并没有块的概念，这被当时其他语言工作者所不习惯。早期的 **`JavaScript`** 工作者，为了让 **`JavaScript`** 更像其他的编程语言，出现了很多的模块的框架。其中 **`require.js`** 比较出名。在于此同时，也诞生了一些规范，其中比较出名的有 **`AMD、CommonJS、UMD`** 模块化规范。然后直到 **`ES6`** 前端原生才开始引入模块

<a name="w41bQ"></a>
### 引入
<a name="SvQ7U"></a>
#### css模块化导入

1. 可以使用 **`ES6`** 导入的方式
```javascript
import "xx/xx/xx.js" // 这是将模块文件导入到当前文件内
import deno from "xx/xx/xx.js"  // 这个以变量的形式将模块的文件导入
import {methodName,...}  from "xx/xx/xx.js" // 这个是导入模块文件内的指定方法，这里导入的方法名必须得跟模块文件内定义的方法一样
import {otherName as methodName} from "xx/xx/xx.js"  // 这种是将模块内定义的方法以另外一个昵称导入到本文件内
import {methodNameOne,otherName as methodName,...other} from "xx/xx/xx.js"
```

2. 也可以使用传统的 **`src`** 导入
```html
<script type="model" src="xx/xx/xx.js"> // 这种似乎是为了兼容之前的不支持 import 的
/*
 * 在加载模块的文件时，type 类型必须是指定 model 的，
 * 如果导入 script 导入内部含有export符号的 JS 文件的时候。没有指定type="model"，那么就会报错。
 */
```
<a name="lAwkW"></a>
##### css导入
```html
<style>
		@import "xx/xx.css"  /*这个是 css3 存在的，可以在一个css文件内，导入另外一个css 文件 */
</style>
```

<a name="rU5od"></a>
#### 脚本加载

1. 使用 **`src`** 直接导入
```html
<script src="xx/xx/xx.js"></script>
```

2. 使用 **`require`** 
```javascript
const testDek  = require("xx/xx/xx.js");
console.log(testDek)
```
<a name="t5ORU"></a>
### 导出
> 导出方式分默认正常导出和默认导出，当一个模块文件内，只有一个功能要导出的时候，使用 **`export default`**  导出，当一个导出的文件内有多个需要导出的，那么就可以使用 **`export`** 
> **`export`**   可以加在任何声明性质的语句之前 

1. 按正常导出 **`export`** 
```javascript
export let abj = {a:2};
export function nest(){};
```

<br />2. 导出一个默认模块 **`export default`** 
```javascript
function util (){ console.log(234)  };
export default util;
```

<a name="BpX8R"></a>
### 结语
> 不管是模块，还是脚本，都支持指令序言，而指令序言其实就是给一个 **`JS`**  文件增加文件元信息的，主要是告诉解析引擎以什么形式解析本文件，这种元信息在 **`css`** 里面是 **`@charset`** ，在 **`HTML`** 中是 **`<!DOCTYPE html>`** ，指令序言一般是放在文件内的最顶部，不然不会起作用的。并且是可以自定义的。


