---
title: 总结一下Vue项目集成Mui的问题
date: 2018-9-1
categories: 集成Mui
tags:
  - Mui
  - Vue集成Mui
---

> 趁着工作之余，总结一下之前工作中使用 **`Vue`** 开发项目集成 **`Mui`** 踩的坑以及记录一下解决办法

<!-- more -->
### 一、用脚手架集成 `Mui` 库

#### 安装css

- 因为 mui 不是专门为 Vue 所写的一个库，所以也无法用 npm 安装，需要去它们官网下载整套 `css,js,fonts`文件，然后放在用脚手架搭建的文件 src 文件夹内

- 因为我们想在vue文件内，任何地方都可以用到，那么就可以将其css用 `import "@/assets/mui/css/mui.min.css"` 将 mui 的 css 挂载到 vue 的 树上


#### 安装 js

- 由于 mui 的大部分功能是由 css 类名控制，所以没必要放在 main.js中，只用在需要的组件中导入就可以。

- **注意：** 导入**`mui.min.js`**  之前，需要先去js文件内，手动导出 `export default mui` 。

##### 集成 mui.js 的问题。

**1、** vue 的 **`router.link`** 会跟 mui 的区域滚动的类名 **`mui-tab-item`** 起冲突。会让 **`router.link`** 跳转失败。

 - **解决办法：** 将 mui的类名 **`mui-tab-item`** 改成自定义的类名，将原类名的样式复制过来就可以。

**2、** 将 mui 的横向滚动放在页面的时候，**第一次滚不动**，这是因为需要**初始化横向滚动**，因为那个组件用到了 DOM 元素，所以需要放在 **`mounted`** 生命函数之中，

```javascript
import mui from "../assets/mui/js/mui.min.js"

mounted() {
 // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
   mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
}
```

**3、** 初始化函数之后，发现不仅滚不动了，而且页面也不出来了，页面不仅不出来，控制台还报了一堆错。**原来是因为webpack打包跟 `mui.min.js` 起了冲突，webpack打包是以严格模式打包的，但是 `mui.min.js` 中引用了 `caller` ，`callee` ， `arguments`  等非严格模式的代码，所以会其冲突**

 - **解决办法1：** 在 **`.babelrc`** 内写入 **`"ignore": ["./src/assets/mui/js/mui.min.js"]`** ，配置跟 **`plugins`** 同级
 
 - **解决办法2：** 在 **`config`** 文件夹内 的 **`webpack.base.conf.js`**，修改 js 的加载模块。让其忽略掉 **`mui.min.js`** ，这样就可以让webpack不对 **`mui.min.js`** 文件进行加载。
 
 - **解决办法3：** 使用 **`cnpm i babel-plugin-transform-remove-strict-mode -D`** 安装一个插件，下载到项目目录之后，在 **`babelrc`** 文件修改 **`plugins`** ，在其数组后面添加 **`babel-plugin-transform-remove-strict-mode`**


#### 二、用webpack打包含有 `mui.min.css` 会出现的问题

打包的时候会提示，**`引用svg的地方需要用双引号:""`**
**解决办法：** 改一下 **`mui.css`** 里关于引用 `SVG` 地方，将单引号改成双引号