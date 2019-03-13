---
title: Vue基础知识（下）
date: 2018-3-7
categories: Vue基础知识（下）
tags:
  - Vue
  - watch 方法
  - axios
  - transtion
---

> 继上续基础知识学习之后，接下来学习一些稍微难一些的 `Vue` 知识

<!-- more -->

### watch 方法

> 作用： 用来监听指定数据的变化

> 这个方法跟 `computed` 计算属性一样，同样是有计算属性的。

**1、当监听的数据为简单数据类型**


![](https://i.imgur.com/SGe0KSb.png)

**注意：平时主要用的还是 `computed` ,当需要在数据变化时执行异步或开销较大的操作时，用 `watch` **


**2、当监听的数据为引用数据类型时，就要启用深度监听了**

```html
<body>
    <div id="app">
        <input type="text" v-model="one" @blur="adddata(one)">
        <input type="text" v-model="two" @blur="adddata(two)">
        <ul>
            <li v-for="(v,index) in list">
                {{v}}
            </li>
        </ul>
    </div>
    <script>
    let vm = new Vue({
      el:"#app",
      data:{
         list:JSON.parse(localStorage.getItem("vi"))||[],
         one:"",
         two:"",
      },
      methods:{
        adddata(data){
            this.list.push(data);
         }
      },
      watch:{
         list:{
 //这就表示，监听 `list` 数据，但是因为list为数组，引用数据类型，所以需要深度监听，就需要 `handler()` 函数，和 `deep` 参数设置
           handler(){
             localStorage.setItem("vi",JSON.stringify(this.list))
           },
           deep:true,
         }
      }
   })
    </script>
</body>
```

### `axios` (基于 `promise` 的 `HTTP` 库)

> 1、在 `axios` 中使用 `get` 请求，如果要传递参数，需要在第二个参数中，传递一个对象包裹着的 `params` 对象， `params` 对象里，写需要传递的值

> 2、如果使用 `post` 请求，要传递参数的话，就可以在请求的第二个参数中，直接传递一个对象，对象里写明要传递的参数。

#### 1、用 `axios` 发送普通的 `get` 请求
 
   **不传参数**  

```javascript
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
axios.get('/user?ID=12345')
      .then(function (response) {
          console.log(response);
          console.log(response.data)
      })
      .catch(function (error) {
          console.log(error);
      });

```

![](https://i.imgur.com/7oyZMlX.png)

   **传递参数**

![](https://i.imgur.com/DIdZ7uZ.png)


####  2、在Vue中使用 `Axios` 发送请求

```JavaScript
  methods:{
      getData() {
        var url = "http://www.lovegf.cn:8899/api/getprodlist"
        axios.get(url).then(res => {
             console.log(res);
             this.list = res.data.message;
        }).catch(error => {
             console.log(error);
        })
     },
  }
  mounted：{
    this.getData();
  }

```


## Vue中动画的使用


> **概述：** 由于 `Vue` 中不推荐操作 DOM 所以，Vue帮我们封装了一些css动画，提供多种不同方式的应用过渡效果。

 - 其中包括：
    - 在 CSS 过渡和动画中自动应用 class

    - 可以配合使用第三方 CSS 动画库，如 Animate.css

    - 在过渡钩子函数中使用 JavaScript 直接操作 DOM

    - 可以配合使用第三方 JavaScript 动画库，如 Velocity.js


**注意：在Vue中封装的过渡动画，只能在 `v-if` 和 `v-show` 控制的元素中使用，并且需要 `transition`包裹需要做动画的元素。 **


#### 1、使用css类名来实现动画

```html
<style>
   .firstUse-enter , .firstUse-leave-to{
        padding-left: 200px;
   }
   .firstUse-enter-active,.firstUse-leave-active{
        transition: all 2s ease;
   }
   .firstUse-enter-to,.firstUse-leave{
        padding-left: 0px;
   }
</style>

  <body>
      <div id="app">
        <botton @click="toggle">点我出现效果</botton>
        <transition name="firstUse">
            <div v-show="isShow">故人心尚咏</div>
        </transiton>
      </div>
  </body>

  <script>
    let vm = new Vue({
       el:"#app",
      data:{isShow:false,},
      methods:{
        toggle(){
            this.isShow = !isShow;
        }
      }    
    })
  </script>

```

![](https://i.imgur.com/ctvqtJv.png)


#### 2、使用自定义类名

> 使用Vue中推荐的 `animate.css` 第三方css库

  - **简单的使用animate.css**
  
   ```html
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" type="text/css">
    
    <div class="animated hinge">hello</div>
   ```
  
  - **结合Vue使用 `animate.css` 动画库**

  ```html
   <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" type="text/css">
  <script src="./vue2.js"></script>
  <body>
     <div id="app">
        <!-- 
          enter-active-class 定义进入动画的状态
          leave-active-class：定义离开动画的状态
        -->
        <transition enter-active-class="animated hinge" leave-active-class="animated zoomIn">
            <div v-show="isShow">
                  点不到我，点不到我，气死你
            </div>
        </transition>
        <input type="button" value="点我啊，你倒是点我啊！" @click="toggle">
    </div>
     <script>
        let vm = new Vue({
            el:"#app",
            data:{ isShow:true },
            methods:{
               toggle(){ this.isShow = !this.isShow }
            }
        }) 
     </script>
  </body>
  ```
 
**注意：不管是使用Vue定义类名实现动画，还是自定义的使用第三方css动画库来实现动画，都是通过对动画的元素在适当时候增加或者删除类名，来达到预定义的动画效果**

  - **利用钩子函数实现动画** 
  
  ```html
   <div id="app">
        <input type="button" value="点我" @click="toggle">
        <transition  @before-enter = 'beforeEnter' @enter = 'enter' @after-enter = 'afterEnter'>
            <div v-show = "isShow" style="width: 200px">钩子函数实现动画</div>
        </transition>
  </div>
  <script>
    let vm = new Vue ({
        el:"#app",
        data:{isShow:false},
        methods:{
            toggle(){
                this.isShow = !this.isShow
            },
            beforeEnter(el){
                // el就是使用的动画的元素对象
                el.style.transform = 'translateX(200px)'
            },
            // 设置元素具体要实现的动画效果以及设置元素执行动画的结束状态
            enter(el,done){
                // 1.调用el.offsetWidth/el.offsetHeight 刷新动画(固定写法)
                el.offsetWidth // 调用这句代码会直接触发浏览器的重绘，然后及时看到动画效果
                // 2. 设置元素需要实现的动画效果以及结束状态
                el.style.transition = 'all 2s ease'
                el.style.transform = 'translateX(0)'
                // 3. 调用done函数及时结束动画效果(固定写法)
                done() // done函数就是afterEnter函数的额引用,调用该函数其实就是直接调用了afterEnter,然后理解结束了动画
            },
            // afterEnter只能做元素的复位操作
            afterEnter(){
                this.isShow = false
            }
        }
    })
  </script>
 ```