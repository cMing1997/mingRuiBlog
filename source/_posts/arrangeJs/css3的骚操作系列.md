---
title: css3的骚操作系列
categories: 重学前端系列笔记
tags: [函数,CSS3]
cover: "https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/0628.jpg"
date: 2019/6/28 16:12:28
---
> css3提供了很多有用的东西，虽然兼容性问题有很多，但是可以研究一下的，这次趁着不忙，就总结一下css3里面的一些函数骚操作

<!-- more -->

### 前言
> css3中出现了很多骚操作，比如，定义变量，函数啊什么的，之前一直都是用的时候找一下，没有系统性的做总结。


<a name="gk8Gu"></a>
#### 1. 定义变量（var()）
> 其实在 **`scss`** 跟 **`less`** 还有 **`styl`** 等预处理语言中，都可以自定义变量。但是无奈，这些语言最终还是要编译成 **`css`**  才能运行。但是在 **`css3`** 中可以自定义变量，然后使用 **`var()`**  就可以使用

```css
body{
     font-size:12px;
     --fontSize:34px; // 定义变量
     --marginTop:30px;// 定义变量
}
:root{
	--fontSize:20px;
   --color:#278;
}
span{
    font-size: 12px;
}
span{
   font-size: var(--fontSize);// 使用变量
}
```
上面的以 **`--`** 双划线开头的便是定义的变量了，然后使用 **`var(变量名)`** 就可以
<a name="qPsC0"></a>
##### 变量定义在类名内
这里注意：变量可以定义在类名内，如果有这个类名就可以使用变量，如果没有就无法使用，这个其实有点鸡肋，因为类名也可以办到这件事。
```html
<style>
   .test{
        --background-color:red;
    }
    div{
        color: var(--background-color);
    }
    .one{
        color: var(--background-color);
    }
</style>

<div>32445354435345</div>
<div class="test one">32445354435345</div>
```
> **`var()`** 函数可以接受两个参数。第一个参数是定义的变量名，第二个是当变量不存在的时候使用的默认值。

<a name="2niLE"></a>
#### 2. 加减乘除算法 calc()

- **`calc(formula)`** 可以支持 加减乘除 四则运算
- 其中 **`formula`** 可以是四则运算中的任何符合规则的表达式
- 运算表达式中，允许出现单位
- **但是表达式中，四则运算的符号两边必须有空格**
```css
main{
  height:calc(100vh - 100px);
}
```
<a name="AIj5M"></a>
#### 3. attr()可以获取HTML结构上定义的属性值
> **`attr()`** 表达式可以用于任何CSS属性

```html
<div data-title="做咸鱼虽然不好，但是很好吃啊">
  做咸鱼虽然不好，但是很好吃啊
</div>

<style>
  div{
  	position: reactive;
  }
  div::after{
  	content:attr(data-title);
    position: absolute;
    left:0px;
    top:-100%;
    transform:translateY(-50%);
    display:none;
  }
  div:hover::after{
  	display:initial;
  }
</style>

```
<a name="Pohlx"></a>
#### 4. Counters()用来计数的函数

- **`counter-increment`** ：MDN上并没给出一个准确的中文翻译，我认为这个属性是定义计时器的变量的名字。以及计数之间是以什么形式展示。

这个属性有两个值，第一个值定义计数器的名字，**第二个是计数的初始数字，如果没写默认是从1开始的。如果写了，那么初始数字就是规定的数字，并且数字间隔之前相隔的也是规定的数字。**<br />例如：
```css
 counter-increment:counterName 2 /*这个是表示计数器的名字叫counterName 并且每次两个数之间相差2*/
```

- **`counter-reset`** ：设置计数器的标识作用域，可能说这个不好理解。其实就是当一个页面有多个计数器的时候，但是又不相同的时候，每一个相同的计数器编为同一组
```css
counter-reset:counterName 0 /*这个是定义计数器的边界标识，以及计数的初始数字是多少*/
```
这个属性是具有两个值的，第一个定义计数器的名字边界，第二个定义计数的初始数字，不过展示的结果是需要在定义的初始数字上加上一个默认数字 1 。<br />**当 `counter-increment和counter-reset` 设置的初始数字不同的时候，会以 `counter-increment` 的初始数字为主，不过数字之前相隔为0**<br />**计数器使用：**
```css
div::before{
	content:counter(counterName); // 一般是这么使用就可以， MDN 上这个函数显示有三个参数，第二个为连接词，第三个为
}
```

<a name="Z3dl9"></a>
#### 5. filter()图片滤镜效果
> 这个函数接受两个参数。第一个参数为图像的地址。第二个为过滤器

```css
background: filter(url(path/to/img.jpg), blur(5px));
```
**`filter()` 不能与 `filter` 属性做混淆，虽然函数的第二个参数过滤器可以参考filter属性的值**

说到这里就不得不提一下 **`filter`** 属性了
<a name="NQRIC"></a>
##### filter属性

- **`blur(5px)`**  模糊
- **`brightness(1.4)`**  亮度
- **`contrast(200%)`**  对比度
- **`drop-shadow(4px 4px 8px blue)`**  投影
- **`grayscale(50%)`**  灰度
- **`hue-rotate(90deg)`**  色调变化
- **`invert(75%)`**  反相
- **`opacity(25%)`**  透明度
- **`saturate(230%)`**  饱和度
- **`sepia(60%)`**  褐色

**例如:**
```html
<div class="section">section1</div>
<style>
    .section{
      filter: blur(2px);
      width: 500px;
      height: 100px;
      line-height: 100px;
      background-color: #444;
      font-size: 30px;
      color: #fff;
      text-align: center;
  }
</style>
```
效果<br />![snipaste_20190628_111239.png](https://cdn.nlark.com/yuque/0/2019/png/221851/1561691578961-eee7bee3-c754-45c3-94da-7176a14381a9.png#align=left&display=inline&height=117&name=snipaste_20190628_111239.png&originHeight=117&originWidth=522&size=3326&status=done&width=522)

```css
.section{
      filter: invert(90%);
      width: 500px;
      height: 100px;
      line-height: 100px;
      background-color: #000;
      font-size: 30px;
      color: #fff;
      text-align: center;
  }  
```

![snipaste_20190628_111453.png](https://cdn.nlark.com/yuque/0/2019/png/221851/1561691712528-18c23578-5f25-47c4-a5d0-322934cff620.png#align=left&display=inline&height=120&name=snipaste_20190628_111453.png&originHeight=120&originWidth=535&size=3483&status=done&width=535)<br />还是上面这种情况。当你想做出 **`iOS`** 那种遮挡磨砂效果，就可以使用 **`backdrop-filte`** 
```css
.header {
    background-color: rgba(255,255,255,.6);
    backdrop-filter: blur(5px)
}
```
![backdrop-filter-1.gif](https://cdn.nlark.com/yuque/0/2019/gif/221851/1561692876539-7956c861-aa2d-4730-b0da-af9f74e5aabe.gif#align=left&display=inline&height=434&name=backdrop-filter-1.gif&originHeight=434&originWidth=330&size=1362541&status=done&width=330)<br />如图效果：标题 **`<header>`** 后面的每个元素都被5px模糊了。就这么简单。<br />**注意：**

- backdrop-filter应用元素的背景应该是半透明的。否则，你永远不会看到效果。
- 有一个错误，当结合backdrop-filter任何性质作物元件（例如border-radius，mask，clip-path等）。这意味着现在无法实现高级效果。
- backdrop-filter创建一个新的堆叠上下文，就像opacity这样
- 这个属性还存在兼容性问题，在Safari中加前缀： -webkit-backdrop-filter
<a name="vWgrt"></a>
#### 6. cubic-bezier()动画曲线函数
> 其实这个，相信很多人都熟悉，在做 **`animation`** 动画的时候，觉得默认提供的 `**ease、ease-in、ease-out**` 等曲线不满意，就可以使用这个函数绘制指定的动画曲线。也称之为** 定时函数**

贝塞尔函数接受四个参数：P1，P2，P3，P4用来定义起始终点以及完成时间。四个值均为 **`Number`** 范围为 0~1。

说到这个。就不得不提另外一个定时函数 **`step()`** 
<a name="WqNVQ"></a>
##### step() 步进函数
这个函数接受两个参数。第一个参数，步进的总步数，第二个参数为步进的方向是左对齐还是右对齐。
```css
.animation{
  animation:animationName .3s step(4,start) forwards
}
.animation{
  animation:animationName .3s step(4,end) forwards
}
```

[可视化生成贝塞尔曲线](https://cubic-bezier.com/)
<a name="WxlqX"></a>
#### 7. element()设置HTML元素为背景
```html
<div id="css-source"> 
  	 <p>This box uses the element with the #myBackground1 ID as its background!</p>
</div> 
<div id="css-result"></div> 
<style>
 #css-result { 
   background: element(#css-source); background-size: 50% 50%; 
}
</style>
```
这个函数虽然看着蛮吊的，但是兼容性很大大，暂时只有火狐 Firefox 实现了这个功能<br />![snipaste_20190628_135249.png](https://cdn.nlark.com/yuque/0/2019/png/221851/1561701248246-1298546b-4841-4fa0-a6b7-f2d1a0730cea.png#align=left&display=inline&height=144&name=snipaste_20190628_135249.png&originHeight=144&originWidth=1076&size=8959&status=done&width=1076)

<a name="UalO6"></a>
#### 8. shape 图形设置
这个准确来说不是一个函数。准确来说是指一系列的不规则的文字环绕效果，不过需要与浮动配合
<a name="KargH"></a>
##### shape-outside
> 指定使用下面列表的值来定义浮动元素的浮动区域。这个浮动区域决定了行内内容（浮动元素）所包裹的形状。
> **`shape-outside`** 的本质其实是生成几何图形，并且裁剪掉其几何图形之外周围的区域，让文字能排列在这些被裁剪区域之内。

```css
/* 关键字值 */

/* 该浮动区域不产生影响，行内元素以默认的方式包裹着该元素的margin box。*/
shape-outside: none; 
/* 定义一个由外边距的外边缘封闭形成的形状。如果有border-radius,那么形状的大小由content，border，margin，padding还有角的弧度决定*/
shape-outside: margin-box;
/*定义由内容区域的外边缘封闭形成的形状*/
shape-outside: content-box;
shape-outside: border-box;
shape-outside: padding-box;

/* 函数值 */
shape-outside: circle(); // 默认值是圆形
shape-outside: ellipse(); // 默认值是椭圆
shape-outside: inset(10px 10px 10px 10px); // 定义内矩形（包括圆角矩形）
shape-outside: polygon(10px 10px, 20px 20px, 30px 30px); // 定义多边形（包括圆角矩形）

/* <url> 值 */
shape-outside: url(image.png);

/* 渐变值 */
shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);

/* 全局值 */
shape-outside: initial;
shape-outside: inherit;
shape-outside: unset;
```

```html
<div>
  <span class="shape"></span>
	<p>妹妹若是来看我，不要从那小路上来，小路上的毒蛇多，我怕妹妹出了差错。妹妹若是来看我，请你不要坐出租车，起价就是八块多，我怕妹妹带的钱不够。妹妹若是来看我，请你不要来到德云社。德云社里的流氓多，流氓头子他姓郭</p>
</div>
<style>
    div {
    	width: 400px;
    	overflow: hidden;
    }
    .shape {
    	float: left;
    	width: 100px;
    	height: 100px;
    	margin: 10px;
    	background-color: currentColor;
    	shape-outside: circle();
    	clip-path: circle();
    	color: #cd0000;
    }
    p{
    	margin: 0px;
    }
</style>
```
<a name="ACMnM"></a>
##### clip-path
> 可以创建一个只有元素的部分区域可以显示的剪切区域，超出剪切区域的都会被隐藏。并且不占位置。

他的属性值其实也跟 **`shape-outside`**  一样。
