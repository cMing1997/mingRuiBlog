
---
title: 收集各种实用API
date: 2019-06-12 11:10:03 +0800
tags: [API接口]
categories: 实用的个人API接口
cover: "https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/four.jpg"
---

> 作为一个前端 **`copyer`** ，每天的工作如此无聊，必须自己给自己找点乐趣嘛，而我的乐趣就是找各种有趣的资源，这些 **`API`** 就是其中一种
> 在这里感谢强大的开源社区

<!-- more -->
### 前言
> 作为一个前端 **`copyer`** ，每天的工作如此无聊，必须自己给自己找点乐趣嘛，而我的乐趣就是找各种有趣的资源，这些 **`API`** 就是其中一种

### 开源社区的接口

 [接口地址](https://www.apiopen.top/)

 - 腾讯天气
 - 腾讯新闻接口
 - 一个集新闻，图片，文章，句子的接口
 - 用户反馈
 - 用户登陆
 - 用户注册
 - 删除反馈
 - 查看反馈
 - 更新开发者KEY-会清除开发者下面所有用户
 - 开发者登陆
 - 开发者注册
 - 美图推荐
 - 获取实时天气
 - 获取唐朝古诗词
 - 获取宋朝古诗词
 - 模糊搜索古诗词（可搜索诗词名、诗词内容、诗词作者）
 - 搜索古诗词作者
 - 搜索古诗词
 - 随机一首古诗词
 - 随机一段古诗文
 - 段子详情
 - 段子列表-神评版本

### 犬`S API [地址](https://api.fczbl.vip/)

#### 一言（Hitokoto/ヒトコト）[地址](https://api.fczbl.vip/hitokoto?encode=help)

##### 参数说明：
charset: 输出的文字编码（可缺省）gbk / utf-8<br />encode: 输出格式（缺省为纯文字） js /  json<br />**例如：**<br />https://api.fczbl.vip/hitokoto/?encode=json<br />https://api.fczbl.vip/hitokoto/

#### 网易云音乐（Cloudmusic）[地址](https://api.fczbl.vip/163)

##### 参数说明
| 参数名称 | 参数说明 |
| --- | --- |
| type | 类型 |
| name |  歌曲名 |
| artist | 歌手 |
| url  | 链接 |
| cover  | 封面 |
| lrc | 歌词 |
| single  | 获取以上所有信息(单曲) |
| playlist | 获取以上所有信息(歌单) |
| id | 单曲ID或歌单ID |
| 此API基于 Meting 构建。 |  |

**例如：**<br />https://api.fczbl.vip/163/?type=url&id=29848621<br />https://api.fczbl.vip/163/?type=single&id=36308263<br />https://api.fczbl.vip/163/?type=playlist&id=2003373695

#### 二维码（QR Code）[地址](https://api.fczbl.vip/qr/?url=help)

##### 参数说明
| 参数 | 参数说明 |
| :---: | --- |
| url | 二维码对应的网址或文字 |
| m | 二维码白色边框尺寸（缺省值: 2px） |
| e |  容错级别(errorLevel)，可选参数如下（缺省值 L）：L （水平 7%的字码可被修正） / M （水平 15%的字码可被修正）/ Q （水平 25%的字码可被修正） / H （水平 30%的字码可被修正） |
| p | 二维码尺寸，可选范围≥1(具体大小和容错级别有关)（缺省值：10） |

**例如：**<br />https://api.fczbl.vip/qr/?m=1&e=L&p=5&url=https://www.fczbl.vip/

https://api.fczbl.vip/qr/?url=https://www.fczbl.vip/ 

#### 必应每日美图（Bing Wallpaper）[地址](https://api.fczbl.vip/bing/?encode=help)

##### 参数说明：
encode: json 输出格式（缺省直接显示图片）<br />**例如：**<br />https://api.fczbl.vip/bing/?encode=json<br />https://api.fczbl.vip/bing/

### AD`s API （跟上面的api有异曲同工之妙）[地址](https://api.imjad.cn/)
> 因为这个 **`API`** 参数什么的写的比较详细，如果需要，可以点击对应的链接去到对应的文档查看使用


#### [一言（Hitokoto/ヒトコト）](https://api.imjad.cn/hitokoto.md)

#### [网易云音乐（Cloudmusic）](https://api.imjad.cn/cloudmusic.md)

#### [二维码（QR Code）](https://api.imjad.cn/qrcode.md)

#### [哔哩哔哩（Bilibili）](https://api.imjad.cn/bilibili_v2.md)

#### [Pixiv（Pixiv）](https://api.imjad.cn/pixiv_v2.md)

#### [企鹅FM（QQFM）](https://api.imjad.cn/qqfm.md)

### 今日诗词
> 喜欢小清新，可以看看这个接口

**地址：**[https://www.jinrishici.com/doc/](https://www.jinrishici.com/doc/)


### 动漫人物IP签名图生成
**地址：**[https://ip.ntrqq.net/](https://ip.ntrqq.net/)

### 网易云音乐 NodeJS 版 API
> 这个 **`API`** 有点特殊，是基于 **`Node`** 的，如果使用它，就必须本地装 **`Node`** ，并且需要一点点 **`Node` **的知识
> 按照 **`API`** 的作者解释，是使用反向代理。

**地址：**[https://binaryify.github.io/NeteaseCloudMusicApi/#/](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

### 金山词霸的每日一句 [地址](http://open.iciba.com/?c=api)
**JSON格式：**[http://open.iciba.com/dsapi/](http://open.iciba.com/dsapi/)

### ~~土味情话~~ 
> **注意：这个接口废弃了**

~~地址：https://api.lovelive.tools/api/SweetNothings~~

### 天气接口

#### 1. SOJSON博客提供的天气接口 [地址](https://www.sojson.com/blog/305.html)
> **注意：这个接口也只能后台调用**


#### 2. 来自天气API网站 [地址](https://www.tianqiapi.com/api/)
接口统一地址：https://www.tianqiapi.com/api/

| version | String | 是 | 接口标识, 固定值: `v1` |
| --- | --- | --- | --- |
| cityid | String | 否 | 城市ID, 请参考 [城市ID列表](https://www.tianqiapi.com/?action=city) |
| city | String | 否 | 城市名称, 不要带市和区; 如: `青岛`, `微山` |
| ip | String | 否 | IP所在城市天气, [默认返回当前IP地区天气]() |
| callback | String | 否 | jsonp参数, 如: `jQuery.Callbacks` |


#### 3. 饥人谷天气API [地址](http://api.jirengu.com/)
> 这个API支持的城市不是很全

接口地址：http://api.jirengu.com/getWeather.php<br />请求方式：GET<br />请求参数：

| 参数名 | 必选 | 类型 | 说明 |
| :--- | :--- | :--- | --- |
| city | 是 | string | 城市名，例如南京 |

ONE 一个 [地址](https://www.showdoc.cc/justapi?page_id=957459187766572)

统一接口地址：https://api.hibai.cn/api/index/index<br />请求方式： **`POST`** 

| 参数名 | 必选 | 类型 | 说明 |
| :--- | :--- | :--- | --- |
| TransCode | 是 | string | 请求码 ：030111表示获取今日内容，030112 表示获取一周内容 |
| OpenId | 是 | string | 固定值 123456789 |


```javascript
$.ajax({
    type: "POST",
    url: 'https://api.hibai.cn/api/index/index',
    dataType: 'json',
    data: {
         "TransCode": "030111",
         "OpenId": "123456789"
    },
    success: function (result) {
        console.log(result);
    },
    error: function (err) {
        console.log(err);
    }
});
```


### 每日一文 [地址](https://www.showdoc.cc/justapi?page_id=957480307312713)
> 这个来自江苏科技大学的开源社区

接口地址： **`https://interface.meiriyiwen.com/article/today?dev=1`** ;<br />请求方式： **`GET`** <br />返回的参数：

| 返回值名称 | 可能值 | 说明 |
| :---: | :---: | :---: |
| date（日期） | curr | 今日日期，yyyyMMdd 格式 |
|  | prev | 昨日日期，yyyyMMdd 格式 |
|  | next | 明日日期，yyyyMMdd 格式 |
| author |  | 作者 |
| titile |  | 标题 |
| digest |  | 首段 |
| content |  | 正文内容 |
| wc |  | 字数(word count) |


### 指定时间内的文章
接口地址： **`https://interface.meiriyiwen.com/article/day?dev=1&date=+日期`**  ;<br />URL举例： **`https://interface.meiriyiwen.com/article/day?dev=1&date=20170216`**<br />请求方式： **`GET`** <br />返回的参数：跟上面每日一文的一样

### 随机一文
接口地址：https://interface.meiriyiwen.com/article/random?dev=1<br />请求方式： **`GET`** <br />返回的参数：跟上面每日一文的一样

### 360壁纸

#### 壁纸的类型
接口地址：http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories<br />请求方式：GET<br />返回参数：

| 参数名称 | 参数说明 |
| :---: | :---: |
| total | 返回数据数量 |
| name | 类别名 |
| id | 类别的标识 |
| totalcnt | 该类别壁纸数量 |


#### 具体类别壁纸
接口地址：http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories<br />请求方式：GET<br />参数：

| 请求参数 | 参数说明 |
| :---: | :---: |
| cid | 请求的类别id |
| start | 起始的数量 |
| count | 请求的具体数量 |

类别的id具体已知<br />

| id | id对应的类别图片 |
| :---: | :---: |
| 1 | 每日精选 |
| 5 | 游戏 |
| 6 | 美女 |
| 9 | 风景 |
| 10 | 视觉创意 |
| 11 | 明星影视 |
| 12 | 汽车 |
| 14 | 萌宠动物 |
| 15 | 小清新 |
| 16 | 体育 |
| 22 | 军事 |
| 26 | 动漫卡通 |
| 30 | 情感 |
| 35 | 文字 |


#### 按关键字搜索壁纸
接口地址：http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search<br />参数：

| 请求参数 | 参数说明 |
| :---: | :---: |
| kw | 搜索的关键词 |
| start | 起始的数量 |
| count | 请求的具体数量 |


#### 获取今日热搜
接口地址：http://openbox.mobilem.360.cn/html/api/wallpaperhot.html<br />返回的参数

- **`total`**：返回数据数量
- `data`：返回的数据

### 百度FM [API地址](http://api.jirengu.com/)
> 所有接口如想使用 https 协议，可把对于后缀是.php 的接口可把 http://api.jirengu.com 替换成 https://jirenguapi.applinzi.com


#### FM专辑获取
接口地址：http://api.jirengu.com/fm/getChannels.php<br />请求方式：GET

#### 获取随机歌曲
接口地址：http://api.jirengu.com/fm/getSong.php<br />请求方式：GET<br />请求参数：<br />channel：FM专辑类别的 channel_id（不填为默认）<br />请求例子：
> http://api.jirengu.com/fm/getSong.php?channel=4
> http://api.jirengu.com/fm/getSong.php?channel=4&callback=getSong
> //https协议，可以在 github pages 上使用
> https://jirenguapi.applinzi.com/fm/getSong.php?channel=4`

<br />

#### 百度FM 获取歌词
接口地址：http://api.jirengu.com/fm/getLyric.php   或者  https://jirenguapi.applinzi.com/fm/getLyric.php<br />请求方式：POST和GET均可

| 参数名 | 必选 | 类型 | 说明 |
| :--- | :--- | :--- | --- |
| sid | 是 | string | 歌曲id |


#### 免费开源API
> ALAPI，免费实用的数据接口,为开发者提供各种免费API服务!
###### 1、接口地址：https://alapi.cn/

>收集免费的接口服务,做一个api的搬运工
###### 2、接口地址：https://github.com/fangzesheng/free-api