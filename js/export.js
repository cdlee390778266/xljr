/* 
* @Author: Lee
* @Date:   2017-08-28 15:47:18
* @Last Modified by:   Lee
* @Last Modified time: 2017-09-04 16:15:51
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
            // var html = '';
            // if(parseInt(res.resultdata)) {
            //     for(var i = 0; i < res.ResData.length; i++) {
            //         html += '<li><span>' + res.ResData[i].name + '<i class="fa fa-angle-right"></i></span><div>'
            //         for(var j = 0; j < res.ResData[i].children.length; j++) {
            //             html += '<dl>'
            //                  +      '<dt><span>' + res.ResData[i].children[j].name + '</span> <i class="fa fa-angle-right"></i></dt>'
            //                  +      '<dd>'
            //             for(var k = 0; k < res.ResData[i].children[j].children.length; k++) {
            //                 html += '<a class="javascript:void(0);" data-id="' + res.ResData[i].children[j].children[k].id + '">' + res.ResData[i].children[j].children[k].name + '</a>'
            //                 if(k < res.ResData[i].children[j].children.length -1) {
            //                     html += '<i>|</i>';
            //                 }
            //             }
            //             html += '</dd></dl>';
            //         }
            //         html += '</div></li>'
            //     }
            //     $('#leftMenu').html(html);
            // }
        })
        .fail(function() {
            XAlert('获取数据失败，请检查网络！');
        })  
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
     * [setSelectAllNum 设置可选代码总共项数]
     */
    var setSelectAllNum = function() {
        $('#add .code-all strong, #add .code-result span').text($('#add ul li').length);
        $('#remove .code-all strong, #remove .code-result span').text($('#remove ul li').length);
    }
    
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
                        html += $(this).parent().parent().prop("outerHTML");
                        $(this).parent().parent().remove();
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
            setSelectAllNum();
            return;
        }
        
        if(handle == 'remove') {
            if(type == 'angle') {
                $('#remove li i').each(function(index, val) {
                     if($(this).hasClass('active')) {
                        $(this).removeClass('fa-check-square active').addClass('fa-square-o');
                        html += $(this).parent().parent().prop("outerHTML");
                        $(this).parent().parent().remove();
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
            setSelectAllNum();
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

    /**
     * 行业分类树选择回调
     */
    var onCheck = function() {
        var selectArr = [];
        var treeObj=$.fn.zTree.getZTreeObj("tree"),
        nodes=treeObj.getCheckedNodes(true),
        v="";
        for(var i=0;i<nodes.length;i++){
        v+=nodes[i].name + ",";
            selectArr.push(nodes[i].id); //获取选中节点的值
        }

        //获取可选代码
        $('#slide-loading').show();
        $('#remove ul, #add ul').html('');
        $('.slide-code-handle button').removeClass('active');
        $.ajax({
            url: '../../data/code.json',
            type: 'POST',
            data: {
                FunType: "IF017",
                F001: "wq123",
                F002: selectArr
            }
        })
        .done(function(res) {
            var html = '';
            if(parseInt(res.resultdata)) {
                for(var i = 0; i < res.ResData.length; i++) {
                    html += '<li><span data-id="ClosePrice"><i class="fa fa-square-o" data-id="' + res.ResData[i].F001 + '"></i>' + res.ResData[i].F002 + '</span></li>';
                }
            }
            $('#add ul').html(html);
            $('#add-all').addClass('active');
            $('#slide-loading').hide();
            setSelectAllNum();
        })
        .fail(function() {
            $('#slide-loading').hide();
            $('#add ul').html('');
            setSelectAllNum();
            XAlert('获取数据失败，请检查网络！');
        })
       
    }

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
        },
         callback:{
            onCheck: onCheck
        }
    };
  
    var zNodes =[];
  
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
    var key = $('#tree');
    var init  = function() {
        getLeft();
        $('#page-loading').show();
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
            if(parseInt(res.resultdata)) {
                zNodes = res.ResData;
                zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
                key.bind("focus", focusKey)
                .bind("blur", blurKey)
                .bind("propertychange", searchNode)
                .bind("input", searchNode);
            }
            $('#page-loading').hide();

        })
        .fail(function() {
            $('#page-loading').hide();
            XAlert('获取数据失败，请检查网络！');
        }) 
       

        
        $('.screen-select-btns button').removeClass('active').eq(0).addClass('active');
        $('.screen-select-slide .slide-box').hide().eq(0).show();

        myDataTables = $('#table').DataTable({
            autoFill: true,
            dom: 'rtp',
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
                { data: 'office' },
                { data: 'office' }
            ],
            paging: false,
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

    init();
});