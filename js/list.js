




$(function () {


    let uid = getCookie('uid');
    var list = document.getElementById('warpbox');
    var ipage = 1; //第几页
    var num = 10; //每页10条数据
    var next = document.getElementById('nextPage');//下一页
    var previous = document.getElementById('prePage');//上一页
    var first = document.getElementById('firstPage');//首页
    var last = document.getElementById('lastPage');//尾页


    function init(ipage) {
        ajax2({
            type: 'get',
            url: '../api/list.php',
            data: 'page=' + ipage + '&num=' + num,
            success: function (str) {
                // console.log(str)
                create(str);
                asd(str);
            }
        });
    }

    function create(str) {

        var arr = JSON.parse(str);
        // console.log(arr.content)

        var res = arr.content.map(function (data) {
            return `<li class="gl_item" data-pid="${data.pid}">
                     <div class="gl_i_wrap">
                         <div class="p_img">
                             <a id="p_img" href="###">
                                 <img src="../img/${data.img[0]}" alt="">
                             </a>
                         </div>
                         <div class="p_price">
                             <strong class="J_price">
                                 <em>￥</em>
                                 <i>${data.price}</i>
                             </strong>
                         </div>
                         <div class="p_name">
                             <a href="###">
                                 <em>
                                     <span class="p_tag">京东超市</span>
                                     ${data.name}
                                 </em>
                                 <i>礼遇心仪好物，部分爆款面膜、洗面奶等2件或2件以上总价打8折任搭，选你所需一次全部带走，戳我抢购</i>
                             </a>
                         </div>
                         <div class="p_commit">
                             <strong>
                                 已有
                                 <a href="###" class="comment">1.9w</a>
                                 人评价
                             </strong>
                         </div>
                         <div class="p_icons">
                             <i>放心购</i>
                             <i>放心购</i>
                             <i>满减</i>
                         </div>
                         <div class="p_operate">
                             <div class="p_o_btn addcart">
                                 加入购物车
                             </div>
                         </div>
                     </div>
                 </li>`
        }).join('');
        list.innerHTML = res;

    }

    init(0)


    // var btn = document.getElementById('DataTables_Table_0_paginate');//点击第几页跳转

    page.onclick = (ev) => {

        if (ev.target.dataset.id == 'a1') {
            // alert(123)
            ipage = ev.target.innerHTML;
            console.log(ev.target)
            init(ipage);
        }

        if (ev.target.id == 'firstPage') {

            init(0);//首页

        }
        if (ev.target.id == 'lastPage') {

            init(25);//尾页

        }


        if (ev.target.id == 'prePage') {//上一页
            ipage = ipage - 1;
            if (ipage <= 1) {
                ipage = 1;
                init(ipage);
            } else {
                init(ipage)
            }
        }
        if (ev.target.id == 'nextPage') {//下一页
            ipage = ipage * 1 + 1;
            if (ipage >= 25) {
                ipage = 25;
                init(ipage)
            } else {
                init(ipage);
            }
        }
    }
    function asd(str) {
        var arr = JSON.parse(str);
        // console.log(arr)
        // pageMe.js 使用方法
        $("#page").paging({
            pageNum: ipage, // 当前页面
            totalNum: arr.total, // 总页码
            totalList: arr.total, // 记录总数量
            callback: function (num) { //回调函数
                console.log(num);
            }
        });
    }
    if (ipage == '25') {
        $('.p_next').attr('.disabled')
    }

    $('#warpbox').on('click', '.p_img', function () {
        // alert(123)
        // console.log($(this).parent().parent().data());
        var pidd = $(this).parent().parent().data();
        location.href = 'details.html?' + pidd.pid;
    });



    $('#warpbox').on('click', '.p_o_btn', function () {
        // console.log($(this).parent().parent().parent().data());
        var pppid = $(this).parent().parent().parent().data();
        console.log(pppid.pid)
        $.ajax({
            type: "get",
            url: "../api/jdskt.php",
            data: pppid,
            async: true,
            success: function (str) {
                var arr = JSON.parse(str);
                // console.log(arr.content2);
                if (arr.content2 != '') {
                    // console.log(pppid)
                    // console.log(uid)
                    // console.log(arr.content2[0].num)
                    var a = arr.content2[0].num * 1 + 1
                    $.ajax({
                        type: "get",
                        url: "../api/uad.php",
                        data: {
                            num: a,
                            uid: uid,
                            pid: pppid.pid
                        },
                        async: true,
                        success: function (str) {
                            alert('已经成功加入购物车！');
                            location.href = 'gwc.html';
                            console.log(123)
                        }
                    });
                } else {
                    // console.log(321)
                    $.ajax({
                        type: "get",
                        url: "../api/insert.php",
                        data: {
                            num: 1,
                            uid: uid,
                            pid: pppid.pid
                        },
                        async: true,
                        success: function (str) {
                            alert('已经成功加入购物车！');
                            location.href = 'gwc.html';
                            console.log(pppid.pid)
                            // console.log(num)
                            // console.log(uid)
                        }
                    });
                }
            }
        });
    });


    $('#ord').click(function (str) {
        $.ajax({
            type: "get",
            url: "../api/list2.php",
            data: {
                page: ipage,
                num: num,
                type: 'price',
                order: 'DESC'
            },
            async: true,
            success: function (str) {
                create(str)
            }
        });
    })

    $('#dro').click(function (str) {
        $.ajax({
            type: "get",
            url: "../api/list2.php",
            data: {
                page: ipage,
                num: num,
                type: 'price',
                order: ''
            },
            async: true,
            success: function (str) {
                create(str)
            }
        });
    })



    let name = getCookie('name');
    $('.login').html(name + '&nbsp;&nbsp;&nbsp;&nbsp;铜牌会员&nbsp;&nbsp;&nbsp;');

});
