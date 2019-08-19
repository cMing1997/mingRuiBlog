---
title: 记一次富文本emoji插入
date: 2019/7/15 18:20:32 
tags: [聊天emoji集成]
categories: 日常折腾
cover: "https://raw.githubusercontent.com/CasualMing/BlogPhoto/master/emoji.jpeg"

---

平时虽然使用过 **`emoji`** ，但是如果自己写，感觉上还是差点，这次就利用空闲实现自己试试 **`emoji`** 集成
<!--more-->

### 前言

> 平时虽然使用过 **`emoji`** ，但是如果自己写，感觉上还是差点，这次就利用空闲实现自己试试 **`emoji`** 集成

[github代码地址](https://github.com/CasualMing/common-JS/blob/master/emojs.js/)

![最后的效果](https://raw.githubusercontent.com/CasualMing/common-JS/master/emojs.js/emojiGif.gif)


### 插件
> 其实最开始集成 `emoji` 的时候，一点思路都没有，于是想着先去网上找下插件，就找到了 [emoji插件](https://github.com/node-modules/emoji) 体验了一下还行，而且都是使用原生实现的，于是我就下载到本地，查看源码。

然后发现他那主要是是根据预先设置的数组的数据，来设置 **`class`** 类名改变雪碧背景图的定位
![image.png](https://raw.githubusercontent.com/CasualMing/common-JS/master/emojs.js/emoji-yu.png)

这个库的数据数组，是使用 **`emoji`** 字体作为 **`key`** 值的保留数据的
![image.png](https://raw.githubusercontent.com/CasualMing/common-JS/master/emojs.js/emoji_js.png)

#### 使用
```javascript
// 需要自己定义显示的emoji字体  
let str = "😠😩😲😞😵😰😒😍😤😜😝😋😘😚😷😳😃😅😆😁😂😊☺😄😢😭😨😣😡😌😖😔😱😪😏😓😥😫😉🐽👬👭🌲🌳🍋😎😀☀☁☔⛄⚡🌀🌁🌂🌃🌄🌅🌆🌇🌈❄⛅🌉🌊🌋🌌🌏🌑🌔🌓🌙🌕🌛🌟🌠🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛⌚⌛⏰⏳♈♉♊♋♌♍♎♏♐♑♒♓⛎🍀🌷🌱🍁🌸🌹🍂🍃🌺🌻🌴🌵🌾🌽🍄🌰🌼🌿🍒🍌🍎🍊🍓🍉🍅🍆🍈🍍🍇🍑🍏👀👂👃👄👅💄💅💆💇💈👤👦👧👨👩👪👫👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃🐌🐍🐎🐔🐗🐫🐘🐨🐒🐑🐙🐚🐛🐜🐝🐞🐠🐡🐢🐤🐥🐦🐣🐧🐩🐟🐬🐭🐯🐱🐳🐴🐵🐶🐷🐻🐹🐺🐮🐰🐸🐾🐲🐼😺😸😹😽😻😿😾😼🙀🙅🙆🙇🙈🙊🙉🙋🙌🙍🙎🙏🏠🏡🏢🏣🏥🏦🏧🏨🏩🏪🏫⛪⛲🏬🏯🏰🏭⚓🏮🗻🗼🗽🗾🗿👞👟👠👡👢👣👓👕👖👑👔👒👗👘👙👚👛👜👝💰💱💹💲💳💴💵💸🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸🔥🔦🔧🔨🔩🔪🔫🔮🔯🔰🔱💉💊🅰🅱🆎🅾🎀🎁🎂🎄🎅🎌🎆🎈🎉🎍🎎🎓🎒🎏🎇🎐🎃🎊🎋🎑📟☎📞📱📲📝📠✉📨📩📪📫📮📰📢📣📡📤📥📦📧🔠🔡🔢🔣🔤✒💺💻✏📎💼💽💾💿📀✂📍📃📄📅📁📂📓📖📔📕📗📘📙📚📛📜📋📆📊📈📉📇📌📒📏📐📑🎽⚾⛳🎾⚽🎿🏀🏁🏂🏃🏄🏆🏈🏊🚃🚇Ⓜ🚄🚅🚗🚙🚌🚏🚢✈⛵🚉🚀🚤🚕🚚🚒🚑🚓⛽🅿🚥🚧🚨♨⛺🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🀄🎯🎰🎱🎲🎳🎴🃏🎵🎶🎷🎸🎹🎺🎻🎼〽📷📹📺📻📼💋💌💍💎💏💐💑💒🔞©®™ℹ#⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣0⃣🔟📶📳📴🍔🍙🍰🍜🍞🍳🍦🍟🍡🍘🍚🍝🍛🍢🍣🍱🍲🍧🍖🍥🍠🍕🍗🍨🍩🍪🍫🍬🍭🍮🍯🍤🍴☕🍸🍺🍵🍶🍷🍻🍹↗↘↖↙⤴⤵↔↕⬆⬇➡⬅▶◀⏩⏪⏫⏬🔺🔻🔼🔽⭕❌❎❗⁉‼❓❔❕〰➰➿❤💓💔💕💖💗💘💙💚💛💜💝💞💟♥♠♦♣🚬🚭♿🚩⚠⛔♻🚲🚶🚹🚺🛀🚻🚽🚾🚼🚪🚫✔🆑🆒🆓🆔🆕🆖🆗🆘🆙🆚🈁🈂🈲🈳🈴🈵🈶🈚🈷🈸🈹🈯🈺㊙㊗🉐🉑➕➖✖➗💠💡💢💣💤💥💦💧💨💩💪💫💬✨✴✳⚪⚫🔴🔵🔲🔳⭐⬜⬛▫▪◽◾◻◼🔶🔷🔸🔹❇💮💯↩↪🔃🔊🔋🔌🔍🔎🔒🔓🔏🔐🔑🔔☑🔘🔖🔗🔙🔚🔛🔜🔝✅✊✋✌👊👍☝👆👇👈👉👋👏👌👎👐"
 // 将生成的表情展现在页面上
document.querySelector(".emojiOne").innerHTML = jEmoji.unifiedToHTML(str)
```

<a name="WXgXr"></a>
### 修改

1. 在使用的过程中，提示的文字是英文，但是我们的用户一般是国人，所以我就将标签的提示文字改成了中文
1. 这个库动态生成是靠 **`unifiedToHTML`** 这个函数。我想着如果之后集成的时候。是需要保存到数据，然后就将 **`emoji`** 字体作为自定义属性放在了 **`span`** 上，并且由于 **`span`** 是追加在可编辑的 **`div`** 内。所以也继承了可编辑的特性，有点问题，这个之后稍后会提到
1. 因为这个库只会返回一堆处理之后的 **`span`** 标签字符串，并没有弄进输入框的方法，然后我就想着自己试下

```javascript
// 获取输入框元素
let editEle = document.querySelector(".data-input");
// 获取所有的表情元素
let spans = document.querySelectorAll(".emoji");
// 定义最后光标对象
var lastEditRange;
// 编辑框按键弹起事件
editEle.onkeyup = function () {
    // 获取选定对象
    var selection = getSelection();
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0);
};
editEle.onkeydown=function(e){
    console.log(e)
}
// 监听编辑框点击事件
editEle.onclick = function (e) {
    let focusDomClassList = Array.prototype.slice.call(e.target.classList);
    this.focus();
    // 获取选定对象
    var selection = window.getSelection();
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0);
    // 循环为表情元素注册点击事件;
    for (let index = 0; index < spans.length; index++) {
        const element = spans[index];
        element.onclick = function (e) {
            let targetDOM = e.target.outerHTML;
            _insertimg(targetDOM)
        }
    }
}
// 元素插入
function _insertimg(str) {
    var selection = window.getSelection ? window.getSelection() : document.selection;
    document.querySelector(".data-input").focus();
    if (lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        selection.removeAllRanges()
        selection.addRange(lastEditRange)
    }
    var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    if (!window.getSelection) {
        var selection = window.getSelection ? window.getSelection() : document.selection;
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        range.pasteHTML(str);
        range.collapse(false);
        range.select();
    } else {
        var hasR = range.createContextualFragment(str);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild
            .previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild);
        }
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range)
    }
    // 无论如何都要记录最后光标对象
    lastEditRange = selection.getRangeAt(0)
}
```
<a name="rewet"></a>
#### 坑

1. 光标的对象以及属性兼容不是很好，而且很难找到比较完善的文档
1. 修改之后，如果光标点在编辑框内的某个表情前面。光标就会定在 **`span`** 双标签内，这也就是我给 **`contenteditable="true"`** 属性的原因
1. 当表情跟文字一起的时候，光标定在表情后面的时候，删除不了表情。但是这个时候如果点击的光标后没有其他元素文字的时候，还是可以删除的。这个问题，我尝试了一下，是双标签的问题，换成 **`img`** 上面的问题都没有

### 后记

无意中在网上翻文章的时候，发现了 **`twemoji`** 这个库。这个库是 **`Twitter`** 和 **`Iconfactory`** 联合制作的 **`twemoji`** 完全开源

[插件地址](https://github.com/twitter/twemoji)

使用

```html
// 将插件放在页面中
<script src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js" crossorigin="anonymous"></script>

<script>
// 基础用法
 	let dataStr ="😠😩😲😞😵😰😒😍😤😜😝😋😘😚😷😳😃😅😆😁😂😊☺😄😢😭😨😣😡😌😖😔😱😪😏😓😥😫😉🐽👬👭🌲🌳🍋😎😀☀☁☔⛄⚡🌀🌁🌂🌃🌄🌅🌆🌇🌈❄⛅🌉🌊🌋🌌🌏🌑🌔🌓🌙🌕🌛🌟🌠🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛⌚⌛⏰⏳♈♉♊♋♌♍♎♏♐♑♒♓⛎🍀🌷🌱🍁🌸🌹🍂🍃🌺🌻🌴🌵🌾🌽🍄🌰🌼🌿🍒🍌🍎🍊🍓🍉🍅🍆🍈🍍🍇🍑🍏👀👂👃👄👅💄💅💆💇💈👤👦👧👨👩👪👫👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃🐌🐍🐎🐔🐗🐫🐘🐨🐒🐑🐙🐚🐛🐜🐝🐞🐠🐡🐢🐤🐥🐦🐣🐧🐩🐟🐬🐭🐯🐱🐳🐴🐵🐶🐷🐻🐹🐺🐮🐰🐸🐾🐲🐼😺😸😹😽😻😿😾😼🙀🙅🙆🙇🙈🙊🙉🙋🙌🙍🙎🙏🏠🏡🏢🏣🏥🏦🏧🏨🏩🏪🏫⛪⛲🏬🏯🏰🏭⚓🏮🗻🗼🗽🗾🗿👞👟👠👡👢👣👓👕👖👑👔👒👗👘👙👚👛👜👝💰💱💹💲💳💴💵💸🇨🇳🇩🇪🇪🇸🇫🇷🇬🇧🇮🇹🇯🇵🇰🇷🇷🇺🇺🇸🔥🔦🔧🔨🔩🔪🔫🔮🔯🔰🔱💉💊🅰🅱🆎🅾🎀🎁🎂🎄🎅🎌🎆🎈🎉🎍🎎🎓🎒🎏🎇🎐🎃🎊🎋🎑📟☎📞📱📲📝📠✉📨📩📪📫📮📰📢📣📡📤📥📦📧🔠🔡🔢🔣🔤✒💺💻✏📎💼💽💾💿📀✂📍📃📄📅📁📂📓📖📔📕📗📘📙📚📛📜📋📆📊📈📉📇📌📒📏📐📑🎽⚾⛳🎾⚽🎿🏀🏁🏂🏃🏄🏆🏈🏊🚃🚇Ⓜ🚄🚅🚗🚙🚌🚏🚢✈⛵🚉🚀🚤🚕🚚🚒🚑🚓⛽🅿🚥🚧🚨♨⛺🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🀄🎯🎰🎱🎲🎳🎴🃏🎵🎶🎷🎸🎹🎺🎻🎼〽📷📹📺📻📼💋💌💍💎💏💐💑💒🔞©®™ℹ#⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣0⃣🔟📶📳📴🍔🍙🍰🍜🍞🍳🍦🍟🍡🍘🍚🍝🍛🍢🍣🍱🍲🍧🍖🍥🍠🍕🍗🍨🍩🍪🍫🍬🍭🍮🍯🍤🍴☕🍸🍺🍵🍶🍷🍻🍹↗↘↖↙⤴⤵↔↕⬆⬇➡⬅▶◀⏩⏪⏫⏬🔺🔻🔼🔽⭕❌❎❗⁉‼❓❔❕〰➰➿❤💓💔💕💖💗💘💙💚💛💜💝💞💟♥♠♦♣🚬🚭♿🚩⚠⛔♻🚲🚶🚹🚺🛀🚻🚽🚾🚼🚪🚫✔🆑🆒🆓🆔🆕🆖🆗🆘🆙🆚🈁🈂🈲🈳🈴🈵🈶🈚🈷🈸🈹🈯🈺㊙㊗🉐🉑➕➖✖➗💠💡💢💣💤💥💦💧💨💩💪💫💬✨✴✳⚪⚫🔴🔵🔲🔳⭐⬜⬛▫▪◽◾◻◼🔶🔷🔸🔹❇💮💯↩↪🔃🔊🔋🔌🔍🔎🔒🔓🔏🔐🔑🔔☑🔘🔖🔗🔙🔚🔛🔜🔝✅✊✋✌👊👍☝👆👇👈👉👋👏👌👎👐";

 	let div = document.createElement('div');
    div.textContent =dataStr;
    document.body.appendChild(div);
	twemoji.parse(document.querySelector("div"))
	
// 如果觉得png不够清晰，可以使用svg格式的图片
 	div.textContent =dataStr;
	document.body.appendChild(div);
	twemoji.parse(document.querySelector("div"),{
		folder: 'svg',// 这里指明文件夹
        ext: '.svg'  // 这里指渲染的图片的格式
	})
// 还有一些其他的操作，具体可以看文档官网
</script>
```

#### 意外获得

**`Node.textContent`** 作用其实跟 **`innerText`** 作用差不多，但是 **`innerText`** 设置会引起网页重绘，并且**`innerText`**性能比不上 **`textContent`** ,使用 **`textContent`** 插入的属于文本形式，可以有效的防止 **`XSS`** 攻击。
