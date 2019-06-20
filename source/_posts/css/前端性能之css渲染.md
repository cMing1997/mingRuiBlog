---
title: 前端性能之css渲染
date: 2018-12-30
categories: 前端性能
tags:
  - 性能
  - css
---

> 前端性能分很多方面，这篇主要介绍一下自己理解的 **`CSS`** 页面渲染方面的性能提升

<!-- more -->


### 页面渲染过程

 - **`html`** 代码被 **`HTML`** 解析器解析成 **`DOM`** 树
 - **`css`** 代码被 **`css`** 解析引擎解析成 **`css`** 样式树
 - 将 **`css`** 样式树和 **`DOM`**树整合，生成渲染树
 - 将根据渲染树样式，进行计算，生成最终的布局
 - 浏览器引擎将计算后的布局，绘制出来，呈现在用户面前

![](https://i.imgur.com/lqXK2Zq.png)


### 页面渲染小常识

 - **`CSS`** 是页面渲染的关键因素之一，（当页面存在外链 **`CSS`** 时，）浏览器会等待全部的 **`CSS`** 下载及解析完成后再渲染页面。关键路径上的任何延迟都会影响首屏时间，因而我们需要尽快地将 **`CSS`** 传输到用户的设备，否则，（在页面渲染之前，）用户只能看到一个空白的屏幕。
 - 网页生成的时候，至少会渲染一次。
 - 在用户访问的过程中，还会不断重新渲染。
 - 重新渲染需要重复之前的第四步(重新生成布局)+第五步(重新绘制)或者只有第五个步(重新绘制)。
 - **重排** 比 **重绘** 影响大

#### 重排（回流）：当DOM的变化影响了元素的几何信息(DOM对象的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。

###### 引起重排的原因：任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发重排，例如

 - 添加或者删除可见的DOM元素；
 - 元素尺寸改变——边距、填充、边框、宽度和高度
 - 内容变化，比如用户在input框中输入文字
 - 浏览器窗口尺寸改变——resize事件发生时
 - 计算 offsetWidth 和 offsetHeight 属性
 - 设置 style 属性的值

#### 重绘：当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

 - **引起重绘的一些属性：**

![](https://i.imgur.com/BasPRm8.png)

##### 浏览器渲染机制

> 当我们修改了元素的几何属性，导致浏览器触发重排或重绘时。它会把该操作放进渲染队列，等到队列中的操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行这些操作。

```
 div.style.width = "30px";
 div.style.height = "30px";
 div.style.left = "30px"; 
 div.style.top = "30px";
//这只会渲染一次
```

> **强制刷新渲染队列：**比如我们在渲染过程中，获取或者计算样式信息，无论何时浏览器都会立即执行渲染队列的任务，即使该值与你操作中修改的值没关联。

```
 div.style.width = "30px";
 console.log( div.style.width );
 div.style.height = "30px";
 console.log( div.style.height );
 div.style.left = "30px"; 
 console.log( div.style.left )
 div.style.top = "30px";
 console.log( div.style.top );

 //渲染四次
```

#### 影响渲染性能的点

 - 重排
 - 浏览器直到渲染树构建完成后才会渲染页面；
 - 渲染树由 DOM 与 CSSOM 组合而成；
 - DOM 是 HTML 加上（同步）阻塞的 JavaScript 操作（DOM 后的）结果；
 - CSSOM 是 CSS 规则应用于 DOM 后的结果；
 - 使 JavaScript 非阻塞非常简单，添加 async 或 defer 属性即可；
 - 相对而言，要让 CSS 变为异步加载是比较困难的；

> 所以记住这条经验法则：（理想情况下，）最慢样式表的下载时间决定了页面渲染的时间。

### 基于上面的一些基础知识可以总结一下优化性能的点

##### 1、减少重排

-  分离读写操作
 ```js
 div.style.width = "30px";
 div.style.height = "30px";
 div.style.left = "30px"; 
 div.style.top = "30px";

 console.log( div.offsetLeft )
 console.log( div.offsetheight );
 console.log( div.offsetwidth );
 console.log( div.offsettop );
 ```

-  样式集中改变
  ```
 div.style.width = "30px";
 div.style.height = "30px";
 div.style.left = "30px"; 
 div.style.top = "30px";
  ```
-  缓存布局信息

  ```
    // bad 
    div.style.left = div.offsetLeft + 1 + 'px';
    div.style.top = div.offsetTop + 1 + 'px';
	// good 缓存布局信息 相当于读写分离
	var curLeft = div.offsetLeft;
	var curTop = div.offsetTop;
	div.style.left = curLeft + 1 + 'px';
	div.style.top = curTop + 1 + 'px';
  ```
-  离线改变dom
  - 隐藏要操作的dom
  - 通过使用 **`DocumentFragment`** 创建一个 **`dom`** 碎片,在它上面批量操作 **`dom`** ，操作完成之后，再添加到文档中，这样只会触发一次重排。
  - 复制节点，在副本上工作，然后替换它
  
-  position属性为absolute或fixed

> 当该元素设置了定位之后，就会脱离文档流，当再改变该元素的样式的时候，就只是局部重排了。对大体上的影响很小


-  优化动画
 -  启用 **`GPPU`** 加速：Canvas2D，布局合成, CSS3转换（transitions），CSS3 3D变换（transforms），WebGL和视频(video)；

##### 2、优先加载关键 CSS，懒加载其他 CSS；

> 找出首次渲染所需的样式（通常是首屏相关的样式），将它们内联到 <head> 标签中，其他样式则通过异步的方式进行加载。

##### 3、根据媒体类型拆分代码

> 根据媒体查询拆分 CSS 文件，这样浏览器就会：
> 1. 以非常高的优先级下载符合当前上下文（设备、屏幕尺寸、分辨率、方向等）的 CSS 文件；
> 2. 阻塞关键路径；
> 3. 以非常低的优先级下载不符合当前上下文的 CSS 文件，不会阻塞关键路径。

```
	<link rel="stylesheet" href="all.css" media="all" />
	<link rel="stylesheet" href="small.css" media="(min-width: 20em)" />
	<link rel="stylesheet" href="medium.css" media="(min-width: 64em)" />
	<link rel="stylesheet" href="large.css" media="(min-width: 90em)" />
	<link rel="stylesheet" href="extra-large.css" media="(min-width: 120em)" />
	<link rel="stylesheet" href="print.css" media="print" />
```

![](https://i.imgur.com/nPR9hEz.jpg)

> 浏览器仍然会下载全部的 CSS 文件，但只有符合当前上下文的 CSS 文件会阻塞渲染。

##### 4、在 HTML 文档中应该避免使用 `@import`，在 CSS 文件中更应避免使用 `@import`，以及警惕预加载扫描器的怪异行为。

 - **`@import` 渲染过程**
  - 下载 HTML；
  - 请求并下载依赖的 CSS；下载及解析完成后，本该是构造渲染树，然而；
  - CSS 依赖了其他的 CSS，继续请求并下载 CSS 文件；
  - 构造渲染树。

 - 如果你没有包含 **`@import`** 的 **`CSS`** 文件的修改权限，为了让浏览器并行下载 **`CSS`** 文件，可以往 **`HTML`** 中补充相应的 **`<link rel="stylesheet" src="@import的地址" />`**。浏览器会并行下载相应的 **`CSS`** 文件且不会重复下载 **`@import`** 引用的文件。

 - 在 **`HTML`** 中使用 **`@import`**，在以 **`WebKit`** 与 **`Blink`** 为内核的浏览器中，可能会触发它们预加载扫描器的 bug，在 **`Firefox`** 与 **`IE/Edge`** 中，则表现低效。

##### 5、在 **`CSS`** 文件后的 **`JavaScript`** 仅在 **`CSSOM`** 构建完成后才会执行；如果你的 **`JavaScript`** 不依赖 **`CSS`**；将它放置于 **`CSS`** 之前；

> 如果 **`JS`** 文件没有依赖 **`CSS`**，你应该将 **`JS`** 代码放在样式表之前。 既然没有依赖，那就没有任何理由阻塞 **`JavaScript`** 代码的执行。


##### 6、仅加载 DOM 依赖的 CSS：这将提高初次渲染的速度使让页面逐步渲染。

```
 <html>
	<head>
	  <link rel="stylesheet" href="core.css" />
	</head>
    <body>
	    <link rel="stylesheet" href="site-header.css" />
		<header class="site-header">
		   <link rel="stylesheet" href="site-nav.css" />
		   <nav class="site-nav">...</nav>
	     </header>
  	     <link rel="stylesheet" href="content.css" />
		 <main class="content">
		   <link rel="stylesheet" href="content-primary.css" />
		   <section class="content-primary">
		     <h1>...</h1>
		     <link rel="stylesheet" href="date-picker.css" />
		     <div class="date-picker">...</div>
		   </section>
		   <link rel="stylesheet" href="content-secondary.css" />
		   <aside class="content-secondary">
		     <link rel="stylesheet" href="ads.css" />
		     <div class="ads">...</div>
		   </aside>
		 </main>
		 <link rel="stylesheet" href="site-footer.css" />
		 <footer class="site-footer"></footer>
   </body>
</html>
```
> 这样的结果是我们能逐步渲染页面，当前面的 CSS 可用时，页面将呈现对应的内容,（而不需等待全部 CSS 下载并解析完毕）。