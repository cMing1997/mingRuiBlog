---
title: url、base64、blob相互转换方法
date: 2019-4-28
categories: JavaScript骚操作
cover: https://ws1.sinaimg.cn/large/006ubcvVgy1g2am01f13lj31hc0xctg7.jpg
tags:
  - base64
  - 转换
  - 骚操作
---
### url 转 base64

```javascript
 // 1. url 转 base64
    // 原理： 利用canvas.toDataURL的API转化成base64
    function urlToBase64(url) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = function () {
                let canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;
                // 将图片插入画布并开始绘制
                canvas.getContext('2d').drawImage(image, 0, 0);
                // result
                let result = canvas.toDataURL('image/png')
                resolve(result);
            };
            // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
            image.setAttribute("crossOrigin", 'Anonymous');
            image.src = url;
            // 图片加载失败的错误处理
            image.onerror = () => {
                reject(new Error('urlToBase64 error'));
            };
        })
    }

    // 调用
    let imgUrL = `http://XXX.jpg`
    urlToBase64(imgUrL).then(res => {
        // 转化后的base64图片地址
        console.log('base64', res)
    })
```
### base64 转 blob

```javascript
	// 2. base64 转 blob
    // 原理：利用URL.createObjectURL为blob对象创建临时的URL
    function base64ToBlob({
        b64data = '',
        contentType = '',
        sliceSize = 512
    } = {}) {
        return new Promise((resolve, reject) => {
            // 使用 atob() 方法将数据解码
            let byteCharacters = atob(b64data);
            let byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                let slice = byteCharacters.slice(offset, offset + sliceSize);
                let byteNumbers = [];
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers.push(slice.charCodeAt(i));
                }
                // 8 位无符号整数值的类型化数组。内容将初始化为 0。
                // 如果无法分配请求数目的字节，则将引发异常。
                byteArrays.push(new Uint8Array(byteNumbers));
            }
            let result = new Blob(byteArrays, {
                type: contentType
            })
            result = Object.assign(result, {
                // 这里一定要处理一下 URL.createObjectURL
                preview: URL.createObjectURL(result),
                name: `XXX.png`
            });
            resolve(result)
        })
    }
    // 调用
    var base64 = base64.split(',')[1]
    base64ToBlob({
        b64data: base64,
        contentType: 'image/png'
    }).then(res => {
        // 转后后的blob对象
        console.log('blob', res)
    })
```
### blob 转 base64

```javascript
  // 3. blob 转 base64
    // 原理：利用fileReader的readAsDataURL，将blob转为base64
    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                resolve(e.target.result);
            };
            // readAsDataURL
            fileReader.readAsDataURL(blob);
            fileReader.onerror = () => {
                reject(new Error('blobToBase64 error'));
            };
        });
    }
    // 调用
    blobToBase64(blob).then(res => {
        // 转化后的base64
        console.log('base64', res)
    })
```