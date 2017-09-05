/* 
* @Author: Lee
* @Date:   2017-08-28 14:21:38
* @Last Modified by:   Lee
* @Last Modified time: 2017-09-05 14:36:25
*/

/**
 * 错误提示弹框
 * @param {[string]} mes  错误信息
 * @param {[string]} type 弹框样式类名
 */
var XAlert = function (mes, type) {
    $('body').dialog({
        type: type ? type : 'warning',
        showBoxShadow:true,
        duration:0,
        buttons:[
            {
                name: '确定',
                className: 'false'
            }
        ],
        discription:mes,
        buttonsSameWidth:true,
        discriptionFontSize:'14px',
        showCloseIcon:true
    })
}

/**
 * 创建登录登录弹窗dom
 */
var createLoginHtml = function() {
    var html = '';
    html += '<div class="login-dialog">'
         +      '<div class="login-dialog-mask"></div>'
         +      '<form class="login-dialog-box">'
         +          '<h1><img src="../../images/login_title.png"></h1>'
         +          '<div class="login-main">'
         +              '<div class="login-row">'
         +                  '<label for="">用户名</label>'
         +                  '<input type="text" placeholder="用户名" class="login-text" id="userName">'
         +              '</div>'
         +              '<div class="login-row">'
         +                  '<label for="">密码</label>'
         +                  '<input type="password" placeholder="密码" class="login-text" id="pwd">'
         +              '</div>'
         +              '<div class="login-row">'
         +                  '<div class="login-checkbox">'
         +                      '<input type="checkbox" name="F003" value="1" id="remember">'
         +                      '<i></i>'
         +                      '<span>Check me out</span>'
         +                  '</div>'
         +              '</div>'
         +              '<div class="login-row login-btns">'
         +                  '<a href="javascript:void(0);" id="login-submit">登录</a>'
         +                  '<a href="javascript: void(0);" id="anonymous">匿名登录</a>'
         +              '</div>'
         +              '<div class="login-row tc login-reg">'
         +                   '还没有账号？<a href="../reg/reg.html">马上注册</a>'
         +              '</div>'
         +          '</div>'
         +          '<div class="login-error">'
         +              '<div id="login-error-box" class="animated"><i></i><span>您输入的用户名有误</span></div>'
         +          '</div>'
         +      '</form>'
         +  '</div>'

    $('body').append(html);
}

/**
 * [errorReturn ajax获取数据失败]
 */
var errorReturn = function() {
    XAlert('获取数据失败，请检查网络！');
}

$(document).ready(function(){
    
    /**
     * [getTopMenuSuccess 请求头部菜单成功回调]
     * @param  {[type]} res 返回的数据
     */
    var getTopMenuSuccess = function(res) {
        var $topMenu = $('#top-menu li');
        if(parseInt(res.resultdata)) {
            var html = '';
            for(var i = 0; i < res.ResData.Privilege.length; i++) {
                $topMenu.eq(parseInt(res.ResData.Privilege[i].F001)).removeClass('disabled').addClass('enable');
            }
        }
    }  

    /**
     * [getTopMenu 获取头部菜单权限]
     */
    var getTopMenu = function() {
        var url = '../../data/topMenu.json';
        var funType = 'POST';
        var params = {
                FunType: "IF003",
                F001: "wq123"
            }

        getData(url, funType, params, getTopMenuSuccess, errorReturn);
    }

    /**
     * [topInit 头部菜单初始化]
     */
    var topInit = function() {
        getTopMenu();
    }

    /**
     * 头部菜单点击触发
     */
    $('#top-menu li').click(function() {
        if($(this).hasClass('enable')) {
            location.href = $(this).find('a').data('link');
        }
    })

    topInit();

    createLoginHtml();

    /**
     * 显示登录弹窗
     */
    $('body').delegate('#login', 'click', function(event) {
        $('.login-dialog').show();
    });

    /**
     * 隐藏登录弹窗
     */
    $('body').delegate('.login-dialog-mask', 'click', function(event) {
        $('.login-dialog').hide();
    });

    /**
     * 匿名登录
     */
    $('body').delegate('#anonymous', 'click', function() {
        $(this).text('匿名登录中...');
        location.href = '../home/index.html';
    });

    /**
     * 关闭错误提示
     */
    $('body').delegate('.login-error i', 'click', function() {
        $('.login-error').hide();
        $('.login-error').removeClass('shake');
    })


    /**
     * [loginSuccess 请求登录数据成功]
     * @param  {[type]} res 返回的数据
     */
    var loginSuccess = function(res) {
        if(parseInt(res.resultdata)) { //登录成功
            location.href = '../home/index.html';
        }else { //登录失败
            $('#login-submit').text('登录').removeClass('active');
            $('.login-error span').text('登录失败，用户名或密码错误！');
            $('.login-error div').addClass('shake');
            $('.login-error').show();
        }
    }

    /**
     * [loginError 请求登录数据失败]
     */
    var loginError = function() {
        $('#login-submit').text('登录').removeClass('active');
        $('.login-error span').text('登录失败，请检查网络！');
        $('.login-error div').addClass('shake');
        $('.login-error').show();
    }

    /**
     * 登录
     */
    $('body').delegate('#login-submit', 'click', function() {

        if($(this).hasClass('active')) return;

        var userName = $('#userName').val();
        var pwd = $('#pwd').val();
        //用户名验证
        if(userName.length < 2 || userName.length > 20) {
            $('.login-error span').text('用户名长度应该在2-20位之间！');
            $('.login-error div').addClass('shake');
            $('.login-error').show();
            return;
        }
        //密码验证
        if(pwd.length < 6 || pwd.length > 20) {
            $('.login-error span').text('密码长度应该在6-20位之间！');
            $('.login-error div').addClass('shake');
            $('.login-error').show();
            return;
        }

        $(this).text('登录中...').addClass('active');
        $('.login-error').hide();
        $('.login-error').removeClass('shake');

        var url = '../../data/login.json';
        var funType = 'POST';
        var params = {
                FunType: "IF002",
                F001: $('#userName').val(),
                F002: $('#pwd').val(),
                F003: $('#remember:checked').length
            }

        //表单提交
        getData(url, funType, params, loginSuccess, loginError);
  
    })

});
