/* 
* @Author: Lee
* @Date:   2017-08-28 15:47:18
* @Last Modified by:   Lee
* @Last Modified time: 2017-09-01 16:37:24
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
            url: '../../data/left.json',
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
        $('.right-body iframe').hide();
        $('#home').show();
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
        $('#database').height('auto');
        if($('.right-history li').length < 2) {
            $('.right-history ul').append('<li><a href="javascript: void(0);"><i></i><img src="../../images/history-close.png"  alt="" /></a></li>');
        }
        $('.right-history li:last-child').attr('data-link','database').find('i').text($(this).find('span').text());
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
            $('#detail').attr('src','./detail.html?id=' + $(this).data('id'));
            $('#detail').show();
        }
        if($('.right-history li').length < 2) {
            $('.right-history ul').append('<li><a href="javascript: void(0);"><i></i><img src="../../images/history-close.png"  alt="" /></a></li>');
        }
        $('#detail').height('auto');
        $('.right-history li:last-child').attr('data-link','detail').find('i').text($(this).text());
        event.stopPropagation();
        event.preventDefault();
    }); 

    /**
     * [点击标签显示相应的iframe]
     */
    $('.right-history').delegate('li', 'click', function() {
        $('.right-body iframe').hide();
        $('#' + $(this).data('link')).show();
    })

    init();
});