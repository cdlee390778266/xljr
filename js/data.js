/* 
* @Author: Lee
* @Date:   2017-08-28 15:47:18
* @Last Modified by:   Lee
* @Last Modified time: 2017-09-06 11:28:54
*/

$(document).ready(function(){
    
    /**
     * [getLeftSuccess 获取左侧菜单数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getLeftSuccess = function(res) {
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
        $('.right-history li').removeClass('active');
        $('.right-history li:last-child').attr('data-link','data-box').addClass('active').find('i').text($(this).text());

        $('#dataId').val($(this).data('id'));
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
     * [getFieldsSuccess 获取字段说明数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getFieldsSuccess = function(res) {
        var html = '';
        if(parseInt(res.resultdata)) {
            for(var i = 0; i < res.ResData.length; i++) {
                html += '<tr>'
                     +      '<td>' + res.ResData[i].Sqn + '</td>'
                     +      '<td>' + res.ResData[i].Name + '</td>'
                     +      '<td>' + res.ResData[i].Ftype + '</td>'
                     +      '<td>' + res.ResData[i].Description + '</td>'
                     +      '<td>' + res.ResData[i].Unit + '</td>'
                     +  '</tr>'
            }
        }

        $('#filed-dialog-loading').hide();
        $('.filed-dialog-body tbody').html(html);
    }

    /**
     * 字段说明弹窗打开
     */
    $('body').delegate('.slide-fields-foot a', 'click', function() {
        $('.filed-dialog').css('display', 'block').removeClass('fadeOut').addClass('fadeIn');
        if($(this).attr('data-id') != $('#dataId').val()) {
            $(this).attr('data-id', $('#dataId').val());
            $('#filed-dialog-loading').show();

            var url = '../../data/filedsDes.json';
            var funType = 'POST';
            var params = {
                    FunType: "IF016",
                    F001: "wq123",
                    F002: $('#dataId').val()
                }

            getData(url, funType, params, getFieldsSuccess, errorReturn);
        } 
    })

    /**
     * 字段说明弹窗关闭
     */
    $('body').delegate('.filed-dialog-top i', 'click', function() {
        $('.filed-dialog').removeClass('fadeIn').addClass('fadeOut').css('display', 'none');
    });

    var dataId; //保存页面id

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
     * [getScreenSuccess 获取代码选择下拉数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getScreenSuccess = function(res) {
        var html = '<option value=""></option>'
        if(parseInt(res.resultdata)) {
            for(var i = 0; i < res.ResData.length; i++) {
                html += '<option value="' + res.ResData[i].F001 + '">' + res.ResData[i].F002 + '</option>'
            }
        }
        $('#slide-loading').hide();
        $('#screen-fields').html(html);
    }

    /**
     * [getScreenError 获取代码选择下拉数据失败]
     */
    var getScreenError = function() {
        $('#slide-loading').hide();
        XAlert('获取数据失败，请检查网络！');
    }

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
        
          
        //第一次点击代码选择获取代码树
        if($(this).index() == 1 && $('.screen-select-btns button:nth-child(2)').data('id') != $('#dataId').val()) {
            $('.screen-select-btns button:nth-child(2)').attr('data-id',$('#dataId').val());
            $('#slide-item-loading').show();

            var url = '../../data/codeTree.json';
            var funType = 'POST';
            var params = {
                    FunType: "IF007",
                    F001: "wq123",
                    F002: $('#dataId').val()
                }

            getData(url, funType, params, getCodeSuccess, getCodeError);
        }

        //第一次点击条件筛选获取字段
        if($(this).index() == 2 && $('.screen-select-btns button:nth-child(3)').data('id') != $('#dataId').val()) {
            $('.screen-select-btns button:nth-child(3)').attr('data-id',$('#dataId').val());
            $('#screen-input').attr('disabled', 'disabled').val('');
            $('#slide-loading').show();

            var url = '../../data/screen.json';
            var funType = 'POST';
            var params = {
                    FunType: "IF008",
                    F001: "wq123",
                    F002: $('#dataId').val()
                }

            getData(url, funType, params, getScreenSuccess, getScreenError);
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
     * [getFieldSuccess 获取字段选择下拉数据成功]
     * @param  {[type]} res 返回的数据
     */
    var getFieldSuccess = function(res) {
        var html = '';
        if(parseInt(res.resultdata)) {
            for(var i = 0; i < res.ResData.length; i++) {
                html += '<span data-id="' + res.ResData[i].F001 + '"><i class="fa fa-square-o"></i>' + res.ResData[i].F002 + '</span>';
            }
             $('#page-loading').hide();
            $('.slide-fields-body').html(html);
        }
        $('.screen-select-btns button:nth-child(1)').attr('data-id', $('#dataId').val());
    }

    /**
     * [getFieldError 获取字段选择下拉数据失败]
     * @param  {[type]} res 返回的数据
     */
    var getFieldError = function(res) {
        $('#page-loading').hide();
        XAlert('获取数据失败，请检查网络！');
    }

    /**
     * 初始化函数
     */
    var dataInit  = function() {
        $('#page-loading').show();
        addArr = [];
        $('#table-head').html('<tr class="table-init"><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>');
        $('#table-body').html('<tr><td colspan="12" class="empty"><img src="../../images/empty.png" alt="" /> <br /> 没有相应数据！</td></tr>');

        var url = '../../data/fileds.json';
        var funType = 'POST';
        var params = {
                FunType: "IF005",
                F001: "wq123",
                F002: "001001002"
            }

        //获取字段选择下拉数据
        getData(url, funType, params, getFieldSuccess, getFieldError);

        $('.screen-select-btns button').removeClass('active').eq(0).addClass('active');
        $('.screen-select-slide .slide-box').hide().eq(0).show();

    }

    /**
     * 条件选择-字段选择不为空时解禁运算符选框
     */
    $('body').delegate('#screen-fields', 'change', function(event) {
        if($(this).val()) {
            $('#screen-input').removeAttr('disabled');
        }else {
            $('#screen-opt').val('');
            $('#screen-input').attr('disabled', 'disabled').val('');
        }
    });

    /**
     * 导出
     */
    $('body').delegate('#export', 'click', function(event) {
        var $exportDialog = $('.slide-code-handle ul');
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
   
    var addArr = [];   //保存条件筛选所添加的数组

    /**
     * 创建筛选条件列表html
     */
    var createAddsHtml = function() {
        var html = '';
        for(var i = 0; i < addArr.length; i++) {
            var relationshipClass = addArr[i].F004 == 'AND' ? 'fa-check-square-o' : 'fa-square-o';
            html += '<tr>'
                 +      '<td>' + (i+1) + '</td>'
                 +      '<td>' + addArr[i].F001 + '</td>'
                 +      '<td>' + addArr[i].F002 + '</td>'
                 +      '<td>' + addArr[i].F003 + '</td>'
                 +      '<td></td>'
                 +      '<td><i class="fa ' + relationshipClass + '" data-index="' + i + '"></i><span>' + addArr[i].F004 + '</span></td>'
                 +      '<td><a href="javascript:void(0);" data-index="' + i + '">删除</a></td>'
                 +  '</tr>'
        }

        $('.cdt-list table tbody').html(html);
    }

     /**
     * 条件选择-点击添加按钮触发
     */
    $('body').delegate('#screen-add', 'click', function(event) {
        if(!$('#screen-fields').val()) {
            XAlert('请选择字段！');
            return;
        }
        if(!$('#screen-opt').val()) {
            XAlert('请选择运算符！');
            return;
        }
        if(!$('#screen-input').val()) {
            XAlert('请输入条件值！');
            return;
        }
        var obj = {
            F001: $('#screen-fields').val(),
            F002: $('#screen-opt').val(),
            F003: $('#screen-input').val(),
            F004: 'AND'
        };  

        var flag = false;  //条件是否重复
        for(var i = 0; i < addArr.length; i++) { 
            if(addArr[i].F001 == obj.F001 && addArr[i].F002 == obj.F002 && addArr[i].F003 == obj.F003) {
                flag = true;
                break;
            }
        }

        if(!flag) {
            addArr.push(obj);
            createAddsHtml();
        }else {
            XAlert('请不要添加相同的条件！');
        }
    });

    /**
     * 选择条件关系
     */
    $('body').delegate('.cdt-list tbody tr .fa', 'click', function(event) {
        if($(this).hasClass('fa-check-square-o')) {
            $(this).removeClass('fa-check-square-o').addClass('fa-square-o');
            $(this).siblings('span').text('OR');
            addArr[$(this).data('index')].F004 = 'OR';
        }else {
            $(this).removeClass('fa-square-o').addClass('fa-check-square-o');
            $(this).siblings('span').text('AND');
            addArr[$(this).data('index')].F004 = 'AND';
        }
       
    });

    /**
     * 删除条件
     */
    $('body').delegate('.cdt-list tbody tr a', 'click', function(event) {
        addArr.splice($(this).data('index'), 1);
        createAddsHtml();
    });

    /**
     * 重置
     */
    $('body').delegate('#reset', 'click', function(event) {
        $('.slide-fields-body span i').removeClass('fa-check-square-o').addClass('fa-square-o');

        var treeObj = $.fn.zTree.getZTreeObj("tree");
        if(treeObj) {
            treeObj.checkAllNodes(false);
        }
        $('.code-list ul').html('');
        $('.code-result span').text(0);
        $('.code-all strong').text(0);
        $('.code-all i').removeClass('fa-check-square-o').addClass('fa-square-o');
        $('.slide-code-handle button').removeClass('active');

        addArr = [];
        createAddsHtml();
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
            buttons: [ {
                extend: 'excelHtml5',
                customize: function( xlsx ) {

                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('row c[r^="C"]', sheet).attr( 's', '2' );
                }
            }],
            bDestroy : true, 
            retrieve: true,//保证只有一个table实例
            data: data.Data,
            columns: columnsArr,
            paging: false,
            destroy: true,
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

        if(!$('.slide-fields-body span i').hasClass('fa-check-square-o')) {
            XAlert('请选择字段！');
            return;
        }

        //选择的字段
        var fieldsArr = [];
        $('.slide-fields-body span').each(function(index, val) {
             if($(this).find('i').hasClass('fa-check-square-o')) {
                fieldsArr.push($(this).data('id'));
             }
        });

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
                F003: fieldsArr,
                F004: checkedCodeArr,
                F005: addArr
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