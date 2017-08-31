/* 
* @Author: Lee
* @Date:   2017-08-28 14:21:38
* @Last Modified by:   Lee
* @Last Modified time: 2017-08-31 11:10:07
*/

$(document).ready(function(){
    /**
     * [getTopMenu 获取头部菜单权限]
     */
    var getTopMenu = function() {
        $.ajax({
            url: '../../data/topMenu.json',
            type: 'POST',
            data: {
                FunType: "IF003",
                F001: "wq123"
            }
        })
        .done(function(res) {
            var $topMenu = $('#top-menu li');
            if(parseInt(res.resultdata)) {
                var html = '';
                for(var i = 0; i < res.ResData.Privilege.length; i++) {
                    $topMenu.eq(parseInt(res.ResData.Privilege[i].F001)).removeClass('disabled').addClass('enable');
                }
            }
        })
        .fail(function() {
            
        })
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

});

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