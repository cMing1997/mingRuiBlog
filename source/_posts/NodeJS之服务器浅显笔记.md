---
title: NodeJs之服务器浅显笔记
date: 2018-2-17
categories: Node
tags: 
  - Node
  - 服务器搭建
  - 路由
  - express框架
  - ejs模板
  - 后端的art-template
  - 中间件
---

> 基于上两篇文章，也积累了一些对于 Node 的了解。这篇文章主要记录在学习node的一些笔记心得

<!-- more -->

#### 服务器与客户端，前端与后端，动态资源与静态资源

**1.** 客户端一般属于终端产品，用户在自己的电脑客户端上，请求网站或者应用的数据，然后由程序将用户的请求，发送给服务器，服务器根据用户的请求，作出相应的处理，处理完之后，将处理完的数据返还到用户的客户端，客户端的终端产品将服务器返还的数据信息作出处理，展现给用户。

**2.** 前端将所设计的图纸用代码的形式展现出来，一般用户看到的多是前端代码，然后当需要数据变化的地方或者需要进行跟后台的数据库进行沟通的时候，就将需求发送给后端，后端接收前端发送的需求，按照需求作出相应的处理，然后返还给前端。前端根据后端返还的数据，将数据转化成用户能看懂的页面。

**3.** 
 - 静态资源，一般指图片或者已经写好的css,js等只需要服务器读取，不需要作出相应的处理，返还给前端的资源。
 - 动态资源，一般指需要服务器动态获取的，比如，数据库的数据。



#### 用NodeJS搭建简单的服务器。


```javascript
    const http = require("http");
    const server = http.createServer();
    server.on('request',(req,res) => {
    	res.writeHeader(200,{
    		"content-type": "text/html; charset=utf8"
    	})
    	res.end("你好，我是服务器")
    });
    server.listen(3000,'127.0.0.1',function (res) {
    	console.log("启动了！")
    })
```

![](https://i.imgur.com/HlOtpQb.png)

简单来说，创建服务器分四步

- 引入服务器模块 `http`

- 然后创建一个服务器对象 `const server = http.createServer()`

- 利用创建的服务器对象调用 `request` 事件，监听用户的请求。
   **其中 `request` 有两个参数，**
 - 参数1可以获得用户请求的所有数据。
 
 - 参数2 将数据返还到客户端。

- 虽然调用了 `request` 事件，但是不代表服务器开启了。最后调用 `listen` 事件，开启服务器，设置服务器的请求端口。IP地址，以及开启之后的处理函数。


## 路由是什么？

> 路由其实就是根据信息，返还对应的信息。也可以说是对应关系。

> 后端路由：就是根据前台发送的数据请求，返还一些对应的数据。

**路由有什么用？**
可以根据前台请求的不同地址，返还不同的信息。

```javascript
  const http = require("http");
  const server = http.createServer();
  server.on('request',(req,res) => {
  	res.writeHeader(200,{
  		"content-type": "text/html; charset=utf8"
  	})
  	if(req.url==="index.html"){   
//req.url方法可以获得前台请求的url地址。然后可以根据请求地址的不同，返还给用户不同的页面。
  		res.end("你好，我是首页")
  	}
  	if(req.url==="about.html"){
  		res.end("你好，我是关于我页面")
  	}
  	if(req.url==="movie.html"){
  		res.end("你好，我是影视页面")
  	}
  	if(req.url === "/"){
  		res.end("你好，我是首页")
  	}
  });
  server.listen(3000,'127.0.0.1',function (res) {
  	console.log("启动了！")
  })
```

虽然利用上面的方法，可以设置多个路由。然后根据前台请求的地址，展现给前台不同的数据。但是一个项目需要请求的地址太多，然后都是这么设置的就很麻烦，所以就衍生了框架。


## experss框架

> 基于原生Node方法的封装，兼容原生，但是更优于原生，它主要封装了NodeJS中的 `http` 模块。


## express框架的使用

- 要使用，那么第一步肯定要安装 `express` 到本地

- 因为 `express` 以包为概念，那么要使用该框架，那么就需要引入该模块 `const express = require('express') `

- 引入之后，创建 `express` 封装的服务器实例对象。`const app =express() `

- 然后利用创建的服务器对象 `app` 下的 `get` 对象跟 `post` 对象，用来监听用户是用 `get` 请求。还是 `post` 请求。

- 最后利用创建的服务器对象下的 `listen`对象开启服务器。


```javascript
  const express = require("express");
  const app = express();
  app.get("",function (req,res) {
  	res.writeHeader(200,{
  		"content-type":"text/html;charset=utf8"
  	})
  	res.end("你好啊");
  });
  app.post("/index.html",(req,res)=>{
    res.send("这是首页");
  })
  app.listen("3000",function(){
  	console.log("服务器开启了");
  })

```


## express中的 res.send()方法

  - 如果发送的是普通字符串，那么就会直接显示字符串

  - 如果发送的是对象或者数组，那么显示的就是json类型的字符串

  - 如果发送的是二进制数据，那么前台显示的就是下载功能。


**express框架与原生开启服务器的异同**

 - **相同点**
   -  都是需要 `listen` 方法开启服务器。
   
   -  监听前台的请求时，都有两个参数（用户请求的参数1，服务器返还的参数2）
   
   -  都可以用  `res.writeHeader(200,{"content-type":"text/html;charset=utf8"})` 设置返还到客户端的编码格式。
   
   -  都可以使用 `res.end("要返还的数据")` 给前台发送数据。

 - **不同点**
 
   -  express 框架可以使用原生的一些方法，原生的不能使用框架的方法。
   
   -  express 框架可以利用 `get`跟 `post` 对象，判断用户是请求的哪个路由，用的什么请求方式。
   
   -  express 框架支持返还的数据种类比原生更多
  
   -  express 框架可以对原生兼容。

   - 当网站中很多数据需要读取，返回到前台的时候，利用文件读取 `readFile` 就不够了，express 框架里 `express.static("静态资源目录")` 就可以一件托管所有的静态资源
     
       - **语法1：** `app.use(express.static("/pulic"))`
        -  `app.use` 方法是用来注册中间件
        -  `express.static("/pulic")` 是 express 的内置件。
        
       - **语法2：** `app.use('/虚拟目录', express.static('public'))`
         -  可以在托管静态资源文件的时候，指定要挂载的虚拟路径；


## 通过获取到的数据，动态渲染页面，实现后端渲染


#### ejs 模板

> ejs是一种JavaScript的模板库，适合将json格式的数据，生成HTML字符串。

1. 安装 `ejs` 模板引擎 `npm install ejs -s`

2. 然后使用 `app.set()` 设置默认模板 `app.set("view engine","ejs")`  
   
   - **其中设置参数1：`view engine` 是固定写法。**
   
   - **参数2是告诉服务器，使用的是什么模板引擎。**

3. 然后需要设置 `app.set()` 设置模板的文件路径 `app.set("views" ,"./ejs_pages")`
    - 设置模板路径的时候，有两个参数
    
    - **参数1：`views` 固定写法。**
    
    - **参数2： `具体的文件路径` 比如：`./ejs_pages`**

4. 最后当用户请求一个页面的时候，用 `res.render()`将数据同模板转成HTML字符串。
    - 使用res.render()方法 有两个参数。
    
    - **参数1：模板文件名。**
    
    - **参数2：取到的数据。**


```javascript
   const express = require("express");
   const app = express();
   
   app.set("view engine","ejs");
   
   app.set("views","./ejs_pages");

    app.get("/",(req,res)=>{
        res.render("index.ejs",{name:"zs",age:18,hubby:["codding","唱歌","睡觉"]})
    });

    app.listen("3000",()=>{
    console.log("服务器开启了") 
    })
```


## express框架中使用art-template模板。

 1. 安装`art-template` 包。`npm install art-template express-art-template -S` 
 
 2. 定义模板 `app.engine("自定义模板的名称","渲染函数")`  
 
 3. 然后将定义的模板配置为 `express`的默认模板 `app.set("view engine","上面自己定义的模板引擎名称")`
 
 4. 最近定义一下模板存放路径 `app.set("views","路径")` 
 
![](https://i.imgur.com/9GtFbwH.png)


## 配置路由以及如何在服务器中使用路由模块


**1. 创建自定义的路由(router.js)**
 
 ```javascript
  //引入 express 模块
  const express = require("express");
  //利用express对象的里的Router方法，创建路由对象
  const router = express.Router();
  //利用创建的路由对象，监听用户的请求。
  router.get("/",(req,res)=>{res.send("你好啊")});
  router.get("/movie",(req,res)=>{res.send("快活啊！")});
  router.get("/about",(req,res)=>{res.send("俺是正经人家！")});
  module.exprots = router;
 ```


**2. 使用自定义的路由**

```javascript
  const expresss = require("express");
  const app = express();
  const router = require("./router.js"); //如果不想引入后缀，可以新建 node_modules 的文件夹，将router.js放在里面。
  app.use(router) //使用app.use中间件，注册路由。
```


## 中间件

**1. 中间件是什么？**
> 中间件其实就是个函数，可以理解为中转站。里面有三个参数
> 参数1:**req：请求对象**
> 参数2:**res：响应对象**
> 参数3:**next：是个函数，可以表示下一个中间件的调用**

**2.中间件有那几个分类？**
 
  - **应用型中间件**，可以挂到app对象上，`app.get("/",(req,res,next)=>{})`
  
  - **路由型中间件**，可以挂到路由对象上，`router.get("/",(req,res,next)=>{})`
  
  - **错误型中间件**，是回调函数，通常用 `app.use((err,req,res,next()=>{}))`
  
  - **唯一的内置件：** `expres.static()` 可以托管指定目录下的静态资源

  - **第三方中间件：**一般为非官方提供的。