---
title: Vuex的组件间传值
date: 2018-8-10
categories: Vuex的组件传值
tags:
  - Vue
  - VueX
---

> 这篇文章主要介绍一下vue中传值是怎么传值的，其中常用函数有哪些，做个总结

<!-- more -->

## Vuex是什么？它有什么用？

官方说vuex是一个状态管理库，可以保存所有组件中的状态，但是我们更多是把他当做一个数据管理库，常常将它用在距离比较远的两个组件间传值应用中

![](https://i.imgur.com/XL0pdKv.png)

## 它是怎么存储数据的？怎么使用存储的数据？怎么依靠第三方Vuex修改数据

**1、存储数据**

事实上，vuex是将数据存储到store实例中的store属性中

**2、使用 `state` 中的数据**

- 在组件的HTML中，使用 `$store.state.属性名` 就可以获得共同定义的
在store实例中的变量参数。

- 在js中可以通过 `state.属性名`获得定义的变量参数。

```javascript
  import Vue from 'vue'  //导入vue模块
  import Vuex from 'vuex'  //导入vuex模块
  Vue.use(Vuex)  //将vuex挂载到vue树上
  const state = {  
//state是vuex中类似于vue实例中的data，不过它是定义公共参数的，可以将要传递的参数放在state中定义
    count: 0  
  }
 new vue.Store({  //注意，这里new的是vue.store,并不是vuex
  state, //其中，state是管理数据的
  getter,  //这个函数相当于vue里的watch,具有计算属性。
  actions,  
  mutations, // mutations 是定义对公共数据的函数。
})

 let vm = new Vue({
  el:"#app",
 })
```

现在要将上面的数据，展现到 index 文件内的 `index.vue` 中 `tempalte` 中

```html
  <template>
    <div>
       <p>{ {$store.state.count} }</p>
       <button>-1</button>
    </div>
  </template>
<!--其中 $store 就是 new 出来的 vue.store 实例对象，它上面的state方法可以拿到里面定义的参数-->
```

`active.vue` 组件内代码如下

```html
  <template>
    <div>
       <p>{ {$store.state.count} }</p>
       <button>+1</button>
    </div>
  </template>
```

现在要在 `index.vue`对数据进行相关操作(点击 button，让数据 count+1 )，`active.vue`中进行 `count-1`

  - 给 `button` 绑定一个点击事件
  - 然后，在 `vue.store` 实例内的 mutations 对象内定义两个函数。
  - 然后用 `this.$store.commit("事件1")` 触发定义在 mutation 中的事件1，

```javascript
//active.vue 中
 <button @click="add">+1</button>
 methods:{
  add(){
   this.$store.commit('addNum')
  }
 }
// index.vue 中
 <button @click="reduce">+1</button>
 methods:{
  reduce(){
   this.$store.commit('reduceNum')
  }
 }

 // store.js中定义函数
 new vue.store({
    mutations:{
     addNum(){
       this.state.count+1  //this指向vue实例
     },
    reduceNum(){
      this.state.count-1  //this指向vue实例
    }
   }
})
```

**使用getters中的数据**

- js 中使用 `$store.getters.msged` ，其中 `msged` 是定义计算数据的函数名。getter中的数据是依据state中定义的变量参数的。

- HTML中使用 `$store.getters.msg`  （只要是使用了$store.getters.meg ,这个获得的就是计算之后的 msg 数值）