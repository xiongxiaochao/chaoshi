


require.config({
    paths: {//设置短路径，取别名
        'jquery': 'jquery-1.10.1.min',
        'sw': 'swiper.min',
        'comm': 'common',
        'jdskt': 'jdskt',
        'shouye': 'shouye',
        'head': 'head'
    },
    shim: {
        'sw': {
            deps: ['jquery']
        },
        'jdskt': {
            deps: ['jquery', 'comm']
        },
        'shouye': {
            deps: ['jquery', 'comm', 'sw', 'jdskt']
        },
        'comm': {
            deps: ['jquery']
        },
        'head': {
            deps: ['jquery', 'comm', 'shouye']
        }
    }

});

requirejs(['jquery', 'sw', 'comm', 'jdskt', 'shouye', 'head'], function () {

    $('#jidong').load('html/head.html');
    $('#footer').load('html/foot.html');

});