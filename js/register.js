




$(function () {
    var a = 0;

    $('#name').blur(function () {
        var name1 = $('#name').val();
        $.ajax({
            type: "get",
            url: "../api/insertuser.php",
            async: true,
            data: {
                name: name1
            },
            success: function (str) {
                // console.log(str)
                var arr = JSON.parse(str);
                console.log(arr)
                if (arr.content == '0') {
                    $('#np').html('该用户名可以使用');
                    $('#np').css('color', '#58BC58');
                    console.log(a)
                } else {
                    $('#np').html('该用户名已存在，请另外起一个吧');
                    $('#np').css('color', 'red');
                    a = 0;
                }
            }
        });
    });


    $('#psd').bind('input propertychange', function () {
        // console.log(123);
        var psw = $('#psd').val().trim();
        if (psw) {

            //不为空：正则  字母开头，总长度至少大于6位
            var reg = /^[a-zA-Z].{5,}$/;
            var res = reg.test(psw);
            if (psw.length >= 6 && res) {
                //正则匹配成功
                $('#p1').html('密码验证通过');
                $('#p1').css('color', '#58BC58');
            } else {
                $('#p1').html('密码验证不通过,字母开头，总长度至少大于6位');
                $('#p1').css('color', 'red');

            }
        } else {
            $('#p1').html('密码格式不正确！');
            $('#p1').css('color', 'red');
        }
    });

    $('#psdd').bind('input propertychange', function () {
        // console.log(123);
        var psw = $('#psdd').val().trim();
        var psw2 = $('#psd').val().trim();


        if (psw) {
            var reg = /^[a-zA-Z].{5,}$/;
            var res = reg.test(psw);
            if (psw.length >= 6 && res) {
                //正则匹配成功
                $('#p2').html('密码验证通过');
                $('#p2').css('color', '#58BC58');
                if (psw2 == psw) {
                    $('#p2').html('密码一致');
                    $('#p2').css('color', '#58BC58');
                    a = 2;
                } else {
                    $('#p2').html('密码不一致！');
                    $('#p2').css('color', 'red');
                    a = 0;
                }
            } else {
                $('#p2').html('密码验证不通过,字母开头，总长度至少大于6位');
                $('#p2').css('color', 'red');

            }
        } else {
            $('#p2').html('密码格式不正确！');
            $('#p2').css('color', 'red');
        }
        console.log(a)
    });




    $('.btn_next').click(function () {
        var reg = /^[a-zA-Z].{5,}$/;
        var res = reg.test(psw);
        var name1 = $('#name').val().trim();
        var psw = $('#psdd').val().trim();
        var psw2 = $('#psd').val().trim();
        if (a == 2 && (psw.length >= 6 && res) && (psw2.length >= 6 && res)) {
            $.ajax({
                type: "post",
                url: "../api/insertuser.php",
                async: true,
                data: {
                    name: name1,
                    psd: psw,
                    a: a
                },
                success: function (str) {
                    // console.log(str)
                    var arr = JSON.parse(str);
                    console.log(arr.content2);
                    console.log(arr.content4[0]);
                    console.log(arr.content4[0].id);
                    setCookie('name', $('#name').val(), 17);
                    setCookie('psw', $('#pwd').val(), 17);


                    setCookie('uid', arr.content4[0].id, 17);
                    location.href = '../shouye.html';
                }
            });
        } else {
            alert('信息有误请重新填写')
        }

    });



    var num = parseInt(Math.random() * (9999 - 1000 + 1) + 1000);
    $('#iphone').click(function () {

        var a = $('#mphone').val()
        $.ajax({
            type: "post",
            url: "../api/phone.php",
            async: true,
            data: {
                phone: a,
                num: num
            },
            success: function (str) {
                console.log(str)
                console.log(num)

            }
        });
    });

    $('#ma').bind('input propertychange', function () {
        var b = $('#ma').val();
        console.log(num)

        if (b == num) {
            $('#p3').html('验证通过');
            $('#p3').css('color', '#58BC58');
        } else {
            $('#p3').html('验证码不一致！');
            $('#p3').css('color', 'red');
        }
    });
});