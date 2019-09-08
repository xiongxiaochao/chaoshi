$(function () {
    let name = getCookie('name');
    $('.login').html(name + '&nbsp;&nbsp;&nbsp;&nbsp;铜牌会员&nbsp;&nbsp;&nbsp;');
    let uid = getCookie('uid');
    $('.regist').click(function () {
        location.href = 'register.html?';
    });

    var p = new Promise(function (sucfn) {
        $.ajax({
            type: "get",
            url: "../api/gwc.php",
            data: {
                uid: uid,
            },
            async: true,
            success: function (str) {
                sucfn(str);
            }
        });
    });


    p.then(function (data) {
        var arr = JSON.parse(data);
        console.log(arr.content)


        // console.log(arr);
        var res = arr.content.map(function (data) {
            var a = data.price * data.num;
            return `<div class="smc">
                <ul id="littlebox">
                     <li>
                        <div class="p-img fl">
                            <a href="###">
                                <img src="img/1.jpg" alt="">
                            </a>
                        </div>
                        <div class="p-name fl">
                            <a href="###" title="好丽友（orion）饼干蛋糕  营养早餐 下午茶 派 36枚超值量贩定制礼盒（新老包装交替发货）">
                               ${data.name}
                            </a>
                        </div>
                        <div class="p-price fr">
                            <span>￥${data.price}&nbsp;&nbsp;x${data.num}</span>
                            <br>
                            <a href="###">删除</a>
                        </div>
                    </li> 
                </ul>
            </div>`;
        }).join('');
        // console.log(data.pid)
        $('#topbox').html(res);
        $('#littlesum').html(100)
    });

});