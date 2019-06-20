---
title: Vuex的使用总结
date: 2018-10-21
categories: Vue
tags:
  - Vue
  - VueX的总结
---

> 记录一下自己学Vuex的笔记

<!-- more -->

## Vuex是什么？

> vuex 是 vue 的一个插件，专门用来管理 vue 组件之间的状态的，Vuex 常见的有 { `state`，`getters`，`actions`，`mutations`}


## 怎么使用vuex?

```javascript
   import Vue from 'vue'  // 1. 引入vue
   import vuex form "vuex" // 2. 引入vuex
   Vue.use(vuex) // 3. 将vuex 注册到 Vue 中

   // 4. 通过 new 的方式创建一个 vuex 的 store 实例
   const store = new vuex.store({
        state:{},
        mutations:{},
        getter:{},
        actions:{},
        module:{},
   }) 
   
  const app = new vue({
    el:#app,
// 将创建出来的 store 实例交给 vue 实例， 这样，在 vue 实例监管的任何地方都可以那大 store 里定义的数据或者参数了。
    store:store,
   })
```

### vuex 中的 `state` 是什么？ 怎么使用？

> **state** 就相当于 组件中的 **`data`** ，不过 **state** 是独立于组件之外的，用来存储组件之间公共的数据，而 **data** 是存储组件内部的数据的，不同组件之间，很难得访问。

**定义**

```javascript
   const store = new vuex.store({
      state:{
          msg:"这是所有组件的公共数据"，
      },
   })
```

**获取**

```javascript
  // 在其他组件的HTML代码中，通过 $store.state.msg 就可以拿到定义的公共数据，
  // 在 js 中，可以通过 this.$store.state.msg 拿到公共数据
```

**赋值**

> 当一个组件内的数据，要在另外一个组件内使用的时候，那么就需要，将组件内的数据，赋值(放到)给 **vuex** 实例 **store** 的 **state** 数据中，

```javaScript
  // 组件 A 
  data(){
   goodslist:[1,2,3], 
  }
  mounted(){
    this.$store.commit("init",goodslist) 
 //这个是在 组件A 中使用 this.$store.commit() 方法调用定义在mutations 里的 init 函数，将组件A中的共用的数据，放到 store 仓库中
  }
  // store 实例中
  const store = new vuex.store({
      state:{
        msg:'',
      }
      mutations:{
         // 初始化将 组件A 中的数值，保管给公共仓库 state  
         init(state,msg){
            state.msg=msg
         }
      }
   })
```

### vuex 的 mutations 是干啥的？

> **mutations** 就相当于 vue 的 **methods** ，是用来修改 **state** 里的数据的。

> 这个里面必须是同步的

> **注意：** 如果要在子组件中修改公共数据，不能使用 **this.$store.state.msg++** 这种方法，虽然这也能改变公共数据，但是如果很多个组件同时修改同一个数据，当数据改错了，那么都不容易知道是哪个环节出错了。

```javascript
    mutations:{
//这个函数是自己定义的函数，函数中会传最多两个参数，
//第一个参数为定义的 state 数据，第二个参数为 触发该函数时，传递进去的参数。     
    defaultInit(state,b){
        state.msg = b    
      }
    } 
```

**获取触发函数**


**`this.$store.commit(函数名，要改变的值)`**
**这个很好理解：将 $store 中的函数释放出来，并且在释放的时候，传递个值进去**


### vuex 中的 getter 是做什么的？

> **getter** 是用来获取state里的值，然后是类似过滤器还有计算属性的功能，

> **getter** 中定义的方法内部依赖的数据发生变化会自动重新调用函数计算返回值

```javascript
   state:{
     todos:[12,12,33,333,34]
   }
   getter:{
   //  定义函数名自己起，里面也可以传递两个参数，
 //  第一个参数是 state 
 //  第二个参数可以是其他的 getter，也可以说是在 getters 定义的其他的计算函数返回的值。
    addNum(){
      return this.$store.state.todos.filter(todo => todo.done).length
    }
   }
```

**获取**

```javascript
   //HTML中使用获取  
   $store.getter.msg  //这个获得的 msg 是计算之后返回的值

   // js中使用获取
   this.$store.getter.定义的函数名  //当内部依赖的数值变化时，会自动调用该函数，重新计算。
```

### actions是啥？ 能干啥？

> 这个类似于 **mutations**，但是与 **mutations** 不同的是，**actions** 里面可以异步方法，也可以定义同步方法。

> 它接收一个 **store** 镜像类型的 **context** 对象，可以使用 **context.commit(mutations里定义的方法)** 调用 **mutations** 里定义的方法，或者使用 **context.state** 和 **context.getters** 来获取 **state** 和 **getters**

```javascript
    actions:{
       setTimeout(() => {
          context.commit('increment')
       }, 1000)
    }
```

**触发**

> 通过 **`store.dispatch('increment')`** 触发定义在 **`actions`** 里的函数
 