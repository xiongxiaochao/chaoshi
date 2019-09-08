



$(function () {

    $('.goback').click(function () {
        alert(123)
        location.href = '../shouye.html?';
    });

    let uid = getCookie('uid');

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
            return `
                <div class="item_list" data-id="${data.pid}">
                              <p class="good_check"><input type="checkbox" name="good" value="" /></p>
                              <p class="good_img"><img src="../img/1.jpg" alt=""></p>
                              <p class="good_name">${data.name} </p>
                              <p class="good_price">￥&nbsp;${data.price}</p>
                              <p class="num">
                                  <span class="cutnum">-</span>
                                  <input class="nownum" data-num="200" type="text" value="${data.num}" />
                                  <span class="addnum">+</span>
                              </p>
                              <p class="good_total">￥&nbsp;`+ a + `</p>
                              <p class="good_del">
                                  <a href="javascript:;">删除</a>
                              </p>
                          </div>
                      </li>`;
        }).join('');
        // console.log(data.pid)
        $('.ltembox').html(res);



    });



    //1.数量变化：加减数量、手动修改数量
    $('#cart').on('click', '.addnum', function () {
        var num = $(this).prev().val();
        var kuncun = $(this).prev().data('num');
        var pppid = $(this).parent().parent().data().id;
        num++;
        if (num >= kuncun) {//设置上限
            num = kuncun;
        }
        $(this).prev().val(num);
        $.ajax({
            type: "get",
            url: "../api/uad_gwc.php",
            data: {
                pid: pppid,
                num: num,
                uid: uid
            },
            async: true,
            success: function (str) {
                console.log(str)
            }
        });
        total($(this));
    });

    $('#cart').on('click', '.cutnum', function () {
        var num = $(this).next().val();
        num--;
        if (num <= 1) {//设置下限
            num = 1;
        }
        $(this).next().val(num);
        // console.log($(this).parent().parent().data().id)
        var pppid = $(this).parent().parent().data().id;
        $.ajax({
            type: "get",
            url: "../api/uad_gwc.php",
            data: {
                pid: pppid,
                num: num,
                uid: uid
            },
            async: true,
            success: function (str) {
                console.log(str)
            }
        });
        total($(this));
    });

    //手动输入的时候，改变数量
    $('#cart').on('input', '.nownum', function () {
        var num = $(this).val();
        var kuncun = $(this).data('num');
        var pppid = $(this).parent().parent().data().id;
        if (num <= 1) {
            num = 1;
        } else if (num >= kuncun) {
            num = kuncun;
        }
        $(this).val(num);
        $.ajax({
            type: "get",
            url: "../api/uad_gwc.php",
            data: {
                pid: pppid,
                num: num,
                uid: uid
            },
            async: true,
            success: function (str) {
                console.log(str)
            }
        });
        total($(this));
    });

    //小计的计算
    function total(now) {
        //找到数量
        var num = $(now).parent().find('.nownum').val();
        //找到单价
        var price = $(now).parent().prev().text().slice(2);
        //小计=数量*单价
        var xiaoji = (num * price).toFixed(2);
        $(now).parent().next().html('￥ ' + xiaoji);
        all();
    }


    //删除当行
    $('#cart').on('click', '.good_del', function () {
        var res = confirm('您确认要删除吗？');
        if (res) {
            $(this).parent().remove();
            var pppid = $(this).parent().data().id;
            // console.log(pppid);
            var num = $(this).parent().children('.num').children('.nownum').val();
            console.log(num)
            $.ajax({
                type: "get",
                url: "../api/del_gwc.php",
                data: {
                    pid: pppid,
                    num: num,
                    uid: uid
                },
                async: true,
                success: function (str) {
                    console.log(str)
                }
            });
        }
        update();



    });


    //判断如果一个商品都没有了，就隐藏最后一行(统计总数量和总价的)
    function update() {
        var len = $('.addnum').size();
        if (len == 0) {
            $('#del').hide();
        } else {
            $('#del').show();
        }
    }

    //全选
    $('#allchecked input').click(function () {
        var istrue = $('#allchecked input').prop('checked');
        $('.good_check input').prop('checked', istrue);
        all();
    });

    //计算总数量和总价格
    var arr = [];
    function all() {
        arr = [];//存被勾选的复选框的下标
        $('.good_check input').each(function (i, item) {
            if ($(item).prop('checked')) {
                //被勾选了，把下标存起来
                arr.push(i);
            }
        });

        //总数量
        var num = 0;
        //总价格
        var price = 0;

        arr.forEach(function (item) {
            num += $('.nownum').eq(item).val() * 1;
            price += $('.good_total').eq(item).text().slice(2) * 1;
        });

        // console.log(num, price.toFixed(2));

        //渲染到节点
        $('#allnum').html('已选' + num + ' 件商品');
        $('#totalprice').html('总计（不含运费）：￥' + price.toFixed(2));

    }

    //点击复选框反过来控制全选按钮
    $('#cart').on('click', '.good_check input', function () {
        var len = $('.good_check input:checked').size();
        var total = $('.good_check input').size();
        if (len == total) {
            //全都勾选了
            $('#allchecked input').prop('checked', true);
        } else {
            $('#allchecked input').prop('checked', false);
        }
        all();//刷新总数量和总价格
    });

    //全删
    $('#delall').click(function () {
        var res = confirm('您确定要删除全部吗');
        if (res) {
            console.log(arr);
            for (var i = arr.length - 1; i >= 0; i--) {//从数组的尾部开始删除
                $('.goods').eq(arr[i]).remove();
            }
            all();//刷新总数量和总价格
            update();
        }
        //		
    });




});