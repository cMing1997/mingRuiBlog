---
title: Vue基础知识（上）
date: 2018-3-5
categories: Vue
tags: 
  - Vue
  - 交互模式
  - 插值表达式
  - 三元表达式
  - 指令
  - Dom操作
  - 自定义指令
  - filter筛选
  - computed
---

> 从今天开始，记录一下学习Vue的笔记

<!-- more -->

## MVC 与 MVVM 模式
**VueJS的交互模式** ---MVVM 交互
> 在这里不得不提下 `MVC` 模式了 
> **MVC：** 既是传统的开发模式，后台将数据提供给前台，然后前台获取到数据，将获取到的数据利用模板或者利用事件将其显示在前台页面上。这种开发模式，会让中间的逻辑代码非常庞大，后期维护非常不利于维护。并且中间的逻辑代码太多，会导致过度依赖 `DOM` 。一旦页面发生变化，那么修改将会变得无从下手

> **MVVM:** 是现在比较流行的开发模式，将逻辑层的代码分出一些代码写在了HTML代码中。这样可以减少一些逻辑层代码的数量。并且可以避免逻辑层代码代码过于臃肿，而且**M(数据层)**跟**V(视图层)**没有耦合，

**MVC：**
![MVC模式](https://i.imgur.com/6c4f96v.jpg)
**mvvm：**
![](https://i.imgur.com/zZd0oQp.jpg)


## Vue中的差值表达式

 - **常见的为 `{{变量名}}` 这种类型的**
 
  ```html
      <div id="box">{{msg}}</div>
  ``` 
 
  ```javascript
     <script src="./vue2.js"></script>
     <script>
        let vm = new Vue({
          el:"#box",
          data:{
            msg:"你好啊？",
          }
        })
     </script> 
  ```

 - **三元表达式(Vue中不能使用if)** 
 
 ```html
     <div>{{isred?"red":"blue"}}</div>
 ```

 ```javascript
    <script src="./vue2.js"></script>
    <script>
       new Vue({
          el:"#box",
          isred:true,
       }) 

    </script>
 ```


## Vue中常见的指令

> Vue中的指令一般是以 v-xxx 这种格式的。

 - **v-text="变量名"**

```html
  <div v-text="msg" id="box"></div>  <!--结合下面的js代码最后结果应该为 <div id="box">我是不是最棒的？</div> -->
```

```javascript
   <script src="./vue2.js"></script>
   <script>
      let vm = new Vue({
         el:"#box" 
//el的值可以填写class选择器，也可以是DOM元素(document.getElenmentById("box")),el的作用就是标识出这段数据是作用在哪个区域。
         data:{
         msg:"我是不是最棒的?"
        }
      })
   </script>
```

 - **v-html="变量名"** 
   
   - 跟上面的 `v-html` 一样的用法，不同的是，如果上面数据里的 `msg` 变量带HTML标签的时候，它会解析变量值中的标签
 
 
 - **v-bind:属性="变量名"** --- 绑定普通的数据
 
```html
   <div id="box">
    <img v-bind:src="auter" art="测试图片"/>
<!--最后结果应该是 <img src="./images/ceshi.jpg" art="测试图片"/> -->
   </div>
```

```javascript
   <script src="./vue2.js"></script>
   <script>
      let vm = new Vue({
         el:"#box" 
//el的值可以填写class选择器，也可以是DOM元素(document.getElenmentById("box")),el的作用就是标识出这段数据是作用在哪个区域。
         data:{
         auter:"./images/ceshi.jpg"
        }
      })
   </script>
```

  - **v-bind(绑定class类名以及style样式)**
    
     - ** 绑定class类名**
    
    ```html
      <div id="box">
          <p v-bind:class={red:isRed}>isRed</p> 
         //1. 当isRed为true的时候，p的class类名才是red，当isRed为false的时候，p没有class类名
        
        <div v-bind:class="[classA, classB]">classA, classB</div>
        //2. 这样写是将变量classA以及变量classB的值作为div的class类名 结果为   <div v-bind:class="A B">classA, classB</div>

        <div v-bind:class="[classA,{classB:isB, classC:isC}]"></div>
        //3. 给同一个元素绑定多个类名的时候，当变量classB和classC的值都为true的时候，classB以及classC才起作用
      </div>
    ```

    ```javascript
       <script src="./vue2.js"></script>
       <script>
          let vm = new Vue({
             el:"#box" 
    //el的值可以填写class选择器，也可以是DOM元素(document.getElenmentById("box")),el的作用就是标识出这段数据是作用在哪个区域。
             data:{
             isRed:true,
             classA:"A",
             classB:"B",
             isB:true,
             isC:true,
            }
          })
       </script>
    ```
    - **绑定style样式**
    
    ```html
       <div id="box">
         <div v-bind:style="{color:red}"></div>
         <div v-bind:style="[styleA,styleB]">styleA styleB</div>
       </div>
    ```
    
    ```javascript
       <script src="./vue2.js"></script>
       <script>
          let vm = new Vue({
             el:"#box" 
    //el的值可以填写class选择器，也可以是DOM元素(document.getElenmentById("box")),el的作用就是标识出这段数据是作用在哪个区域。
             data:{
             red:"#f20",
             styleA:{fontsize："20px"},
             styleB:{color:"#f20"}
            }
          })
       </script>
    ```

  - **v-model(双向数据绑定) (vue --> html --> Vue)**

> 这个双向数据绑定，只能给拥有value属性的元素绑定。

> 双向数据绑定，其实就是 Vue 里的 `data` 数据，影响页面，页面上的 HTML 里元素的 `value` 值影响Vue。


  ```html
       <div id="box">
        <input type="text" v-model="uName"/>
       </div>
  ```
    
  ```javascript
     <script src="./vue2.js"></script>
     <script>
        let vm = new Vue({
            el:"#box" 
    //el的值可以填写class选择器，也可以是DOM元素(document.getElenmentById("box")),el的作用就是标识出这段数据是作用在哪个区域。
            data:{
            uName:"请输入你的名字",
           }
        })
    </script>
```

 - **v-on绑定事件**

   - **绑定具体事件**
  
  ```html
     <body>
          <div id="box">
              <input type="text" v-bind:value="msg">
              <input type="button" value="点击改变" v-on:click='onchage'>
          </div>
     </body>
     <script src="./vue2.js"></script>
     <script>
        new Vue({
            el:"#box",
            data:{
                  msg:'往手机'
            },
            methods:{
               onchage:function(){
                   this.msg = "网友"
               }
            }
       })
     </script>
  ```
 
  - **v-show以及v-if**
  
   - **相同点**
     - 接收的值都为布尔值，如果接收的值为true，那么就显示绑定该指令的元素，如果为false，那么就会消失 

   - **不同点**
       - `v-if` 是改变DOM元素消失与显示， `v-show` 是通过改变元素的style中的 `display` 属性来改变元素显示隐藏。
       - v-if还可以跟v-else-if以及 v-else连用，这样可以达到原生js中的if...esle if..else这样的效果
   
   - **如果是涉及到大量的DOM操作，使用 `v-show` ,如果是涉及到元素需要请求数据然后再作显示，那么就使用 `v-if`,平常优先使用 `v-show`**


### v-bind和v-model的异同

 - **不同点**

  - **v-bind可以绑定任意属性**
  
  - **v-model只能绑定含有 `value` 属性的元素**
  
  - **v-bind是单向绑定数据**
  
  - **v-model是双向绑定数据**


 - **相同点**

   - **v-bind和v-model都有给元素绑定属性值的特性** 


 ### 自定义指令

> Vue内部提供了一个函数，可以将自定义的指令挂载到 Vue 上。

> 如果是创建私有指令。那么就需要写在 `Vue` 实例里 ,那么就可以在 Vue 实例中使用 **`directives()`** 。如果是要创建公共指令，那么就可以使用 **`Vue.directive()`** 

> **inserted() 函数是指令插入到 DOM 节点的时候（即页面渲染完之后就会立马执行），就会执行**

> **自定义指令里还有一个函数，`updata()` 函数，这个函数是当绑定指令的值改变时就会被触发，它不止执行一次！**


 ```html
   <div id="app">
        编号:<input type="text" v-model="newId" ref="refInput" v-color="color">
   </div>
  <script>
//Vue.directive()方法需要穿两个参数，参数1，自定义指令的名字，
//参数2，为一个对象，里面的 **inserted** 属性需要给一个函数，该函数就是绑定自定义指令之后，被执行的命令。
//该函数需要传两个参数进去，参数1为绑定的元素，参数2，包含了绑定元素的信息，参数2的 Value 值就是绑定自定义指令的变量值
      Vue.directive("color",{ //只要给元素绑定v-color,inserted内的函数就会被执行
         inserted:function(el,binding){
            console.log(el),  //el为当前绑定自定义指令的元素
            console.log(binding)  //binding 是一个对象，其中包含了一些当前元素的信息。包含value，以及绑定的自定义指令的名字
            el.style.color=binding.value //将设置的颜色变量设置给当前元素的字体颜色上
        }
      })
      let vm = new Vue({
          el:"#app",
          data:{
           color:"red",
           newId:""           
         },
     })
   </script>
 ```

### Vue中提供操作dom的方法

> 利用Vue 中的ref属性

```html
  <!--不过在使用ref的时候，需要用到Vue中一个生命周期函数 mounted 这个生命周期函数，是由Vue内部提供的，当元素加载完之后，自动触发函数 -->

  <div id="app">
      编号:<input type="text"  ref="refInput"> <!--ref为Vue提供的指令，值作为用来区分 -->
  </div>  <!--需求：当页面加载完之后，input输入框获取焦点-->

  <script>
    //由于这个函数是由Vue内部提供的，所以需要写在new出来的实例里面
   let vm = new Vue({
      el:"#app",
      mounted(){
        console.log(this.$refs) //这个可以获得所有绑定ref指令的元素
        this.$refs.refInput.focus()
      }
    })
  </script>
```


### 利用 Vue 中的 `filter` 进行筛选元素

> `filter` 过滤器一般用在**差值表达式**，跟 **`v-bind`** 中

```html
<div id="app">
   <!--变量ctime与函数之间的 | 为管道 -->
    <span>{{ctime | editDate("/")}}</span> 使用 filter 过滤时间之后结果为</span> 2018-9-6 </span>
</div>
<script>
    let vm = new Vue({
      el:"#app",
      data:{
       ctime:new Date(),
      <!--ctime的格式为  2018-09-06T12:28:39.055Z -->
      }
      filters:{  
   <!-- 定义在 VM中的filters对象中的所有过滤器都是私有过滤器 -->
        editDate(item){
          let Y = this.ctime.getFullYear();
          let M = this.ctime.getMonth()+1;
          let D = this.ctime.getDay();
          return Y+"-"+M +"-"+D 
        }
      }
    })
</script>
```

### Vue中的computed

> 用来定义随依赖数据改变而改变的属性

> 优点是 它会缓存数据，如果所依赖的数据没有变化，那么他就不会重新计算，性能相对watch来说要好一些


```html
   <div id="app">
        <input type="text" v-model="firstname">
        <input type="text" v-model="lastname">
        <p>{{addData}}</p>  
   <!-- 需要放值的地方用差值表达式将computed定义的函数放在里 -->
   </div>
  <script>
   let vm = new Vue({
       el:'#app',
       data:{
           firstname:"",        
           lastname:"",
       },
       computed:{
          addData(){
              console.log(this.firstname+this.lastname);
              return this.firstname+this.lastname  //ruturn 出去的值就是放在HTML代码中差值表达式的值
          }
       }
   })
  </script>
```