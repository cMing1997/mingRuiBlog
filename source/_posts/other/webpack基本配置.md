---
title: webpack的基本配置
date: 2018-4-20
categories: webpack
tags:
  - webpack配置
---

> 这篇文章主要记载，在工作中常用的 `webpack` 配置，因为比较难记，所以做些总结。以便日后查看。

<!-- more -->

### 一、准备工作

 - 1、 `npm install webpack -g`(安装全局)或者 先 `npm init -y` 初始化包记录文件，然后 `npm install webpack -D` (这个是安装到项目目录)
 
 - 2、准备入口文件，然后在项目根文件夹内，建立 `webpack-config.js` 文件。之后一些对于 `webpack` 的配置都会基于这个文件。

### 二、配置阶段。

#### （1）配置 `webpack` 基础设置
 
 - **在 `webpack-config.js`写以下代码。**
 
 - **webpack使用加载器的顺序是从右向左**

  ```javascript
 //1. 导入路径模块
  let path = require("path")
  //2. 配置webpack各项设置
  module.exports = {
    // 3. 入口文件(绝对路径)
    entry: path.join(__dirname,'./src/main.js'),
    // 4. 输出文件
    output: {
       // 2.1 path是用来配置输出文件的路径(一般是使用绝对路径)
        path: path.join(__dirname,'dist'),
      // 2.2 filename是用来指定输出文件的名称
        filename: 'build.js' 
    },
    // 配置所有的加载器
    module:{
          // rules数组是用来存放所有加载器的配置规则
        rules:[
            {
                test:/\.css$/,    // test是一个正则,用来匹配需要解析的文件
                use:["style-loader","css-loader"]  // user用于存放解析文件的加载器
            }]
      }
   ```
  
  - 配置好了之后，就可以在终端cmd上，运行 `webpack` 指令，这样就会在指定目录下，多一个 打包文件，这个时候，就可以将打包文件之后的那个文件引入目标 `HTML` 文件内。**注意：引入文件内路径要是从项目根路径其，一般为 `/bulid.js` **


#### （2）项目常用配置

### 1、`webpack-dev-server`
  
  > 这个可以将我们文件以服务器的形式打开，同时监听所有文件的变化然后自动执行 `webpack` 编译命令以及自动刷新浏览器
  > **配置如下↓↓↓↓**
 
   - **`npm i webpack-dev-server webpack --save-dev`**   进行局部安装 `webpack-dev-server` 和 `webpack`
      
   - 安装完之后，在 package.json 文件内，进行如下配置

   ```javascript
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",

        "dev":"webpack-dev-server --inline --hot --open --port 9999";

     //其中 --inline：刷新浏览器; --hot: 热更新,可以局部更新文件
     // --open: 自动打开浏览器 ; --port: 配置端口号
      },
    ```
  - **运行服务器，使用 `npm run dev`**


###  2、`less/scss/css` 等文件解析打包


   -  解析 `less` ，需要安装 **`npm install less less-loader -D`**

   -  解析 `css`，需要安装 **`npm install style-loader css-loader`**

   -  解析 `scss` ，需要安装**` npm install node-sass sass-loader -D`**

这些解析文件配置如下：

```javascript
   module:{
        rules:[
            {  //1、解析css文件
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },{ //2、解析 less 文件
                test:/\.less$/,
                use:["style-loader","css-loader","less-loader"]
            },{ //3、解析 scss 文件。这个地方需要注意配置，文件后缀名跟解析器名有点不一样
                test:/\.scss$/,
                use:["style-loader","css-loader","sass-loader"]
            }
        ]
    }

```

### 3、`url-loader` 处理图片等静态资源
 
> 解析处理项目中引入的图片、字体图标、音视频等资源文件

> 安装，使用 **`npm install file-loader url-loader -D`**

```javascript
   module:{
       rules:[{
          test:"/\.(png|gif|jpeg|bmp|jpg|TIFF)/",
          use:"url-loader?limit=20000&name=[hash:8]-[name].[ext]"
       }]
    }
// 1、当需要打包的文件小于 limit设置的大小时，打包的文件会以base64的字符串在 `build.js`
// 2、当需要打包的文件大于 `limit` 设置的大小时，会将图片打包到输出目录中
// 3、但是由于如果图片资源太大，放在js文件内，就会拖带js加载变慢，所以一般 `limit` 值不会设置的太大，一般不超过 5k
// 4、name=[hash:8]-[name].[ext]表示将来打包出来的文件名称以8位hash值和原来的名称进行拼接,文件扩展名不变
```

### 4、`html-webpack-plugin`

> 可以根据指定的HTML模板文件生成一个HTML页面,并且在HTML页面中自动引入打包好的js文件

> 安装：**`npm i html-webpack-plugin -D`**

```javascript
  //1、要想使用 html-webpack-plugin 就需要先导入该模块。
  const htmlWebpackPlugin = require("html-webpack-plugin")
  //2、设置配置(这个放在 module 同级下)
  plugin:[
    new htmlWebpackPlugin({

       //template指定，将那个目录下哪个文件当做模板
      template:path.join("__dirname",./src/index.html)

      //filename：表示生成的模板文件名叫啥
      filename:"tempalte.html" 
    })    
  ]
//使用这个模块。可以更便利的监听入口文件的变化。使得引入更灵活
```

### 5、在 `Vue` 中使用 `webpack`

> 起先，我不了解为什么，Vue框架为何要使用webpack，毕竟Vue框架已经很强大了，但是后来查了一些资料了解到，用webpack是为了是Vue开发更适合组件化。这样在使用Vue的时候，就不需要每一个页面都引入，只需要一个入口文件。然后依靠依存关系，这样，就可以当做一个文件，一个组件式开发。

**（1）、使用 webpack中的 Vue 加载器**
> 安装使用：`npm install vue -s` (Vue线上环境也需要)  以及 `npm install vue-loader vue-template-compiler -D` (只是生产环境需要到编译) 

**（2）、在 `webpack-config.js` 配置如下：**

```javascript
module:{
  rules:[
    test:/\.vue$/,
    use:'vue-loader' 
    //这个是告诉webpack，凡是以.vue 结尾的文件，都可以使用模块化加载
  ]
}
```


**（3）、使用：新建app.vue组件**

```html
<template>
    <div>vue组件</div>
</template>
<script>
  export default {
  
  }
</script>
<style>
</style>
```

**（4）、在 `main.js` 入口文件引入创建的 `app.vue` 组件，渲染出Vue组件**

**注意：这里引入文件的方式与之前引入文件不同↓↓↓↓↓**

```javascript
  import Vue from "vue"  //导入Vue的包
  import app from "./app.vue"

  new Vue({
    el:"#app"
    render:c=>c(app) //意为：将app.vue组件渲染在id为app的位置
  })
```

##### 由于Vue是不支持低端浏览器，用的语法很多是ES6，所以存在很多兼容性问题，所以需要用一个编译器将我们写的ES6语法编译成ES5或者更低。

### 6. 在webpack中使用js加载器

```javascript
module.exports = {
 module:{
       rules:[
          {   //解析js加载器
             test:/\.js/,  
              use:"babel-loader",
             // include:[] 这个配置就是告诉webpack，哪些是需要解析
             exclude:[/node_modules/,path.join(__dirname,"/dist")] // 这个配置是告诉webpack哪些文件是不用解析
          }
       ]
  }
}
```

安装上面的配置之后，webpack在内部会去找js写法对照表，会将ES6的写法，转换成ES5或者ES3，那个对照表一般是我们指定

**告诉webpack是哪种对照表**
  - 新建一个文件名为 **`.babelrc`**文件 

配置如下

```javascript
  {
  presets:["env"],  //这个是告诉 webpack 使用env 这个对照表
  plugin:["transform-runtime"]
  }
``` 
