---
title: Vue项目的总结
date: 2018-10-28
categories: Vue
tags: 
  - Vue
  - 项目总结
---

> 之前做了个vue的项目。做个简单的总结

<!-- more -->

### 项目文件结构

![](https://i.imgur.com/pBWf3KW.png)


### 规范

- **（划分文件夹）** 在划分文件夹的时候，最好是按照功能模块划分，然后再进行细分有哪些页面，

- **（页面命名）** 最好是 **`页面名称+页面功能`** 这样形式的命名，这样别人不用打开代码，直接看你文件名称，就知道你这个文件是干什么的。可以节省很多时间

- **（class命名）** 由于 window 系统对字母大小写不敏感，所以给class 命名的时候，尽量不要用驼峰命名，一律采用 **`一`** 中划线隔开，并且尽量为可读性命名

- **(统一样式)** 在做 web 开发的时候，浏览器会给一些标签默认的样式，而且每个浏览器实现不同，所以需要文件将其格式成统一的样式。另外，在写项目的时候，需要大量的修改字体大小，所以可以定义一个文件，文件内部定义需要用到的字体大小变量，当要改变的时候，引入该文件，使用该文件的变量即可，这样在修改字体大小的时候，可以改一处复用多次。

![](https://i.imgur.com/EcqS8Hw.png)

![](https://i.imgur.com/6SOPwHp.png)


> 总结一下工作中的知识，理一下思路，以便更顺畅的使用那些知识


### axios 的使用

> 当工作中想使用 axios 的时候，最好自己封装一下，封装三种请求

- get 请求：使用 ES7 的 async (异步) 和 await(同步)

```javascript
  async function requestByGet(url, params) {
   if (!url) return;
    const res = await axios.get(`${backendPath}/${url}`, {
      params
     });
    return res.data;
  }

```

- post 请求：因为 post 一般为发送数据，并且，一般为比较隐私的数据，所以，在发送之前，需要对其加密，这样可以大大的保障用户隐私安全

```javascrpt
 async function requestByPost(url, data) {
  if (!url) return;
  const res = await axios.post(`${backendPath}/${url}`, data, {
    "Content-Type": "application/x-www-form-urlencoded",
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        let val = data[it];
        if (typeof val === "object") {
          val = JSON.stringify(val);
        }
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(val) + '&'
      }
      return ret
    }]
  });
  return res.data;
}
 
```

### vuex 的 使用

- 一般来说，是按照功能模块来建造仓库的，这样知道哪个数据是从哪里来，要到哪里去。下次维护也方便一些

- 并且一般要放在公共的数据。就要先在 **`mutations`** 里定义一个函数，然后再在 **`actions`** 里，使用 **`commit ("mutations里定义的函数名",'要传递进去的参数')`**

- 一般使用请求，都是先在各自的 **`store`** 仓库中的 **`actions`** 定义请求的方法，然后在所使用该数据的页面里的 `created` 生命周期函数里调用之前定义的方法，初始化数据

```javascript
  /**
   * @param 获取资讯详情
   * 在actions里定义请求
  */
  async getInformationDetail ({commit},params){
      try {
          const informationDetail = await requestByGet("city/api/information/info",params);
          let timer  = parseInt (informationDetail.data.createdAt);
          informationDetail.data.createdAt = utilMixins.methods.formatDateByTimeStamp(timer)
            return informationDetail;
      } catch (error) {
        return false;
      }
    }
```

```javascript
  // 在需要用到的页面，导入方法
  methods: {
    //这个是 vuex 里的一个语法糖，意为在 cityinformation 这个命名空间内，找到 getCityInfoList 和 getCityCategory 这两个函数
    ...mapActions("cityinformation",['getCityInfoList','getCityCategory'])
  }

 computed: {
   // 初始化数据，将store 里的数据，赋值给页面中定义的变量
  ...mapState("cityinformation",{
       cityBtnIconList:state=>state.cityClassification,
       cityInfoList:state=>state.cityInfoList
      }),
 },

 created() {
   this.getCityInfoList({
      page:1,
      size:10,
   }),
 }
```

- **在使用模块化 `store` 命名空间的时候，注意要开启命名空间 **

```javascript
   export default {
   //当这个属性为false的时候，总的 store 是不承认这个命名空间的，默认为 false   
      namespaced:true,
   }
```

- **在 `actions` 里定义的函数，形参有两个，不管第一个参数有没有用，都需要传递**

```javascript
   async getInformationDetail ({commit},params){}
```

- **当在页面要调用之前 `actions` 定义的函数并需要其返回值时，需要先在 `methods` 里定义一个异步方法，然后再在 `created` 里调用**

```javascript
    methods:{
        async getInfoDetail(){
            let id = parseInt(this.$route.query.id);
            this.detailInfo = await this.getInformationDetail({
              id:id,
            });
        }
    }
   created(){
      this.getInfoDetail();
   }
```