$(document).ready( function () {
   
    var flag = true;
    var id = location.href.split('?')[1].split('=')[1];

    var refreshHeight = function() {
        $(parent.document).find('iframe').height($(document).height() + 80);
    }

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
            refreshHeight();
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
    
    $('#change').click(function() {
        var url = flag ? '../../data/data.json' : '../../data/data1.json';
        flag = !flag;
        myDataTables.ajax.url(url).load();
    });


    /**
     * 字段选择单选
     */
    $('.slide-fields-body').delegate('span i', 'click', function(event) {
        if($(this).hasClass('fa-square-o')) {
            $(this).removeClass('fa-square-o').addClass('fa-check-square-o');
        }else {
            $(this).removeClass('fa-check-square-o').addClass('fa-square-o');
        }
    });

    /**
     * 字段选择全选
     */
    $('.slide-fields-foot span i').click(function() {
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
    $('.slide-fields-foot a').click(function() {
        $('.filed-dialog').css('display', 'block').removeClass('fadeOut').addClass('fadeIn');
    })

    /**
     * 字段说明弹窗关闭
     */
    $('.filed-dialog-top i').click(function() {
        $('.filed-dialog').removeClass('fadeIn').addClass('fadeOut').css('display', 'none');
    });

 
    /**
     * 条件选择下拉
     */
    $('.screen-select-btns button').click(function() {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.screen-select-slide .slide-box').eq($(this).index()).stop().hide();
        }else {
            $('.screen-select-btns button').removeClass('active');
            $(this).addClass('active');
            $('.screen-select-slide .slide-box').hide();
            $('.screen-select-slide .slide-box').eq($(this).index()).stop().show();
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
    $('.code-list').delegate('li i', 'click', function(event) {
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
    $('.code-all').click(function() {
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
    $('#add-angle').click(function() {
        if($(this).hasClass('active')) {
            addCode('add', 'angle');
        }
    });

    /**
     * 添加全部代码
     */
    $('#add-all').click(function() {
        if($(this).hasClass('active')) {
            addCode('add', 'all');
        }
    }); 
    
    /**
    * 移除选中的代码
    */
    $('#remove-angle').click(function() {
        if($(this).hasClass('active')) {
            addCode('remove', 'angle');
        }
    });

    /**
     * 移除全部代码
     */
    $('#remove-all').click(function() {
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

    var key;
    key = $("#key");

    /**
     * 初始化函数
     */
    var init  = function() {
        $.fn.zTree.init($("#tree"), setting, zNodes);
        key.bind("focus", focusKey)
        .bind("blur", blurKey)
        .bind("propertychange", searchNode)
        .bind("input", searchNode);
    }

    init();

} );
