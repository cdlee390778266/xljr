/* 
* @Author: Lee
* @Date:   2017-08-28 15:47:18
* @Last Modified by:   Lee
* @Last Modified time: 2017-08-30 18:30:52
*/

$(document).ready(function(){
    
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
     * 创建主页html
     */
    var createHome = function() {
        $('#right-body').append($('#home').html());
    }

    /**
     * 创建数据库简介html
     */
    var createDataBase = function() {
        $('#right-body').append($('#database').html());
    }

    /**
     * 创建数据表html
     */
    var createData = function() {
        $('#right-body').append($('#data').html());
        key = $("#key");
    }

    /**
     * [init 页面初始化]
     */
    var init = function () {
        createHome();
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
        $('.right-body > div').hide();
        $('.right-history li:first-child').addClass('active');
        $('#' + $('.right-history li:first-child').attr('data-link')).show();
        event.stopPropagation();
        event.preventDefault();
    });

    /**
     * [左侧第二级菜单点击触发]
     */
    $('#leftMenu').delegate('dt', 'click', function(event) {
        $('#leftMenu li > div').hide();
        $('.right-body > div').hide();
        if(!$('#database-box').length) {
            createDataBase();
        }else {
            $('#database-box').show();
        }
        if($('.right-history li').length < 2) {
            $('.right-history ul').append('<li><a href="javascript: void(0);"><i></i><img src="../../images/history-close.png"  alt="" /></a></li>');
        }
        $('.right-history li').removeClass('active');
        $('.right-history li:last-child').attr('data-link','database-box').addClass('active').find('i').text($(this).find('span').text());
    });

    /**
     * 左侧第三级菜单点击触发
     */
    $('#leftMenu').delegate('dd a', 'click', function(event) {
        $('.left li > div').hide();
        $('.right-body > div').hide();
        if(!$('#data-box').length) {
            createData();
        }else {
            $('#data-box').show();
        }
        if($('.right-history li').length < 2) {
            $('.right-history ul').append('<li><a href="javascript: void(0);"><i></i><img src="../../images/history-close.png"  alt="" /></a></li>');
        }
        $('#dataId').val($(this).data('id'));
        $('.right-history li').removeClass('active');
        $('.right-history li:last-child').attr('data-link','data-box').addClass('active').find('i').text($(this).text());
        dataInit();
        event.stopPropagation();
        event.preventDefault();
    }); 

    /**
     * 点击标签显示相应的div
     */
    $('.right-history').delegate('li', 'click', function() {
        $('.right-history li').removeClass('active');
        $('.right-body > div').hide();
        $('#' + $(this).attr('data-link')).show();
        $(this).addClass('active');
    })


    var flag = true;
    var id = 99;


    $('#change').click(function() {
        var url = flag ? '../../data/data.json' : '../../data/data1.json';
        flag = !flag;
        myDataTables.ajax.url(url).load();
    });


    /**
     * 字段选择单选
     */
    $('body').delegate('.slide-fields-body span i', 'click', function(event) {
        if($(this).hasClass('fa-square-o')) {
            $(this).removeClass('fa-square-o').addClass('fa-check-square-o');
        }else {
            $(this).removeClass('fa-check-square-o').addClass('fa-square-o');
        }
    });

    /**
     * 字段选择全选
     */
    $('body').delegate('.slide-fields-foot span i', 'click', function() {
        if($(this).hasClass('fa-square-o')) {
            $('.slide-fields-body span i').removeClass('fa-square-o').addClass('fa-check-square-o');
            $(this).removeClass('fa-square-o').addClass('fa-check-square-o');
        }else {
            $('.slide-fields-body span i').removeClass('fa-check-square-o').addClass('fa-square-o');
            $(this).removeClass('fa-check-square-o').addClass('fa-square-o');
        }
        
    })

    /**
     * 字段说明弹窗打开
     */
    $('body').delegate('.slide-fields-foot a', 'click', function() {
        $('.filed-dialog').css('display', 'block').removeClass('fadeOut').addClass('fadeIn');
    })

    /**
     * 字段说明弹窗关闭
     */
    $('body').delegate('.filed-dialog-top i', 'click', function() {
        $('.filed-dialog').removeClass('fadeIn').addClass('fadeOut').css('display', 'none');
    });

 
    /**
     * 条件选择下拉
     */
    $('body').delegate('.screen-select-btns button', 'click', function() {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.screen-select-slide .slide-box').eq($(this).index()).stop().hide();
        }else {
            $('.screen-select-btns button').removeClass('active');
            $(this).addClass('active');
            $('.screen-select-slide .slide-box').hide();
            $('.screen-select-slide .slide-box').eq($(this).index()).stop().show();
        }

        if($(this).index() == 1 && !$('#tree li').length) {
            $.ajax({
                url: '../../data/codeTree.json',
                type: 'POST',
                data: {
                    FunType: "IF007",
                    F001: "wq123",
                    F002: $('#dataId').val()
                }
            })
            .done(function(res) {
                $.fn.zTree.init($("#tree"), setting, zNodes);
                key.bind("focus", focusKey)
                .bind("blur", blurKey)
                .bind("propertychange", searchNode)
                .bind("input", searchNode);
            })
            .fail(function() {
                console.log("error");
            }) 
        }
    })

    /**
     * 禁用or解禁操作按钮
     * @$wrapper 选框父元素
     */
    var canHandle = function($wrapper, handletype) {

        var flag = false;
        $wrapper.find('li').each(function(index, val) {
             if($(this).find('i').hasClass('active')) {
                flag = true;
             }
        });
        if(flag) {
            if(handletype == 'add') {
                $('#add-angle').addClass('active');
            }else if(handletype == 'remove'){
                $('#remove-angle').addClass('active');
            }
        }else {
            if(handletype == 'add') {
                $('#add-angle').removeClass('active');
            }else if(handletype == 'remove'){
                $('#remove-angle').removeClass('active');
            }
        }
    }

    /**
     * 代码选择框
     */
    $('body').delegate('.code-list li i', 'click', function(event) {
        var handletype = $(this).parents('.slide-code-item').attr('handletype');
        if($(this).hasClass('active')) {
            $(this).removeClass('fa-check-square active').addClass('fa-square-o');
            $(this).parents('.code-list').find('.code-all i').removeClass('fa-check-square active').addClass('fa-square-o');
            canHandle($(this).parent().parent(), handletype);
        }else {
            $(this).removeClass('fa-square-o').addClass('fa-check-square active');
            if(handletype == 'add') {
                $('#add-angle').addClass('active');
            }else if(handletype == 'remove'){
                $('#remove-angle').addClass('active');
            }
        }
        
    });

    /**
     * 代码全选
     */
    $('body').delegate('.code-all', 'click', function() {
        var handletype = $(this).parents('.slide-code-item').attr('handletype');
        if($(this).find('i').hasClass('active')) {
            $(this).find('i').removeClass('fa-check-square active').addClass('fa-square-o');
            $(this).parent().find('li i').removeClass('fa-check-square active').addClass('fa-square-o');
            $(this).find('i').addClass('fa-square-o').removeClass('fa-check-square active');

            if(handletype == 'add') {
                $('#add-angle').removeClass('active');
            }else if(handletype == 'remove'){
                $('#remove-angle').removeClass('active');
            }

        }else {
            $(this).find('i').removeClass('fa-square-o').addClass('fa-check-square active');
            $(this).parent().find('li i').removeClass('fa-square-o').addClass('fa-check-square active');
            $(this).find('i').removeClass('fa-square-o').addClass('fa-check-square active');

            if(handletype == 'add') {
                $('#add-angle').addClass('active');
            }else if(handletype == 'remove'){
                $('#remove-angle').addClass('active');
            }
        }
    })
    
    /**
     * 添加或移除代码
     * @param {[string]} handle 操作 移除(add)或添加('remove')
     * @param {[string]} type 操作类型 移除(添加)全部或选中代码  
     */
    var addCode = function(handle, type) {
        var html = '';
        if(handle == 'add') {
            if(type == 'angle') {
                $('#add li i').each(function(index, val) {
                     if($(this).hasClass('active')) {
                        $(this).removeClass('fa-check-square active').addClass('fa-square-o');
                        html += $(this).parent().prop("outerHTML");
                        $(this).parent().remove();
                     }
                });
                $('#remove ul').append(html);
            }
            if(type == 'all') {
                $('#add li i').removeClass('fa-check-square active').addClass('fa-square-o');
                html = $('#add ul').html();
                $('#add ul').empty();
                $('#remove ul').append(html);
            }

            $('#add-angle').removeClass('active');
            $('#add .code-all').find('i').removeClass('fa-check-square active').addClass('fa-square-o');
            $('#remove-all').addClass('active');
            if(!$('#add ul li').length) {
                $('#add-all').removeClass('active');
            }
            return;
        }
        
        if(handle == 'remove') {
            if(type == 'angle') {
                $('#remove li i').each(function(index, val) {
                     if($(this).hasClass('active')) {
                        $(this).removeClass('fa-check-square active').addClass('fa-square-o');
                        html += $(this).parent().prop("outerHTML");
                        $(this).parent().remove();
                     }
                });
                $('#add ul').append(html);
            }
            if(type == 'all') {
                $('#remove li i').removeClass('fa-check-square active').addClass('fa-square-o');
                html = $('#remove ul').html();
                $('#remove ul').empty();
                $('#add ul').append(html);
            }

            $('#remove-angle').removeClass('active');
            $('#remove .code-all').find('i').removeClass('fa-check-square active').addClass('fa-square-o');
            $('#add-all').addClass('active');
            if(!$('#remove ul li').length) {
                $('#remove-all').removeClass('active');
            }
            return;
        }

    }

    /**
     * 添加选中的代码
     */
    $('body').delegate('#add-angle', 'click', function() {
        if($(this).hasClass('active')) {
            addCode('add', 'angle');
        }
    });

    /**
     * 添加全部代码
     */
    $('body').delegate('#add-all', 'click', function() {
        if($(this).hasClass('active')) {
            addCode('add', 'all');
        }
    }); 
    
    /**
    * 移除选中的代码
    */
    $('body').delegate('#remove-angle', 'click', function() {
        if($(this).hasClass('active')) {
            addCode('remove', 'angle');
        }
    });

    /**
     * 移除全部代码
     */
    $('body').delegate('#remove-all', 'click', function() {
        if($(this).hasClass('active')) {
            addCode('remove', 'all');
        }
    });


    //行业分类
    var setting = {
        check: {
            enable: true
        },
        view: {
            showIcon: false,
            showLine: false
        },
        data: {
            key: {
                title: "t"
            },
            simpleData: {
                enable: true
            }    
        }
    };
  
    var zNodes =[
        { id:1, pId:0, name:"节点属性搜索演示 1", t:"id=1"},
        { id:11, pId:1, name:"关键字可以是名字", t:"id=11"},
        { id:12, pId:1, name:"关键字可以是level", t:"id=12"},
        { id:13, pId:1, name:"关键字可以是id", t:"id=13"},
        { id:14, pId:1, name:"关键字可以是各种属性", t:"id=14"},
        { id:2, pId:0, name:"节点搜索演示 2", t:"id=2"},
        { id:21, pId:2, name:"可以只搜索一个节点", t:"id=21"},
        { id:22, pId:2, name:"可以搜索节点集合", t:"id=22"},
        { id:23, pId:2, name:"搜我吧", t:"id=23"},
        { id:3, pId:0, name:"节点搜索演示 3", t:"id=3"},
        { id:31, pId:3, name:"我的 id 是: 31", t:"id=31"},
        { id:32, pId:31, name:"我的 id 是: 32", t:"id=32"},
        { id:33, pId:32, name:"我的 id 是: 33", t:"id=33"}
    ];
  
    function focusKey(e) {
        if (key.hasClass("empty")) {
            key.removeClass("empty");
        }
    }
    function blurKey(e) {
        if (key.get(0).value === "") {
            key.addClass("empty");
        }
    }

    var lastValue = "", nodeList = [], fontCss = {};
  
    function searchNode(e) {
        var zTree = $.fn.zTree.getZTreeObj("tree");
        keyType = "name";

        if (!$("#getNodesByFilter").attr("checked")) {
            var value = $.trim(key.get(0).value);
            var keyType = "";
            if (key.hasClass("empty")) {
                value = "";
            }
            if (lastValue === value) return;
            lastValue = value;
            if (value === "") {
                zTree.showNodes(zTree.transformToArray(zTree.getNodes())) ;
                return;
            }
        } else {
            updateNodes(false);
            nodeList = zTree.getNodesByFilter(filter);
        }

        keyType = "name";
        nodeList = zTree.getNodesByParamFuzzy(keyType, value);
        nodeList = zTree.transformToArray(nodeList);
        updateNodes(true);
    }

    function updateNodes(highlight) {
        var zTree = $.fn.zTree.getZTreeObj("tree");
        var allNode = zTree.transformToArray(zTree.getNodes());
        zTree.hideNodes(allNode);
        for(var n in nodeList){
            findParent(zTree,nodeList[n]);
        }
        zTree.showNodes(nodeList);
    }

    function findParent(zTree,node){
        zTree.expandNode(node,true,false,false);
        var pNode = node.getParentNode();
        if(pNode != null){
            nodeList.push(pNode);
            findParent(zTree,pNode);
        }
    }

    function filter(node) {
        return !node.isParent && node.isFirstNode;
    }

    /**
     * 初始化函数
     */
    var dataInit  = function() {
        $('#page-loading').show();
        $.ajax({
            url: '../../data/fileds.json',
            type: 'POST',
            data: {
                FunType: "IF005",
                F001: "wq123",
                F002: "001001002"
            }
        })
        .done(function(res) {
            if(parseInt(res.resultdata)) {
                var html = '';
                for(var i = 0; i < res.ResData.length; i++) {
                    html += '<span data-id="' + res.ResData[i].F001 + '"><i class="fa fa-square-o"></i>' + res.ResData[i].F002 + '</span>';
                }
                 $('#page-loading').hide();
                $('.slide-fields-body').html(html);
            }else {

            }
        })
        .fail(function() {
            console.log("error");
        })
        
        $('.screen-select-btns button').removeClass('active').eq(0).addClass('active');
        $('.screen-select-slide .slide-box').hide().eq(0).show();

        var myDataTables = $('#table').DataTable({
            autoFill: true,
            dom: '<"top"i>rtp',
            // dom: '<"top"i>Brtp',
            buttons: ['colvis'],
            bDestroy : true, 
            retrieve: true,//保证只有一个table实例
            ajax: {
                url: '../../data/data.json',
                dataSrc: ''
            },
            columns: [
                { data: 'name' },
                { data: 'position' },
                { data: 'salary' },
                { data: 'office' }
            ],
            fnInitComplete: function (oSettings, json) {
                
            },
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，数据总记录数为 _TOTAL_ 条",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                },
                "buttons": {
                    "colvis": '显示列'
                }
            }
        });
    }

    init();
});