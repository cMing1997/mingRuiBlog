function oneTalk({
    dom = ".oneTalkSay",
    cat = '',
    charset = "utf-8",
    length = 100,
    encode = "json",
    fun = "sync",
    source = "",
}) {
    // 一言
    var oneDom = document.querySelector(dom);
    fetch(`https://api.imjad.cn/hitokoto/?cat=${cat}&charset=${charset}&length=${length}&encode=${encode}&fun=${fun}&source=${source}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                oneDom.innerHTML = "一言请求失败";
                // Find some way to get to execute .catch()
            }
        })
        .then(function (data) {
            // var hitokoto = document.getElementById('hitokoto');
            oneDom.innerText = data.hitokoto;
        })
        .catch(function (err) {
            console.error(err);
        });
}