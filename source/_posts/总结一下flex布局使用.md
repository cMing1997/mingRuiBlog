---
title: 总结一下flex布局使用
date: 2018-9-5
categories: flex布局
tags:
  - css
  - flex局的总结
---

> 之前虽然经常使用flex进行移动端布局，但是还没有系统的总结一下，趁着这次有点时间总结一下 **flex** 布局

<!-- more -->

#### 容器属性（父盒子属性）

> 下面介绍一下 **flex** 布局常见的几个属性

##### 1、display:flex

> 这个是开启 flex 布局

##### 2、flex-diraction : `row / column / row-reverse /column-reverse`

> 这个是控制主轴方向
 
- row：  正常的横向排列（默认）
- column ：纵向排列 
- 剩下来的两个就是**横向翻转**，**纵向翻转**

##### 3、Justify-content : `flex-start / flex-end / center / space-between / space-around` 

> 这个是控制子元素**主轴**的对齐方式。

 - flex-start：表示子元素靠开始位置对齐（默认）
 - flex-end：表示子元素靠结束位置对齐
 - center：表示子元素在主轴方向居中对齐
 - space-between：表示子元素靠两端对齐，如果一行有三个元素，那么中间的元素就是居中显示
 - space-around：这个属性会把空余空间，在一行内平分

##### 4、align-content：`flex-start / flex-end / center / space-between / space-around`

> 这个是控制子元素**侧轴**的对齐方式，用法跟上面类似，不过是作用在侧轴上


#### 子元素身上的设置

##### 1、order ：数值（默认为 0）

> 这个属性控制元素的排序，数值越小，排名越靠前

##### 2、align-self：`auto / flex-start / flex-end / center / baseline / stratch `

> 这个属性是控制当前元素可以跟其他兄弟元素不一样的对其方式，如果没有父元素，就跟 **`search`** 一样