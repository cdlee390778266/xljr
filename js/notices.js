/* 
* @Author: Lee
* @Date:   2017-08-30 10:56:51
* @Last Modified by:   Lee
* @Last Modified time: 2017-09-05 16:31:13
*/

/**
 * [getNewsSuccess 获取公告列表数据成功]
 * @param  {[type]} res 返回的数据
 */
var getNewsSuccess = function(res, pageNum) {
    if(parseInt(res.resultdata)) {
        var html = '';
        for (var i = 0; i < res.ResData.length; i++) {
            html += '<div class="new-item">'
                 +      '<h3 class="active">' + res.ResData[i].F002 + '</h3>'
                 +      '<a href="javascript:void(0);" data-link="notice.html?id=' + res.ResData[i].F001 + '">' + res.ResData[i].F004 + '...</a>'
                 +  '</div>'
        };
         renderPageHTML(pageNum,res.pagerow,res.datacount,$('#page'),'renderPage');
        $('.new-body').html(html); 
        $('.new-page').show();  
    }else {
        $('.new-body').html('<div class="newsList-empty">没有相应的公告！</div>');
        $('.new-page').hide();
    }

    $('#loading').hide();
}

/**
 * [getNewsError 获取公告列表数据失败]
 */
var getNewsError = function() {
    $('.new-page').hide();
    $('#loading').hide();
    $('.new-body').html('<div class="newsList-empty">检索失败，请检查网络！</div>');  
}


/**
 * 翻页
 * @param  {[type]} pageNum 点击的页码
 */
var renderPage = function(pageNum) {
    var params = $('#search-form').serialize();
    var url = '../../data/noticeslist.json';
    var funType = 'POST';
    var params = {
            FunType: "IF010",
            F001: "wq123",
            F002: pageNum 
        }

    $('#loading').show();

    //获取公告列表
    getData(url, funType, params, function(res) {
        getNewsSuccess(res, pageNum);
    }, getNewsError);
}


$(document).ready(function(){

    /**
     * [getNewsTreeSuccess 左侧公告树数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getNewsTreeSuccess = function(res) {
        var html = '';
        if(parseInt(res.resultdata)) {
            for(var i = 0; i < res.ResData.length; i++) {
                html += '<li><span data-id="' + res.ResData[i].id + '">' + res.ResData[i].name +'</span><ul>'
                    for(var j = 0; j < res.ResData[i].children.length; j++) {
                        html += '<li><span data-id="' + res.ResData[i].children[j].id + '">' + res.ResData[i].children[j].name +'</span><ul>'
                            for(var k = 0; k < res.ResData[i].children[j].children.length; k++) {
                                html += '<li><span data-id="' + res.ResData[i].children[j].children[k].id + '">' + res.ResData[i].children[j].children[k].name +'</span><ul>'
                                    for(var l = 0; l < res.ResData[i].children[j].children[k].children.length; l++) {
                                        html += '<li><span data-id="' + res.ResData[i].children[j].children[k].children[l].id + '">' + res.ResData[i].children[j].children[k].children[l].name +'</span></li>'
                                    }
                                html += '</ul></li>'
                            }
                        html += '</ul></li>'
                    }
                html += '</ul></li>'
            }
        }

        $('#menu').append(html);
        //左侧按钮初始化
        $("#menu").treeview({
            collapsed: true
        });
    }
    /**
     * 创建左侧公告树
     */
    var createNewsTree = function() {
        var url = '../../data/noticeLeftMenu.json';
        var funType = 'POST';
        var params = {
                FunType: "IF016",
                F001: "wq123"
            }

        getData(url, funType, params, getNewsTreeSuccess, errorReturn);
    }

    /**
     * [getRefreshNewsSuccess 获取刷新公告列表数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getRefreshNewsSuccess = function(res) {
        if(parseInt(res.resultdata)) {
            var html = '';
            for (var i = 0; i < res.ResData.length; i++) {
                html += '<div class="new-item">'
                     +      '<h3 class="active">' + res.ResData[i].F002 + '</h3>'
                     +      '<a href="javascript:void(0);" data-link="notice.html?id=' + res.ResData[i].F001 + '">' + res.ResData[i].F004 + '...</a>'
                     +  '</div>'
            };
            $('.new-body').html(html);
            renderPageHTML(1,res.pagerow,res.datacount,$('#page'),'renderPage');
            $('.new-page').show();  
        }else {
            $('.new-body').html('<div class="newsList-empty">没有相应的公告！</div>');
            $('.new-page').hide();
        }
        $('#loading').hide();
    }

    /**
     * [getRefreshNewsError 获取刷新公告列表数据失败]
     */
    var getRefreshNewsError = function() { 
        $('.new-body').html('<div class="newsList-empty">检索失败，请检查网络！</div>');
        $('.new-page').hide();
        $('#loading').hide();
    }

    /**
     * 刷新公告列表
     */
    var refreshNewsList = function(params) {
        $('#F002').val(params.newsListId);
        $('#F002').val(newsListId);
        $('#loading').show();

        var url = '../../data/noticeslist.json';
        var funType = 'POST';
        var params = params

        getData(url, funType, params, getRefreshNewsSuccess, getRefreshNewsError);

    }


    //点击公告树
    $('#menu').delegate('li span', 'click', function(event) {
        newsListId = $(this).data('id');
        $('#search-form')[0].reset();
        var params = {
                FunType: "IF012",
                F001: "wq123",
                F002: newsListId,
                F003: "300002",
                F004: "激励",
                F005: "行权",
                F006: "20170101",
                F007: "20170701"
            };
        refreshNewsList(params);
    });

    /**
     * 点击公告跳转到公告详情页
     */
    $('.new-body').delegate('.new-item a', 'click', function(event) {
        parent.window.location.href = $(this).data('link');
    });

    /**
     * 选择检索类型触发
     */
    $('#type').change(function() {
        if($(this).val() == 0) {
            $('#keywords').attr('name', 'F004');
        }else {
            $('#keywords').attr('name', 'F005');
        }
    })

    /**
     * 日期选择
     */
    $('#date').dateRangePicker({
        separator : ' 至 ',
        getValue: function()
        {
            if ($('#start').val() && $('#end').val() )
                return $('#start').val() + ' 至 ' + $('#end').val();
            else
                return '';
        },
        setValue: function(s,s1,s2)
        {

            $('#start').val(s1.replace(/-/g,''));
            $('#end').val(s2.replace(/-/g,''));
        }
    });
    
    /**
     * 条件检索
     */
    $('#search-form').submit(function(event) {
        event.preventDefault();

        if(!$('#F003').val()) {
            XAlert('证券号不能为空！');
            return;
        }
        if(!$('#keywords').val()) {
            XAlert('关键字不能为空！');
            return;
        }
        refreshNewsList($('#search-form').serialize());
    })

    /**
     * 导出
     */
    $('.export').click(function(event) {
        location.href = $(this).data('link');
    });

    var newsListId = 0; //默认公告列表id

    /**
     * 页面初始化
     */
    var init = function() {
        var params = {
                FunType: "IF012",
                F001: "wq123",
                F002: newsListId,
                F003: "300002",
                F004: "激励",
                F005: "行权",
                F006: "20170101",
                F007: "20170701"
            };
        createNewsTree();
        refreshNewsList(params);
    }

    
    init();
});