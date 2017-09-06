/* 
* @Author: Lee
* @Date:   2017-08-28 15:47:18
* @Last Modified by:   Lee
* @Last Modified time: 2017-09-06 12:16:22
*/

$(document).ready(function(){
    
    /**
     * [getLeftSuccess 获取左侧菜单数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getLeftSuccess = function(res) {
        
    }

    /**
     * [getLeft 获取左侧菜单]
     */
    var getLeft = function() {
        var url = '../../data/left.json';
        var funType = 'POST';
        var params = {
                FunType: "IF004",
                F001: "wq123"
            }

        getData(url, funType, params, getLeftSuccess, errorReturn);   
    }

    
    var key = $('#tree');    

    /**
     * [init 页面初始化]
     */
    var init = function () {

        $('#table-head').html('<tr class="table-init"><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>');
        $('#table-body').html('<tr><td colspan="12" class="empty"><img src="../../images/empty.png" alt="" /> <br /> 没有相应数据！</td></tr>');

        $('.screen-select-btns button').removeClass('active').eq(0).addClass('active');
        $('.screen-select-slide .slide-box').hide().eq(0).show();


        $('#slide-item-loading').show();

            var url = '../../data/codeTree.json';
            var funType = 'POST';
            var params = {
                    FunType: "IF007",
                    F001: "wq123",
                    F002: $('#dataId').val()
                }

            getData(url, funType, params, getCodeSuccess, getCodeError);

        getLeft();
    }


    /**
     * [getCodeSuccess 获取条件选择下拉数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getCodeSuccess = function(res) {
        if(parseInt(res.resultdata)) {
            zNodes = res.ResData;
            zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
            key.bind("focus", focusKey)
            .bind("blur", blurKey)
            .bind("propertychange", searchNode)
            .bind("input", searchNode);
        }
        $('#slide-item-loading').hide();
    }

    /**
     * [getCodeError 获取条件选择下拉数据失败]
     */
    var getCodeError = function() {
        $('#slide-item-loading').hide();
        XAlert('获取数据失败，请检查网络！');
    }

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
        if(!$(this).prev().find('li').length) return;
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
         $('.code-all i').removeClass('fa-check-square active').addClass('fa-square-o');
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
     * [getSelectTreeSuccess 获取选中行业数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getSelectTreeSuccess = function(res) {
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
    }

    /**
     * [getSelectTreeError 获取选中行业数据失败]
     */
    var getSelectTreeError = function() {
        $('#slide-loading').hide();
        $('#add ul').html('');
        setSelectAllNum();
        XAlert('获取数据失败，请检查网络！');
    }

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

        var url = '../../data/code.json';
        var funType = 'POST';
        var params = {
                FunType: "IF017",
                F001: "wq123",
                F002: selectArr
            }

        getData(url, funType, params, getSelectTreeSuccess, getSelectTreeError);

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

    var myDataTables;


    /**
     * 导出
     */
    $('body').delegate('#export', 'click', function(event) {
        var $exportDialog = $(this).next();
        if($exportDialog.hasClass('active')) {
            $exportDialog.removeClass('active').hide();
        }else {
            $exportDialog.addClass('active').show();
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $(document).click(function(event) {
        $('.slide-code-handle ul').removeClass('active').hide();
    });

    /**
     * 隐藏导出弹框
     */
    $('body').delegate('.slide-code-handle ul a', 'click', function(event) {
        $('.slide-code-handle ul').hide();
    });
   

    /**
     * 刷新表格数据
     */
    var refreshDataTable = function(data) {
        
        var columnsArr = [];
        for(var i = 0; i < data.ColModels.length; i++) {
            var obj = {};
            obj.data = data.ColModels[i].Name;
            columnsArr.push(obj);
        }

        var html = '';
        for(var i = 0; i < data.ColNames.length; i++) {     //更新表格头部
            html += '<th>' + data.ColNames[i] + '</th>';
        }

        $('#table-head tr').removeClass('table-init').html(html);
        
        if(typeof(myDataTables) != "undefined") {
            myDataTables.clear();//清空数据.fnClearTable();//清空数据  
            myDataTables.destroy(); //还原初始化了的datatable
        }
        myDataTables = $('#table').DataTable({
            autoFill: true,
            dom: '<"top"i>rtpB',
            buttons: ['colvis'],
            bDestroy : true, 
            retrieve: true,//保证只有一个table实例
            data: data.Data,
            columns: columnsArr,
            paging: false,
            destroy: true,
            buttons: [ {
                extend: 'excelHtml5',
                customize: function( xlsx ) {

                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('row c[r^="C"]', sheet).attr( 's', '2' );
                }
            }],
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "数据总记录数为 <span>_TOTAL_</span> 条，预览数据为： <span>_TOTAL_</span> 条",
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
     * [getPreviewSuccess 获取预览数据成功回调
     * @param  {[type]} res 返回的数据
     */
    var getPreviewSuccess = function(res) {
        if(parseInt(res.resultdata)) {
            refreshDataTable(res.ResData[0]);
        }
        $('#page-loading').hide();
    }

    /**
     * [getPreviewError 获取预览数据失败回调
     * @param  {[type]} res 返回的数据
     */
    var getPreviewError = function(res) {
        $('#page-loading').hide();
        XAlert('获取数据失败，请检查网络！');
    }

    /**
     * 预览数据
     */
    $('body').delegate('#preview', 'click', function(event) {

        var checkedCodeArr = [];
        $('.remove code-list ul li').each(function(index, val) {
             checkedCodeArr.push($(this).find('span').data('id'));
        });
        
        $('#page-loading').show();

        var url = '../../data/preview.json';
        var funType = 'POST';
        var params = {
                FunType: 'IF008',
                F001: 'wq123',
                F002: $('#dataId').val(),
                F004: checkedCodeArr
            }

        //获取预览数据
        getData(url, funType, params, getPreviewSuccess, getPreviewError);

    });    
    

    /**
     * 下载数据
     */
     $('body').delegate('#download', 'click', function(event) {
        if($('#table .empty').length) {
            XAlert('没有数据！');
        }else {
            $('.buttons-html5').click();
        }
        
    });

    init();
});