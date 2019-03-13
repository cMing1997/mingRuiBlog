---
title: 记一次生成Pdf跟Excel文档的经历
date: 2018-12-28
categories: 文档生成
tags:
  - 实践
  - JavaScript
---

> 最近一位朋友希望我帮他做个可以打开就可以编辑的表格报告页面，功能很少，如果有后端配合的话，是很容易的一件事，但是这次是他们也找不到后端做这个。而我很惭愧，不懂后端的代码，虽然之前学过皮毛的 **`PHP`** 跟一丢丢的 **`node`** 。但是由于之后工作上没怎么接触这方面的，也都忘记了。于是乎，想着能不能纯前端实现这种需求，
要实现这种需求，同样要实现编辑存储，所以我决定先把最基础的功能实现，---- 编辑 /添加删除表格功能
> 说干就干！

<!-- more -->

### 开始布局

由于 **`HTML`** 跟 **`css`**太简单，就不贴出来
![](https://i.imgur.com/vg1Hmil.png)
这样大概的雏形是有了
![](https://i.imgur.com/bmDXK0Z.png)

> 然后就是编辑的功能，基于操作的要求，也不能弄的太难，所以我想能不能直接在编辑的地方，右键就能编辑，于是做了一个弹框，也就一个 **`input`** 加一个保存按钮，平时把他隐藏，右键的时候，再让修改弹框显示

```js
 // 监听右键点击
  getIdDon("tables").oncontextmenu = function(e) {
        e.preventDefault();
        target = e.target;
        if (target.children.length) {
            return false;
        }
        getClassDom("popup")[0].style.display = "block";
        getIdDon("popup-input").value = target.innerText;
    }
```
![](https://i.imgur.com/ZkNZ77H.png)

### 遇到的第一个问题

> 这里最开始碰到一个问题，就是右键的时候，会出现浏览器默认的右键菜单，但是在这个业务中不需要。于是乎在想，浏览器的默认菜单是浏览器默认的，那么如果把右键默认行为给禁止那不就好了。于是 **`e.preventDefault()`**
> 然后就是有的一格里有很多**`dom`** 元素，但是有的会有类名，右键的时候如果不加以判断，那么就会出现包裹的**`dom`**元素消失，就需要判断点击元素是否有子元素就可以

然后就是添加删除，也简单，就是复制节点，追加节点，以及删除节点

```js
 // 删除元素
    getClassDom("less")[0].onclick = function() {
            var lastchild = getClassDom("tb-tbody")[0].children[getClassDom("tb-tbody")[0].children.length - 2];
            getClassDom("tb-tbody")[0].removeChild(lastchild);
        }
        // 增加元素
    getClassDom("add")[0].onclick = function() {
        var lastchild = getClassDom("tb-tbody")[0].children[getClassDom("tb-tbody")[0].children.length - 2].cloneNode(true);
        getClassDom("tb-tbody")[0].appendChild(lastchild);
    }

```

### 剩下来就是重头戏，保存环节

最开始想的是生成PDF文档，是使用 **`HTML2cavas+jsPDF`**

>**`html2canvas`**：,对整个或局部页面进行‘截图’。但这并不是真的截图，而是通过遍历页面 **`DOM`** 结构，收集所有元素信息及相应样式，渲染出 **`canvas image`**；
由于 **`html2canvas`** 只能将它能处理的生成 **`canvas image`**，因此渲染出来的结果并不是100%与原来一致。但它不需要服务器参与，整个图片都由客户端浏览器生成，使用很方便。

> **`jsPDF`**：可以用于浏览器端生成 **`PDF`**。

```js
// document.body是要生成的PDF文档的区域选择器
html2canvas(document.body, {
  onrendered:function(canvas) {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = 592.28/contentWidth * contentHeight;
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('', 'pt', 'a4');
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
      } else {
          while(leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if(leftHeight > 0) {
                pdf.addPage();
              }
          }
      }
	  //最后由jsPDF保存并下载下来
      pdf.save('content.pdf');
  }
})
```
### 野心
由于要考虑其他格式，所以我又不满足于只保存为 **`PDF`** 文档，想可以保存 **`Word`** **`Excel`**，于是又在网上找，找到了 **`tableExport.jquery.plugin`**这个插件是前端可以独立生成的。
这个插件说是可以生成**`JSON，XML，PNG，CSV，TXT，SQL，MS-Word，Ms-Excel，Ms-Powerpoint，PDF`**
```js
//文档
//jquery Plugin //必引
 <script type="text/javascript" src="tableExport.js">
 <script type="text/javascript" src="jquery.base64.js">

//PNG Export
<script type="text/javascript" src="html2canvas.js">

//PDF Export
<script type="text/javascript" src="jspdf/libs/sprintf.js">
<script type="text/javascript" src="jspdf/jspdf.js">
<script type="text/javascript" src="jspdf/libs/base64.js">

//Usage
//使用方法
onClick ="$('#tableID').tableExport({type:'pdf',escape:'false'});"

//Options 配置
separator: ','
ignoreColumn: [2,3],  //忽略某一列的索引  
tableName:'yourTableName'   //用户列表',文件名称设置  
type:'csv' //生成什么类型的文档
pdfFontSize:14 //PDF文档的文字大小
pdfLeftMargin:20
escape:'true'
htmlContent:'false'
consoleLog:'false'
``` 
使用这个插件的时候。导出 **`word`** 以及 **`Excel`** 样式会出问题，具体的还是得进一步研究研究。今天先记载到这里吧