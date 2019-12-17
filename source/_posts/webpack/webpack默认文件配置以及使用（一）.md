---
title: webpack默认文件配置以及使用（一）
date: 2019/12/7 19:14:27 
tags: [webpack安装，试用]
categories: webpack学习笔记
cover: "https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/Snipaste_2019-12-07_19-16-17.png"

---

记录一下webpack学习笔记

<!--more-->

### 一、安装

```bash
npm init -y // 初始化package.json 文件
npm i webpack webpack-cli -g  // 安装在全局
npm i webpack webpack-cli -D   // 安装在开发模式下使用
```

### 二、打包试用

在根目录下新建src文件夹，内部随便新建两个JS文件

```markdown
├── package.json   # 根目录
├── node_modules   # 根目录
├── src                    # 根目录
│   ├── two.js
│   └── index.js
```

```javascript
//two.js
module.exports= ()=>{
    return "听说你很嚣张啊！！！"
}
// index.js

let str = require("./two");
console.log(str);
```

#### 1、使用 npx 以及webpack零配置 打包

```bash
npx webpack // npx 是 npm 5.2版本之后提供的命令可以执行.bin下的可执行文件
```

> 执行上面那条命令就会按照默认的 `webpack`  配置生成一个 `dist`  目录，并且将上面写的 `index.js、two.js` 文件打包到一个 `main.js`  文件内

#### 2、配置 script 脚本

```json
// 在 package.json 内配置一下 scripts 脚本
"scripts": {
  "build": "webpack"
}
```

配置完成之后，输入 **`npm run build`** 之后，这条命令会调用 `node_modules/.bin` 下的 `webpack` 命令，然后内部会调用 `webpack-cli` 解析并打包生成 `dist` 文件

### 三、配置模式

> 在上面零配置打包的时候，有提示需要指定打包的模式

![image.png](https://cdn.nlark.com/yuque/0/2019/png/221851/1574775041820-40da0d1d-b9ed-4021-9cf9-abe070178052.png#align=left&display=inline&height=208&name=image.png&originHeight=208&originWidth=844&size=16303&status=done&style=none&width=844)

#### 1、在package.json脚本里区分模式

```json
 "scripts": {   
     // 通过webpack打包，可以使用--传递参数指定mode为开发还是生产
    "dev": "webpack --mode=development",
    "build": "webpack --mode=production"
 }
```

然后打包的时候，就可以运行**`npm run dev`** 或者 **`npm run build`**  来区分是开发打包，还是生产打包。

#### 2、在webpack.config.js里配置

```javascript
const path = require("path");
module.exports = {
    mode: "development"
}
```

这个时候即使不在 **`package.json`** 脚本里配置 **`mode=development`** 这个时候打包也是可以可以直接指定模式打包

### 四、配置多个模式及出入口

#### 1、在默认文件内配置出入口

```javascript
//webpack.config.js
const path = require("path");
module.exports = {
    mode:"development",
    entry:"./src/index.js",  // 设置的相对地址
}
module.exports = {
    mode:"development",
// 设置的绝对地址 path是node环境自带的模块，无需自己装包，其中__diraname指的是当前文件根目录到当前文件的路径
    entry:path.resolve(__dirname,"./src/index.js"), 
}
```

###### 有了入口，那么就得有出口嘛

```javascript
//webpack.config.js
const path = require("path");
module.exports = {
    mode:"development",
    entry:path.resolve(__dirname,"./src/index.js"), 
      output:{//配置出口的时候，可以配置打包文件名，以及打包的目录，如果没指定，默认打包到dist目录下的main.js下
        filename:"one.js",  //记得指定打包文件名的时候，要写上后缀
      path:path.resolve(__dirname,"dist")
    }
}
```

#### 2、在webpack的默认配置文件内配置其他模式

```javascript
//webpack.config.js
const path = require("path");
// 这个插件是可以按照指定的模板文件生成打包时的入口html文件
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    mode:"production",
    entry:path.resolve(__dirname,"./src/index.js"), 
      output:{//配置出口的时候，可以配置打包文件名，以及打包的目录，如果没指定，默认打包到dist目录下的main.js下
        filename:"one.js",  //记得指定打包文件名的时候，要写上后缀
      path:path.resolve(__dirname,"dist")
    },
    plugin:[  // 如果项目里需要使用插件，需要在这里书写
            new HtmlWebpackPlugin({
           filename:"index.html", //生成的文件名称
           template:path.resolve(__dirname,"./src/public/template.html"), //依赖的模板文件是在哪里
           hash:true,  // 是否开启哈希后缀生成，这是为了避免替换文件缓存
           meta:{}, //这里可以设置生成的html文件中的meta标签内容
           minify:true/false, //是否以最小的格式展示，如果为true,打包的时候则压缩为一行
        })
    ],
   module{
        // noParse表示如果你项目中用到的文件，确定么有用到其他依赖，那么可以在这里声明，在打包的时候webpack就不会再去检查改文件是否有依赖文件
            noParse:/jQuery|lodash/,
      rules:[  // webpack提供让我们自定义打包规则，可以使用各种loader对指定文件进行打包转化
              {
          test:/\.css$/,  // 使用正则，可以匹配以该文件后缀结尾的所有文件
          use:["style-loader","css-loader"],// 规定匹配到的该文件使用何种loader转化,loader是从右往左解析加载，所以书写顺序很重要！
        }
     ]
   }
}
```
