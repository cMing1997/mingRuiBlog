---
title: React的基础知识
date: 2018-10-16
categories: react学习记录
tags:
  - React
---

> 记录一下自己学React的笔记

<!-- more -->

### react能干啥？

>  react最大的优势就是可以更方便的声明组件，复用组件

- react声明组件的方式，使用 ES6 的 `class` 声明组件，然后使用

```js
class Some extends React.component{
  render () {
   return(
     <div>
      <p>人生若只如初见，何事悲风秋画扇</p>
     </div>
   )
  }
}
```
- 上面代码意思为：使用 `class` 创建一个 `Some` 的组件，扩展到 `react` 的组件库中， `extends`（扩展，拓展）

- 然后使用 `render` 函数渲染内部代码

- 最后使用 `return` 方法返回组件内的结构代码

- 这样导入该组件，就相当于导入该组件内的样式以及结构代码


**导入组件**

```js
  import Some from '组件文件路径'  
// 注意，要想在其他的文件内使用公共组件，那么在声明组件的时候，
// 就需要使用 `exprot default` 导出该声明的组件
```

### 组件之间传值

**props：接收组件之间传值的**

```js
  class Some extends React.Component{
   constructor(props){
       super(props)
       this.state={
          msg:'红尘啊滚滚'
      }
   }
 }
```
- 在 `extends` 实现继承创建的组件中，就得在 `constructor` （构造器）中使用 `super(props)`

- `super()` 表示父类的构造函数

- 在 `render` 函数内可以通过 `this.props.属性名` 获得从父组件传递过来的参数

- 如果是在 `render` 函数外访问父组件传递过来的参数 ，那么就需要传递参数到 `constructor` 内

```js
  constructor(props){
    super(props)
    console.log(props)
 }
```

- 在 `constructor` 访问父组件传递过来的属性，直接使用 `props` 就可以获得传递过来的值

- `props` 接收过来的值，不管是在使用 `function` 创建的组件，还是 `class` 创建的组件中，都是只读的


**state：用于存储每个组件的私有数据的**

**存储**

```js
   constructor(){
      super()
      this.state={
        msg:'故人心尚永，故心人不现'
      }
   }
```

- `this.state={}` 这个是固定写法

**使用state**

```js
   render(){
    return(
      <div>{this.state.msg}</div>  //渲染之后为<div>故人心尚永，故心人不现</div>
    )
   }
```

**使用外界传递的值props**

```js
//父组件中
<Some address='学海无涯，回头是岸。放下屠刀，立地成佛，哦弥陀佛，善哉善哉'/>

//Some组件内
   render(){
    return(
    <div>{this.props.address}</div>  
//渲染后： <div>学海无涯，回头是岸。放下屠刀，立地成佛，哦弥陀佛，善哉善哉</div>  
    )
  }
```

### react中绑定事件

**on+事件名 使用驼峰命名方式**

```js
  render(){
    return(
    <div onClick={this.headerClick}></div>
   )
 }
```
**注册事件**

```js
  class Some extends React.Component{
    headerClick(){
      console.log("夜里挑灯看剑，梦里吹角连营")   
    }
    render(){
      return(
        <div><h1>我是一个小菜鸟，怎么飞啊飞，飞呀飞不高</h1></div>
      )
    }
  }
```

- 在 `react` 规定函数内部，`this` 指向的是 `undefined` 如果要在函数内使用 `this`，那么就必须使用箭头函数，使得 `this` 指向外部创建的组件实例

- 在每一个组件中，`this` 指向的为当前组件对象


#### 事件中修改数据

- **直接使用 `this.state.msg="这是一个测试代码" `**

```js
 headerClick(){
  this.state.msg="在哪里跌倒，在哪里趴会儿"
 }
```

> **注意：**使用 `this.state.msg` 虽然能修改数据，但是不会更新到视图中，这是 `react` 的一个 `bug`

- **使用 `this.setState({})` 改变值（推荐使用这种）**

```js
 headerClick(){
  this.setState({msg:'贫穷限制了我们的想象力'
  })
}
``` 

> **`this.setState()`** 是覆盖原来定义的值


**使用setState()的时候，可以传递函数**

```js
  this.setState(function(oldDate,props){
   return{ msg:124 }
})
```
- 函数中：`oldDate` 为设置之前设置的值 
- `props` 为外界传递进来的参数数据

> 由于 `setState` 是异步执行，所以，执行 `this.setState()` 设置值之后，想立马拿到，那么就需要放在 `setState()` 里的第二的参数回调内


```js
  this.setState(()=>{
    return{ msg:125 }
  }, ()=>{ console.log(this.state.msg) })
```