/* 
* @Author: Lee
* @Date:   2017-08-28 15:47:18
* @Last Modified by:   Lee
* @Last Modified time: 2017-08-28 18:00:31
*/

$(document).ready(function(){
    
    var change = function() {
        if($('.right-history li').length) {
            $('.right-history').show();
        }else {
            $('.right-history').hide();
        }
    }

    /**
     * [getLeft 获取左侧菜单]
     */
    var getLeft = function() {
        $.ajax({
            url: '../data/left.json',
            type: 'POST',
            data: {
                FunType: "IF004",
                F001: "wq123"
            }
        })
        .done(function(res) {
            var html = '';
            if(parseInt(res.resultdata)) {
                for(var i = 0; i < res.ResData.length; i++) {
                    html += '<li><span>' + res.ResData[i].name + '<i class="fa fa-angle-right"></i></span><div>'
                    for(var j = 0; j < res.ResData[i].children.length; j++) {
                        html += '<dl>'
                             +      '<dt><span>' + res.ResData[i].children[j].name + '</span> <i class="fa fa-angle-right"></i></dt>'
                             +      '<dd>'
                        for(var k = 0; k < res.ResData[i].children[j].children.length; k++) {
                            html += '<a class="javascript:void(0);" data-id="' + res.ResData[i].children[j].children[k].id + '">' + res.ResData[i].children[j].children[k].name + '</a>'
                            if(k < res.ResData[i].children[j].children.length -1) {
                                html += '<i>|</i>';
                            }
                        }
                        html += '</dd></dl>';
                    }
                    html += '</div></li>'
                }
                $('#leftMenu').html(html);
            }
        })
        .fail(function() {
            console.log("error");
        })  
    }

    /**
     * [init 页面初始化]
     */
    var init = function () {
        change();
        getLeft();
    }

    /**
     * 鼠标移过菜单显示子菜单
     */
    $('#leftMenu').delegate('li', 'mouseover', function(event) {
        $(this).find('div').show();
    });

    /**
     * 鼠标移出菜单隐藏子菜单
     */
    $('#leftMenu').delegate('li', 'mouseout', function(event) {
        $(this).find('div').hide();
    });

    /**
     * 删除页面标签提示
     */
    $('.right-history').delegate('li a img', 'click', function(event) {
        $(this).parents('li').remove();
        event.stopPropagation();
        event.preventDefault();
        change();
    });

    /**
     * [左侧第二级菜单点击触发]
     */
    $('#leftMenu').delegate('dt', 'click', function(event) {
        $('#leftMenu li > div').hide();
        $('.right-body iframe').hide();
        if(!$('#database').length) {
            $(".right-body").append('<iframe name="database" frameborder="false" src="./database.html" scrolling="auto" style="border:none;" width="100%" id="database"></iframe>');
        }else {
            $('#database').show();
        }
    });

    /**
     * 左侧第三级菜单点击触发
     */
    $('#leftMenu').delegate('dd a', 'click', function(event) {
        $('.left li > div').hide();
        $('.right-body iframe').hide();
        if(!$('#detail').length) {
            $(".right-body").append('<iframe name="detail" frameborder="false" src="./detail.html?id=' + $(this).data('id') + '" scrolling="auto" style="border:none;" width="100%" id="detail"></iframe>');
        }else {
            $('#detail').show();
        }
        event.stopPropagation();
        event.preventDefault();
    }); 

    init();
});