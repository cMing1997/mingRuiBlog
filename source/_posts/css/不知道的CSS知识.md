---
title: 个人积累的css Hack技术
date: 2019-1-2
categories: css知识
tags:
  - css
  - 不知道的css
---

> 虽然 **css** 不是很难，但是它是前端的基本功。 最近在复习 **css** 相关的知识，记录一下不常见的css知识

<!-- more -->

###  一、引入外部字体

```
 //引入
 <link href="字体地址" type="text/css"/>
 
 // 使用
 font-famil：字体名称;
```


### 二、css使用变量

##### 1、定义变量

```
 命名规则：双横线+变量名：--变量名
 例如:
 --peng:skyblue;
```
##### 2、使用变量

```
	h2{
		color:var(--peng);
	}
```
##### 3、使用变量，预防出错，降级

```
	h2{
		color:var(--peng,block)
	}
```

> 当我们使用变量的时候，如果变量名写错了，可以使用预备的属性，不至于设置了，但是什么效果都没有


##### 4、变量可以定义在任何选择器内；但是如果想使用，有以下条件：

**(1) ** 使用的选择器的元素比如包含定义变量的选择器

```
 	例如：
	div{
		--peng:blue;
	}
	.test{
		color:var(--peng)  //可以生效
	}
	h2{
		color: var(--peng) //无法生效
	}
	<div class="test">其实，我是一个演员</div>
	<h2>其实，我是一个警察</h2>
```

**(2)**  可以给父级元素定义变量，使用就必须是他的子集元素

```
	.isFaster{
		--peng:hotpink;
	}
	.why{
		background:var(--peng,red);	 //可以生效
	}
	h4{
		color:var(--peng,red);	 //可以生效
	}
	h5{
		color:var(--peng,red);	 //无法生效
	}
	<div class="isFaster">
		<div class="why">为啥都不相信我啊，我是一个好人啊</div>
		<h4>其实，我是一个好人</h4>
	</div>
	<h5>你个人啊，坏的很！！！！</h5>
```


### 三、选择器

> **:root** 选择器

> 这个选择器类似于根选择器 HTMLM，使用这个选择器，写的属性，会作用在整个文档上



### 四、音视频

> 最开始在在学音视频标签的时候，有个困惑，就是不管是音频标签 **`audio`**，还是 **`video`** 标签，都能直接加  **`src`** 属性，为啥还需要 **`source`**

> 之后一直想，似乎想通了，之所以没有直接在音视频标签上写链接，是为了兼容不同的版本音频

```
<audio>
	<source src="../ceshi.ogg" />
	<source src="../ceshi.mp3"/>
	你的浏览器不支持音频
</audio>
```
###### 1、如果要控制当前视频从4s开始播放

```
<source src="ceshi.mp4#t4" />
```

###### 2、如果要控制视频从5s开始播放，15s停止

```
<source src="ceshi.mp4#t=5,15" />
```

###### 3、如果控制视频在 15S 停止

```
<source src="ceshi.mp4#t=,15" />
```

#### 五、定位

> 由于出于安全考虑，部分浏览器的定位服务，只支持 HTTPS 协议的网站

![](https://i.imgur.com/TZx0kwD.png)


#### 六、动画
 
> 使用 **`animation`**，动画是周而复始的，如果想停在最后一帧动画上

```css
	animation-fill-mode:forwards;
```