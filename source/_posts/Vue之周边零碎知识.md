---
title: Vue之周边零碎知识
date: 2018-3-8
categories: Vue
tags:
  - Vue
  - Vue中的this指向
  - 作用域
  - Dom操作
  - 渲染
---

>  记录一下Vue中的零碎知识

<!-- more -->
### Vue 中的 `this` 指向

  - **在 `Vue` 实例中的，一般指向的是 `Vue` 实例**
    - 当然，如果在 Vue 实例中，有函数，因为函数有作用域，在函数作用域中的this指向的就是 `window`，
   
  ```javascript
    methods:{
            showMessage1:function(){
                setTimeout(function() {
                   document.getElementById("id1").innerText = this.message;  //这个this指向的是window
                }, 10)
            },
     }
    methods:{
            showMessage1:function(){
                setTimeout(() => {
                   document.getElementById("id1").innerText = this.message;  // 由于箭头函数中的this在声明函数的时候就定下了指向，由其宿主函数决定，所以这个 this 指向的是 Vue
                }, 10)
            },
     }

 ```

-  **如果写在了Vue实例外，那么this指向的跟平常js代码指向差不多 ，谁调用，`this` 就是指向谁**    


### 一个项目。只会出现一次 `new Vue` 实例，并且一个 `el` 只能选择一个托管区域。可以用选择器选择。一个模块就是一个组件，`new Vue` 其实也是一个组件。



## Vue 中的 DOM 操作

> 因为js原生中。操作 DOM 非常消耗性能。所以在 Vue 中不推荐操作 DOM ,如果非要操作 DOM ,Vue 里提供了可以操作虚拟 DOM 的方法 。并且 Vue 里提倡数据推动视图。所以，在 Vue 中，遇到问题的时候，优先考虑操作数据。


## Vue 中的作用域问题

> **在 Vue 中的 `methods` 钩子函数中写自己的函数代码，里面的函数代码依然拥有自己的作用域。并不会受到 `Vue` 框架影响，在js原生中作用域是怎么样的，那么在 `methods` 中就是怎么样的，作用域链也是一样的。不过在 `Vue` 实例中，this一般指向的是 `Vue` ，如果在  `methods` 中的自调用函数中，this还是会指向 `window`**


## Vue 中函数自定义参数渲染问题

> **如果要将在函数内自定义的参数，渲染在页面中，那么就需要在 Vue 实例中的 data 中定义；**

> **任何想渲染在页面中的数据，都需要在 data 中定义。** 
