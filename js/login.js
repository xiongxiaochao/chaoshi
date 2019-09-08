


$(function () {
    $('.login_tab_l').click(function () {//扫码登录与账户登录的框切换
        // console.log($(this))
        $(this).siblings('.login_box')
            .children('.mc')
            .css('display', 'none');
        $(this).siblings('.login_box')
            .children('.mc2')
            .css('display', 'block');
        $(this).children().addClass('checked');
        $(this).siblings('.login_tab').children().removeClass('checked');
    });
    $('.login_tab_r').click(function () {
        // console.log($(this))
        $(this).siblings('.login_box')
            .children('.mc')
            .css('display', 'block');
        $(this).siblings('.login_box')
            .children('.mc2')
            .css('display', 'none');
        $(this).children().addClass('checked');
        $(this).siblings('.login_tab').children().removeClass('checked');
    });



    //登录验证
    $('#loginsubmit').on('click', function () {

        var p = new Promise(function (sucfn) {//写异步请求的代码
            $.ajax({
                type: "post",
                url: "../api/login.php",
                async: true, //默认异步
                data: {//第一种写法：字符串 'name=malin&psw=123456'，第二种写法：对象
                    name: $('#loginname').val(),
                    passsword: $('#nloginpwd').val()
                },
                success: function (str) {
                    sucfn(str);//拿到数据就返回到then那里做处理：防止嵌套太多出现回调地狱
                }
            });
        });

        p.then(function (data) {//数据渲染写在then里面
            // console.log(data)
            if (data == 'no') {
                alert('账号密码有误！请重新输入！')
            } else {
                setCookie('name', $('#loginname').val(), 17);
                setCookie('psw', $('#nloginpwd').val(), 17);
                var arr = JSON.parse(data);
                var res = arr.map(function (data) {
                    return data.id;
                });
                setCookie('uid', res, 17);
                location.href = '../shouye.html';
            }
        });

    });


});