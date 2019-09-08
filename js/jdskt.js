



$(function () {

    let name = getCookie('name');
    $('.login').html(name + '&nbsp;&nbsp;&nbsp;&nbsp;铜牌会员&nbsp;&nbsp;&nbsp;');
    $('.chaoshi_category_focus_pic').click(function () {
        location.href = 'html/list.html';
    });

    $('.sw_gwc').click(function () {//侧边栏展开
        // console.log(123)
        $(this).parent().parent().css('right', '540px');
    });
    $('#close').click(function () {
        // console.log(123)
        $(this).parent().parent().parent().css('right', '270px');
    });


    let uid = getCookie('uid');





    //渲染列表页的数据
    var p = new Promise(function (sucfn) {
        $.ajax({
            type: "get",
            url: "api/jdskt.php",
            async: true,
            success: function (str) {
                sucfn(str);
            }
        });
    });

    p.then(function (data) {
        // console.log(data)
        var arr = JSON.parse(data);
        // console.log(arr);
        var res = arr.content.map(function (data) {
            return `<li data-pid="${data.pid}" class="J_goods_item goods_item">
            <a class="goods_pic" id="goods_pic" href="###">
                <img src="img/${data.img[0]}" alt="">
            </a>
            <p class="goods_title">${data.name}</p>
            <div class="goods_prices">￥${data.price}</div>
            <a id="btn_add" class="goods_add" href="###">
                <i></i>
                <span >加入购物车</span>
            </a>
        </li>`;
        }).join('');
        // console.log(data.pid)
        $('#boxlist').html(res);
    });


    $('#boxlist').on('click', '#goods_pic', function () {
        var pid = $(this).parent().data();
        // console.log(pid.pid)
        location.href = 'html/details.html?' + pid.pid;
    });


    //回到顶部
    $('#totop').click(function () {
        $('html ,body').animate({ scrollTop: 0 }, 500);
        return false;
    });

    // 事件委托拿pid插入数据到gwc表
    $('#boxlist').on('click', '#btn_add', function () {
        console.log($(this).parent().data());
        var pppid = $(this).parent().data().id;

        $.ajax({
            type: "get",
            url: "api/jdskt.php",
            data: {
                pid: pppid
            },
            async: true,
            success: function (str) {
                var arr = JSON.parse(str);
                console.log(arr.content2);
                if (arr.content2 != '') {
                    // console.log(pppid)
                    // console.log(uid)
                    // console.log(arr.content2[0].num)
                    var a = arr.content2[0].num * 1 + 1
                    $.ajax({
                        type: "get",
                        url: "api/uad.php",
                        data: {
                            num: a,
                            uid: uid,
                            pid: pppid
                        },
                        async: true,
                        success: function (str) {
                            // alert('已经成功加入购物车！');
                            // location.href = 'html/gwc.html';
                            // console.log(123)
                        }
                    });
                } else {
                    // console.log(321)
                    $.ajax({
                        type: "get",
                        url: "api/insert.php",
                        data: {
                            num: '1',
                            uid: uid,
                            pid: pppid
                        },
                        async: true,
                        success: function (str) {
                            // alert('已经成功加入购物车！');
                            // location.href = 'html/gwc.html';
                            console.log(321)
                        }
                    });
                }
            }
        });
    });



    var p = new Promise(function (sucfn) {
        $.ajax({
            type: "get",
            url: "api/gwc.php",
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
            return `<div class="pdt">
            <div class="jtc-item-goods">
                <span class="p-img fl">
                    <a href="###">
                        <img src="img/${data.img}.jpg" alt="">
                    </a>
                </span>
                <div class="p-name fl">
                    <a href="###"> ${data.name}</a>
                </div>
                <div class="p-price fr">
                    <span>￥${data.price}&nbsp;&nbsp;x${data.num}</span>

                </div>
                <a href="###">删除</a>
            </div>
        </div>`;
        }).join('');
        // console.log(data.pid)
        $('#middlebox').html(res);

    });

});

