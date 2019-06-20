---
title: NodeJs之包管理浅显笔记
date: 2018-1-15
categories: Node
tags: 
  - Node
  - 包介绍
  - npm使用
---

>  NodeJS之包管理知识梳理

<!-- more -->

## 什么是包？

- 包又称 `pageage`，是在模块的基础上进一步的抽象。它的目的：更方便的分发与管理符合 `CommonJS` 模块化的应用及类库

- 包也可以称之为 **模块**、**代码**、**其他资源**的局部作用域。


## 包的规范

 - 每一个包都是一个独立的文件目录存在。

 - **pageage.json** 文件必须在文件顶层目录下,它必须符合json格式，内部必须包含，`name`、`version`、`main` 三个属性
  
   -  name : 指的是包的名称，
  
   -  version : 包的版本号
  
   -  main : 指的是包的入口文件。

![](https://i.imgur.com/T58F3yc.png)


## 包文件中pageage.json 属性简单解读

 - **name：** 包的名字，

 - **description：** 包的简要介绍，

 - **version：** 包的版本号，

 - **keywords ：** 包的关键字，利于在网上搜索查找，

 - **maintainers ：** 维护者数组，每个元素要包含name、email、web可选字段，

 - **licenses：** 许可证数组，每个元素要包含type和url字段，

 - **dependencies：** 说明包的依赖，格式为关联数组，由包的名称及版本号组成，

 - **devDependencies:** 表示在开发过程中所依赖的包，一般由包名及版本号组成，


## 如何配置pageage.jsom

使用npm包管理工具，在本地项目中输入 `npm init -y` 就可以初始化一个包的配置文件，如果没有写 `-y` 那么就需要一步步初始化配置文件。


## npm是啥？

> 其实 npm 就是一个包管理工具，不过它属于 node 的。一般在安装 node 的时候，npm 也会自带安装的。
> 安装node之后，在任意位置打开命令行，输入 `npm -v` 就可以查询当前的 `npm` 的版本号，输入 `node -v` 也可以查询当前 `node` 的版本号。


## 利用 npm 指令安装包工具及类库

### 全局包

 - **什么是全局包?：**就是在电脑的任意位置，打开cmd都可以访问该包
 
 - **怎么安装全局包？：**打开cmd 输入 `npm install 包名 -g` 
 
 - **例如(要安装 `i5ting_doc` 工具)：** `npm install i5ting_doc -g`  ，如果没有写 `-g` 那么就默认安装在本地， 

 - **怎么卸载全局包？：** `npm uninstall i5ting -g` 同安装一样，如果没写  `-g` 那么就默认卸载本地包，



### 本地包

 - **什么是本地包？：**就是哪个路径下打开安装包命令，哪个包就安装在哪里，这种包就叫本地包

 - **安装本地包**： 在所需要的文件夹内打开cmd，输入 `npm install 包名 -S` ，`-S` 的作用是将安装的包信息记录到 `pageage.json` 文件内，同时也会记录到 `pageage_lock.json` 文件内,（版本高的npm 安装本地包的时候，可以不写 `-S` 它会默认将信息写入进入，但是版本低的就需要手动添加了。
 
 - 如果需要的包只用在生产环境下，项目上线并不需要，在安装包的时候，就需要输入 **`npm install webpake -D`** 这样该文件虽然下载下来了，但是信息会保存在 **`pageage.json`**  中的 **`devDependencies`** 中，如果项目上线的时候安装本地包的时候，不需要生产包，就可以输入 **`npm install --production `**  这样，安装的都是 **`pageage.json`** 里 **`dependencies`** 里记录的文件



## npm常见命令
 
 - **`npm init -y` :** 初始化创建包配置文件pageage.json

 - **`npm install 包名 -g` ：**将包安装到全局

 - **`npm install 包名 -g`：**将包安装到本地 

 - **`npm install`：** 安装 `pageage.json` 中的记录的文件。

 - **`npm install --production`:**会按照 `pageage.json`中的`dependencies` 记录的信息安装。
 
 - **`npm install 包名 -D`：**安装包的同时，会将信息记录到 `pageage.json` 中的 `devDependencies`


