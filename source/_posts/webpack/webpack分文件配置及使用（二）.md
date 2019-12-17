---
title: webpack分文件配置及使用（二）
date: 2019/12/17 23:08:21 
tags: [webpack分文件配置]
categories: webpack学习笔记
cover: "https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/webpack分文件配置及使用（二）.png"

---

webpack分配置文件进行配置笔记
<!--more-->

#### 1、根据不同的文件执行不同的脚本进行打包

```markdown
├── build   # 根目录
│   ├── webpack.dev.js //开发环境执行的文件
│   └── webpack.prod.js // 生产环境执行的文件
├── package.json   # 根目录
├── node_modules   # 根目录
├── src            # 根目录
│   ├── two.js
│   └── index.js![](https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/webpack%E5%88%86%E6%96%87%E4%BB%B6%E9%85%8D%E7%BD%AE%E5%8F%8A%E4%BD%BF%E7%94%A8%EF%BC%88%E4%BA%8C%EF%BC%89.png)
```

配置 **`script`** 脚本

```javascript
// package.json
script:{
  "dev":"webpack --config ./build/webpack.dev.js",
  "build":"webpack --config ./build/webpack.prod.js"
}
```

**为不同文件指定打包所需的东西**

```javascript
// webpack.dev.js
modules.exports={
  mode:"development",
}

// webpack.prod.js
modules.exports={
    mode:"production'
}
```

#### 2、将公共文件抽出放在公共文件内

```json
//package.json
script:{
 "dev":"webpack --env.development --config ./build/webpack.base.js",
  "build":"webpack --env.production --config ./build/webpack.base.js"
}
```

```javascript
//webpack.base.js
const path = require("path"); // node自带模块，可直接引入
const merge = require("webpack-merge"); //第三方包，可以将两个文件内容合并而不会出现覆盖的情况
const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const base = {
    entry: path.resolve(__dirname,"../src/index.js"),
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'../dist'),
    }
}
module.exports=(env)=>{
    if (env.production) {
        merge(base,prod)
    }else{
        merge(base,dev)
    }
}

//webpack.dev.js
module.exports = {
    mode: "development",
    devServer: {
        // 更改静态文件目录位置
        contentBase: path.resolve(__dirname, '../dist'),
        compress: false, // 是否开启 gzip 压缩，
        port: 3000, //开启服务之后的端口号 
        hot: true, // 是否启用热更新
        proxy: { // 后台服务器代理路由
            '/api': {
                target: 'http://localhost:4000',
            },
        }
    }
}
```

#### 3、include跟exclude

> 在打包的时候有些东西打包的时候不希望走 **`loader` **，因为这样会导致导致打包过慢，所以就需要忽略一些东西

```javascript
// webpack.base.js
const base = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: "babel-loader",
            exclude: /node_modules/,
            include:path.resolve(__dirname,'src'),// 这个选项意思是指定的目录下一定要走loader，进行转化
        }]
    }
}
```

#### 4、多线程打包，解决打包慢的问题

> 由于打包的时候是同步并且会按照依赖一步步找文件，这样在大项目中，打包会很慢，所以我们可以将不同的文件逻辑交给不同的 **`loader` **，

```javascript
//  npm install --save-dev happypack

//webpack.base.js
const HappyPack = require("happypack");

const base = {
  module:{
       rules:[
              {
                    test:/\.js$/,
          use:'happypack/loader?id=jsx'
        }
              {
                    test:/\.less$/,
          use:'happypack/loader?id=style'
        }
     ]
  }，
  plugins:[
      new HappyPack({
       id:"jsx", // 这个是根据上面规则匹配携带的参数判断
       threads: 4, // 这个是处理匹配的文件的线程数
       loader:["babel-loader"]
    }),
    new HappyPack({
       id:"style", // 这个是根据上面规则匹配携带的参数判断
       threads: 2, // 这个是处理匹配的文件的线程数
       loader:["style-loader","css-loader","less-loader"]
    }),
  ]
}
```
