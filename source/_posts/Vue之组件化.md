---
title: Vue之组件化
date: 2018-4-11
categories: 组件化
tags:
  - Vue
  - 组件定义
  - 组件传值
---

>  要说 Vue 和其他的一些普通框架的区别，莫过于它那模块化开发，用数据驱动视图。像我们平时开发的时候，从获得数据到视图层显示，经常需要做一些没效率的操作。而 `Vue` 这类框架的出现，正好解决了这些痛点。它借鉴了后端的模块化开发形式，使用了 MVVM 开发模式。用数据驱动视图。这样就可以避免工作中不少的无用功，提高了开发效率。

<!-- more -->

## 什么是组件？

> 组件就是对视图的封装,方便重复使用。

> 模块是对功能逻辑的封装,也就是对组件功能的扩充。


## 怎么定义组件？


### 1、使用 `vue.extend()` 定义

  ```HTML
   <body>
      <div id="app">
          <index></index>
      </div>
   </body>
   <script>
     let dv = Vue.extend({
         template:'<div>我就是这么帅，没办法实力摆在那！</div>'
     });
     Vue.component("index",dv);
     let vm = new Vue({
         el:"#app"
     })
   </script>
  ```

![](https://i.imgur.com/0m6hRHn.png)


### 2、使用 `Vue.component()` 定义


```html
  <body>
      <div id="app">
          <index></index>
      </div>
  </body>
  <script>
   Vue.component("index",{
      template:"<div>你不是我的菜啊！</div>"
   });
   let vm = new Vue({
       el:"#app"
   })
  </script>
```

![](https://i.imgur.com/E2wvMnE.png)

### 3、使用模板定义组件

```html
  <body>
      <template id="box">
          <p>人生若只如初见，何事悲风秋画扇</p>
      </template>
      <div id="app">
          <index></index>
      </div>
  </body>
  <script>
     Vue.component("index",{
        template:"#box"
     });
     let vm = new Vue({
         el:"#app"
     })
  </script>
```
![](https://i.imgur.com/JBddUoR.png)

#### 总结：对于三种创建组件的方法，由于模板内的内容有时会甚多，但是如果写在字符串内，那么就显得有点杂乱，并且不怎么方便，所以最优是使用第三种，`template` 模板定义组件


## 定义父子组件

```html
<body>
    <template id="box">
        <div>
            <p>斗气化马。竟恐怖如斯</p>
            <son></son>
        </div>
    </template>
    <template id="son_box">
        <span>等待着游戏的童年</span>
    </template>
    <div id="app">
        <parent></parent>
    </div>
    <script>
        Vue.component("parent",{
            template:"#box",
            components:{
                "son":{
                    template:"#son_box",
                }
            }
        });
        let vm = new Vue({
            el:"#app",
        })
    </script>
</body>
```

![](https://i.imgur.com/0ws28Ej.png)

## 组件间传值。

### 1、父传子

> 其实就是在父组件中定义数据，然后用 `v-bind` 将其绑定给子组件的变量，然后在子组件用用 `props` 接收。

> 父向子传值，其实就是属性值的传递。


```html

<body>
    <template id="box">
        <div>
            <p>我叫我儿子：{{msg}}</p>
            <son :sonmsg="msg"></son>
        </div>
    </template>
    <template id="son_box">
        <span>我叫：{{sonmsg}}</span>
    </template>
    <div id="app">
        <parent ></parent>
    </div>
    <script>
        Vue.component("parent",{
            template:"#box",
            data(){
                return {
                 msg:"小明"
                }
            },
            components:{
                "son":{
                    template:"#son_box",
                    props:["sonmsg"]
                }
            }
        });
        let vm = new Vue({
            el:"#app",
        })
    </script>
</body>

```

![](https://i.imgur.com/7elulTl.png)

### 2、子传父

> 子组件向父组件传值，其实也是发送了数据，只不过这个数据是通过一个事件发送过去，然后将数据随着该事件一起携带过去了。

> 该事件既然是子组件向父组件发送，那么绑定的是在子组件身上，但是事件绑定的函数，是在父组件内定义并触发，然后接受的参数就是子组件传递过来的参数。

```html
  <body>
    <template id="box">
        <div>
            <p>我名字是：{{mm}}</p>
            <son @parent="getmsg"></son>
        </div>
    </template>
    <template id="son_box">
        <span>我爸爸的名字是：{{msg}}</span>
    </template>
    <div id="app">
        <parent></parent>
    </div>
    <script>
        Vue.component("parent",{
            template:"#box",
            data() {  return { mm: null } },
            methods:{
                getmsg(data){ this.mm = data  }
            },
            components:{
                "son":{
                    template:"#son_box",
                    data(){
                        return { msg:"大明"  }
                    },
                    methods:{  aa() {  this.$emit('parent', this.msg) },  },
                    created(){ this.aa() },
                },
            },
        });
        let vm = new Vue({
            el:"#app",
        })
    </sript>
 </body>
```

![](https://i.imgur.com/VEmzRYm.png)

### 3、兄弟之间传递数据

> **原理：**兄弟之间传值，其实就是利用最大一个函数，Vue实例。然后利用它身上的$emit()发送数据，以及 $on()方法接受数据。

```html
    <template id="box">
        <div>
            <p>我好不好啊</p>
            <sontwo></sontwo>
            <sonone></sonone>
        </div>
    </template>
    <template id="son_one">
        <span>我兄弟叫：{{msg}}</span>
    </template>
    <template id="son_two">
        <p>我兄弟叫我：{{twomsg}}</p>
    </template>
    <div id="app">
        <parent></parent>
    </div>
    <script>
        var bus = new Vue();
        Vue.component("parent",{
            template:"#box",
            components:{
                "sonone":{
                    template:"#son_one",
                    data(){ return{  msg:"二傻"  }  },
                    methods:{
                        send(){ bus.$emit("onesend",this.msg) }
                    },
                    created(){ this.send(); }
                },
                "sontwo":{
                    template:"#son_two",
                    data(){ return { twomsg:""  } },
                    created(){
                        bus.$on("onesend",(data)=>{ this.twomsg =data; })
                    }
                }
            }
        });
        let vm = new Vue({
            el:"#app",
        })
    </script>
```
![](https://i.imgur.com/yVxzcm5.png)

