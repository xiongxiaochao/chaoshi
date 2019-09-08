//swiper基本款
var s1 = new Swiper('.swiper-container3', {
    autoplay: {//自动轮播
        delay: 2000,//间隔时间
        disableOnInteraction: false //拖拽完后还能继续自动轮播
    },
    loop: true,//无缝
    navigation: {//上下按钮
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 130,

    },
    mousewheel: true,//滚动滑轮可以切图
    effect: 'fade'//选用:效果

});
s1.scrollbar.$dragEl.css('background', '#ec7002');

var oBox = document.getElementById('swiper-container');

oBox.onmouseover = function () {//鼠标经过停止
    s1.autoplay.stop();
}

oBox.onmouseout = function () {//鼠标离开就运动
    s1.autoplay.start();
}

var s2 = new Swiper('.swiper-container2', {
    slidesPerView: 6,
    spaceBetween: 30,
    slidesPerGroup: 6,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {//自动轮播
        delay: 2000,//间隔时间
        disableOnInteraction: false //拖拽完后还能继续自动轮播
    },
});

var s3 = new Swiper('.swiper-container1', {
    autoplay: {//自动轮播
        delay: 2000,//间隔时间
        disableOnInteraction: false //拖拽完后还能继续自动轮播
    },
    loop: true,//无缝
    mousewheel: true,//滚动滑轮可以切图
    effect: 'fade'//选用:效果
});

//引入子模块
$('#jidong').load('html/head.html');
$('#footer').load('html/foot.html');



