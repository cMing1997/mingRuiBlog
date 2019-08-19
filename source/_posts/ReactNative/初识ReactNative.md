---
title:初识reactNative环境搭建
date: 2019/8/18 21:58:22  
tags: [初识react-native]
categories: react-native系列学习
cover: "https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/react-native.png"

---

### 前言
> 内心一直有个小清新的梦，就是做一个属于自己的阅读，听歌的APP。在选择学习的时候，在`react-native` 跟新任框架 `flutter` 之间徘徊，之前看过别写的 `flutter` 代码，完全就是地狱嵌套。感觉那样写的代码之后特难维护，所以就选择 `react-native`，毕竟这个是类 `react` 语法，学习的成本也比 `flutter` 的 `dart` 简单。

### 重要
**电脑一定要有翻墙的能力，因为不管是下载环境，还是文件编译，都需要从外网下包，所以没有是万万不能的**

### 安装 Node.js
> 这个就不细说了。对于前端应该很熟悉了。

### 安装jdk

 - 去java官网下载就可以 [JDK下载地址](https://www.oracle.com/technetwork/java/javase/downloads/index.html "JDK下载地址") 然后按照默认的安装就行，安装完成之后

 - 在系统变量里新建 `JAVA_HOME` 变量值为 `C:\Program Files\Java\jdk-12.0.2` （这里是你安装jdk的目录） 
![java环境配置](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/java.png)
 - 然后在 `path`内编辑，设置好红框内的变量
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/java_path.png)

 - 这个时候打开 `cmd` 命令行，敲 `java --version` 以及 `javac --version` 都能出现对应的版本号，就说明添加成功

### 安装 Android Studio
 - 可以去谷歌放在国内的域名 [Android的国内镜像](https://developer.android.google.cn/) 安装 Android Studio，基本上只用点击 next 就行

![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/111.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/222.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/333.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/444.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/555.png)

 - 这个时候需要选择默认的就行，`DO not import settings` 

![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/666.png)

 - 这个是让你设置代理的，一般点击 cancel 就可以

![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/777.png)

 - 这里是让你选择主题的，点 next 就可以

![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/888.png)

 - 这里三个方框都选择，然后下面选择安装 SDK 的目录 ，然后点击 next，稍等一下就可以

![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/999.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/1000.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/1111.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/1222.png)
 - 安装完之后，配置环境变量

![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/android_path.png)
![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/android_path_tools.png)

 - 安装完之后，使用 cmd 打 `adb` 如果没有报错，没有提示 `adb` 不是系统或者内部命令，就说嘛安装成功

### 安装 Python 环境
[python下载地址](https://www.python.org/downloads/)

### 安装 react native cli
使用刚安装的node带的 npm 下载 react-native cli

```npm
	npm install -g yarn react-native-cli
```
因为这个包在国外的服务器上，所以还是需要你电脑上有稳定且网速一定的翻墙工具，如果还是安装失败，可以尝试下设置国内镜像，设置完之后，再安装
```npm
	npm config set registry https://registry.npm.taobao.org --global
	npm config set disturl https://npm.taobao.org/dist --global
```

下载完之后，使用cmd命令行敲 `react-native --version` 可以出现版本就说明安装成功
然后使用 `react-native init [初始化的名字]` 初始化 `react-native` 项目

初始完之后，使用 `react-native run-android` 就可以打包成安卓，记得这个时候一定要打开 `android studio` 的 `AVD` 或者使用 USB连接真机经行查看，不然会报错