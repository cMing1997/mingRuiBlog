---
title: Vue的生命周期函数
date: 2018-4-15
categories: Vue生命周期函数
tags:
  - Vue生命周期函数
---

> 这篇文章主要介绍 **`Vue`** 内八个生命周期函数。

<!-- more -->

## 1、beforeCreate(){}

  - **执行时机：**当vue实例被创建，即被分配了内存的时候机会执行

  - **执行特点：**仅仅占据了内存空间,data中的数据和methods中的额方法都还没有挂载到实例上面

  - **使用场景：**一般实际开发中用到此函数不是很多,但是可以在内部初始化一些和vue无关的数据

    ```javascript
    var vm = new Vue({
          el:'#app',
          data:{
             msg:'zxx'
          },
      beforeCreate() {
           // console.log(this.msg)
           // console.log(this.$el)
           // console.log(document.getElementById('app'))
       },
    })

    ```


## 2、created(){} (重要)

  - **执行时机：**当data中的数据和methods中的方法以及所有vue实例身上的属性都被挂载完毕的时候执行

  - **执行特点：**可以访问到data中的额数据已经methods中的方法,但是DOM还没有被vue实例渲染

  - **使用场景：**可以做数据的初始化,发送数据请求
        
    ```javascript
    var vm = new Vue({
          el:'#app',
          data:{
             msg:'zxx'
          },
        created() {
           // console.log(this.msg)
           // console.log(this.$el)
           // console.log(document.getElementById('app'))
       },
    })
    ```

## 3、beforeMount(){}
 
  -  **执行时机：**当vue实例数据准备完毕,虚拟DOM已经渲染完毕,但是真实DOM还没有被渲染完毕的时候，在内存中的这一颗DOM树已经渲染好了

  -  **执行特点：**虚拟DOM存在,所以可以通过vue提供的方法访问到虚拟DOM对象身上的任何属性，但是还是没有渲染到真实DOM中
   
  -  **使用场景：**极少
  
   ```javascript
      var vm = new Vue({
            el:'#app',
            data:{
               msg:'zxx'
            },
        beforeMount() {
             console.log(this.msg)
             console.log(this.$el)
             console.log(document.getElementById('app'))
        }
     })

   ```

## 4、mounted(){} （重要）

   - **执行时机:**数据都已经挂载到实例上了,同时真实DOM也被渲染到浏览器上了，所有的指令都被解析完毕
   
   - **执行特点:**在mounted内部可以获取到真实DOM
   
   - **使用场景:** 如果涉及到需要操作真实DOM,就是必获取到真实DOM才能进行一些初始化的操作,这时必须将代码写在mounted中  
  
  ```javascript
     var vm = new Vue({
            el:'#app',
            data:{
               msg:'zxx'
            },
     mounted() {
            // console.log(this.msg)
            // console.log(this.$el)
            // console.log(document.getElementById('app'))
        },
    })

 ```

## 5、beforeUpdate(){}

 - **执行时机：**当vue实例的数据发生变化的时候触发
 
 - **执行特点：**vue实例中的数据已经发生了变化,但是还没有被重新渲染到界面中

 - **使用场景:** 无

   ```javascript
    var vm = new Vue({
            el:'#app',
            data:{
               msg:'zxx'
            },
        beforeUpdate() {
            // console.log(this.msg)
            // console.log(this.$el)
            // console.log(document.getElementById('app'))
            // console.log(document.getElementById('h3').innerText)
        },
     })
   ```

## 6、updated(){}  （重要）

  - **执行时机：**实例的数据发生了变化,同时该数据已经被重新渲染到界面中就会执行这个函数
   
  - **执行特点：**模型中的数据和视图中渲染的数据已经同步更新了
  
  - **使用场景：**当实例中的数据发生变化,需要监测数据的变化去处理一些业务逻辑的时候
      
   ```javascript
      var vm = new Vue({
            el:'#app',
            data:{
               msg:'zxx'
            },
        updated() {
            console.log(this.msg)
            console.log(document.getElementById('h3').innerText)
        },
      })
  ```

## beforeDestroy(){}

  - **执行时机：**当vue实例即将被销毁的时候执行

  - **执行特点：**vue实例中的数据和方法还可以被使用

  - **使用场景：**可以在这个函数中销毁不在使用的定时器以及一些会导致内存泄露的变量


## destroy(){} 

  - **执行时机：** vue实例已经从内存中销毁