---
title: Vue之路由
date: 2018-4-18
categories: Vue之路由
tags: 
  - Vue
  - vue-Router
  - 前端路由
  - 后端路由
---

> 记录一下自己学习 **`Vue`** 的路由模块笔记

<!-- more -->

> 路由其实就是根据不同的请求地址，返回不同的数据

> 路由分 **`前端路由`** 跟 **`后端路由`** 之分 

**前端路由**
> 前端路由一般用在一些结构变化，一些结构不变的这种应用

> **原理：**在 URL 请求路径的时候，在每个请求路径之前加 `#`，而服务器对 `#` 之后的数据不进行解析。所以在请求带有 `#` 的路径的时候，对服务器来说，是没请求，在前台请求 带 `#`地址的时候，页面就不会刷新，而前台可以通过 `location.hash` 可以获得 地址栏中 `#` 之后的数据。然后判断请求地址的不同，然后给页面之前预留的地方显示不同的结构。

**后端路由**
> 后端路由一般为后台监控我们向后台请求的是什么地址，然后后台根据请求的地址不同，然后做出相对应的数据。然后前台根据接收后台返回的数据，用模板啊或者用其他的方法，渲染在页面上。


**前端路由结合组件开发**

> **原理：** 就是在页面中变的地方，挖一个坑；然后前台路由根据前台url地址的不同，往挖的坑里，放不同的组件模板。然后跟后台请求的时候，结合 `AJAX` 就可以实现页面部分无刷新的单页面应用。


## 创建路由

```html
    <script src="./vue2.js"></script>
    <script src="./vue-router.js"></script>
<body>
    <template id="box">
       <div>
            <p>这个是首页</p>
            <h1>你好啊</h1>
       </div>
    </template>
    <div id="app">
        <router-view></router-view>
    </div>
    <script>
        let index = {
            template: `#box`
        };
        let welcome =  {
            template: `<div>这个是爱你的页面！(*_*)</div>`
        }
        let router = new VueRouter({
            routes: [
                { path: "/", component: index },
                { path: "/welcome",  component: welcome }
            ]
        })
        let vm = new Vue({
            el: "#app",
            router:router
        })
    </script>
</body>
```

![](https://i.imgur.com/vnezss3.png)


## 创建嵌套路由

```html

    <template id="boxone">
       <div><p>你是狼的得诱惑</p>
            <button @click="jumpTo">漂泊俗世</button>
        <router-view></router-view>
       </div>
    </template>
    <template id="boxson">
        <ul>
            <li>风干了寂寞</li>
        </ul>
    </template>
    <div id="app">
        <router-view></router-view>
    </div>
    <script>
        let index ={
            template:"#boxone",
            methods:{ jumpTo() { this.$router.push("indexd") } }
        };
        let indexd ={
            template:"#boxson"
        };
    let router = new VueRouter({
        routes:[
            {path:"/",component:index ,
            children:[
                {path:"indexd",component:indexd}
            ]},
        ]
    })
    let vm = new Vue({
        el:"#app",
        router:router,
    })
    </script>
```
![](https://i.imgur.com/jC7MzTN.png)

## 创建完路由，那么就该传参了

**路由传参有两种（前端网页间传值）**
  
- 1、在url地址后面加  **`/:参数`**
  
  -  **用 `/:参数` 这种形式传递参数，可以用 `this.$route.params` 获得传递的参数。**


- 2、在url地址后面加 **`?key = vlaue1&key2 = vlaue2`** 

  - 用 **`?key = vlaue1&key2 = vlaue2`** 这种形式传递参数，可以用 **`this.$route.query`** 获得地址栏中 ? 问号以及之后的参数。