---
title: ES6的新增的常见语法
date: 2017-10-10
categories: ES6
tags:
  - ES6
---

> 这篇文章主要是学习ES6过程中，记录一些常用的新增属性

<!-- more -->
### 一、声明语法

###### 1. ES5原语法声明

   - var：变量声明
   
   - 缺点：
     - 具有变量提升，也就是常说的预解析
     
     - 可以重复声明，因为内部有容错机制。

     - 没有块级作用域一说，只有全局作用域跟局部作用域，而且是在以函数为界限。

     - 没有常量这一说，这就导致在写代码的时候，声明的某个变量，但是又不希望它进行改变，这个时候var的可重复声明赋值，就会导致程序出错。


###### 2. ES6语法声明

   - **let:变量声明**

   - 同 `var` 相比的优点：

    - 使用 `let` 会产生一个块级作用域。作用域以 `{}` 为区分，如果没有在 `{}`内部声明，那么产生的作用域就是在全局环境下。

    -  `let` 声明的变量不允许重复声明，但是允许在产生的作用域中，进行改变值操作

    -  `let` 声明的变量并不会像 `Var`一样有变量提升的问题

   -  **const常量声明**

    - 用 `const` 定义常亮的同时也需要赋值。不然会报错

    - 定义的常量不允许再次被声明，也不允许再次将声明的常量赋值。

    - 用  `const` 声明的引用数据类型，虽然不能重复声明，但是可以增加或者修改里面的属性。


### 二、解构

###### 1. 函数解构

> 在进行函数解构的时候，函数里的属性，需要跟外部解构声明的变量名一样

   
```ECMAscript6
     let obj={name:'小明',age:14,gender:'男'};
    let {name,age}=obj;
    console.log(name,age); // '小明',14
   //------变量名不一样时----------//
    let{username,userage}=obj;
     console.log(username,userage); //会输出undefined。
```


 ###### 2. 数组解构

> 在进行数组解构的时候，是根据数组索引查找的，所以声明的变量名没不要非要一样。


 ```ECMAscript
  let arr = [13,56,78,24];
  let [e,r] = arr;
  console.log(e,r);  //返回 13 56

  //-------当要输出一个数组中任意的元素--------//
  
  let arr = [13,56,78,24];
  let [t,...r]=arr
  console.log(t,r);  //13 , [56, 78, 24]
  //解析：这个就是将数组的第一项，赋值给变量t ,数组中剩下的元素全部丢给变量r，声明的时候 `...r` 后面不能再加其他的变量名，否则会报错。
 ```


### 三、箭头函数

##### 1. 原始函数状态

> 原始函数(ECMAscript5)内部作用域中，this指向是，谁调用函数，this就指向谁。


  ```ECMAscript
     var fn = function(){console.log(123)}
  ```


##### 2. ES6箭头函数

> 箭头函数内也存在块级作用域，也遵循作用域查找规则，但是箭头函数内部 `this` 永远指向箭头函数外面的 `this` 对象。并且一旦定义了箭头函数，它内部 `this` 的指向就定了，之后就不会发生改变。
> 也就是说，箭头函数内没有 `this`

- 写法1：

```ECMAscript
  (形参列表) => {函数体}

  // 可以给箭头函数名
  let fn =(x,y) =>{ console.log(x+y) }
```

- 写法2：当函数右边只有一行代码的时候，大括号可以省略，这样系统默认会返回箭头右边的计算的结果。


 ```ECMAscript
  let fn = (x,y) =>console.log(x + y}
 ```

- 写法3：当函数左边只有一个形参的时候，右边的小括号也可以省略


  ```ECMAscript
  let fn = x => console.log(x);
  ```


### 四、ECMA6数组的新增方法

##### 1. reduce方法：汇总 (不管给多少数值的数组，最后只会返回一个值。)

> 这个方法使用时，reduce方法有两个参数，第一个参数为回调函数；第二个为中间变量的初始值，如果不传，默认中间变量的初始值为数组的第一项。
>> 第一个回调函数的行参数有三个，第一个行参数为使用reduce方法的中间变量值，第二个为当前传入函数内的值，第三个为传入当前函数内的值的索引。


 ```ECMAscript
  let arr =[134,13,67,56];
  arr.reduce(function(ai,now,index){ console.log(ai,now,index) })
  // 返回结果为： 第一次：134,13,1;第二次：undefined,67,2;第三次：undefined,56,3 
 ```

> 使用 `reduce` 方法会有一个返回值，返回的是调用 `reduce` 方法在匿名函数内部操作之后的最终结果值。
 

  ```ECMAscript
    let arr = [23,45,65,24];
    let num = arr.reduce(function(a,b,index){return a+b },0);
    console.log(num); // 返回结果为:157 (23+45+65+24)
  ```


##### 2. map方法(映射)：类似于轮询，这个函数会将数组中每一个元素都拿出来，然后进行相关操作。

```ECMAscript
   let arr =[90,87,38,56];
   let exc = arr.map( (score)=>{score>60?'你已经及格':'你未及格'} );
   console.log(exc); //返回的是个数组 ['你已经及格','你已经及格','你未及格','你未及格']
```


##### 3. filter(过滤器): 留下满足条件的，删除不满足条件的。

 ```ECMAscript
  let arr = [
    {'title':'男士包',price:200},
    {'title':'女式包',price:5000},
    {'title':'男士鞋',price:50},
    {'title':'女士项链',price:10200},
  ]
  //求：留下价格大于500以上的商品。
 let newArr = arr.filter(json => json.price>=500);
 console.log(newArr);  
  //返回为：[0: {title: "女式包", price: 5000},1 : {title: "女士项链", price: 10200}];
 ```


> 上面的代码中，箭头左边的 `json` 是将对应数组中每一项当做实参传入到函数内，然后进行相关操作。


##### 4. forEach:循环遍历(也叫迭代)

```ECMAscript
  let arr = [14,5,7,4];
  arr.forEach(function( index,item ) =>{ console.log(index,item) })
  //在使用forEach方法的时候，传入的一个形参为 `index`(索引),  `item`(当前传入函数内的参数)； 
```


### 五、字符串

> ES6新增了两个方法，`startWith` : 以什么开头。`endWith` : 以什
么结尾；//使用这两个方法返回的结果为 `boolean` 值。

```ECMAscript
  let str = '2gdgffdhff';
  let it = str.startWith('2g'); console.log(it); // true
  let ir = str.endWith('ee');console.log(ir);  // false
```


##### 模板字符串

- **原字符串拼接**


> 在原来要拼接大量字符串的时候，需要用引号包起来，然后内部的变量需要用加号相连

 ```ECMAscript
  let title = '我是长腿欧巴';
  let content = '故人心尚永，故心人不现'。
  let str = '<div>\
            <hi>'+ title +'</h1>\
            <p>'+ content +' </p>\
            </div>'
// 从上面代码中可以看出，拼接一个很简单的片段都需要进行很多操作，很麻烦
 ```


- **ES6字符串模板**

 ```ECMAscript
   let title = '我是长腿欧巴';
   let content = '但若此相似，不复初相见'。
   let str2= `<div>
               <h1> ${title} </h1>
               <p> ${content} </p> 
            </div>`
 ```


 > 从上面的代码可以看出只需要用(反单引号包裹)，中间需要更换的变量，可以用  `${ 需要更换的变量名 }` 包裹。