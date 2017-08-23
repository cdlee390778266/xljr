$(document).ready( function () {

    var flag = true;

    var myDataTables = $('#table').DataTable({
        autoFill: true,
        dom: '<"top"i>rtp',
        // dom: '<"top"i>Brtp',
        buttons: ['colvis'],
        bDestroy : true, 
        retrieve: true,//保证只有一个table实例
        ajax: {
            url: '../data/data.json',
            dataSrc: ''
        },
        columns: [
            { data: 'name' },
            { data: 'position' },
            { data: 'salary' },
            { data: 'office' }
        ],
        fnInitComplete: function (oSettings, json) {
            $(parent.document).find('iframe, .right').height($(document).height() + 80);
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
        var url = flag ? '../data/data.json' : '../data/data1.json';
        flag = !flag;
        myDataTables.ajax.url(url).load();
    });

    /**
     * 单选
     */
    $('.slide-fields-body').delegate('span i', 'click', function(event) {
        if($(this).hasClass('fa-square-o')) {
            $(this).removeClass('fa-square-o').addClass('fa-check-square-o');
        }else {
            $(this).removeClass('fa-check-square-o').addClass('fa-square-o');
        }
    });

    /**
     * 全选
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
                $('.add-btn').addClass('active');
            }else if(handletype == 'remove'){
                $('.remove-btn').addClass('active');
            }
        }else {
            if(handletype == 'add') {
                $('.add-btn').removeClass('active');
            }else if(handletype == 'remove'){
                $('.remove-btn').removeClass('active');
            }
        }
    }

    /**
     * 代码选择框
     */
    $('.code-list').delegate('li', 'click', function(event) {
        var handletype = $(this).parents('.slide-code-item').attr('handletype');
        if($(this).find('i').hasClass('active')) {
            $(this).find('i').removeClass('fa-check-square active').addClass('fa-square-o');
            $(this).parents('.code-list').find('.code-all i').removeClass('fa-check-square active').addClass('fa-square-o');
            canHandle($(this).parent(), handletype);
        }else {
            $(this).find('i').removeClass('fa-square-o').addClass('fa-check-square active');
            if(handletype == 'add') {
                $('.add-btn').addClass('active');
            }else if(handletype == 'remove'){
                $('.remove-btn').addClass('active');
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
                $('.add-btn').removeClass('active');
            }else if(handletype == 'remove'){
                $('.remove-btn').removeClass('active');
            }

        }else {
            $(this).find('i').removeClass('fa-square-o').addClass('fa-check-square active');
            $(this).parent().find('li i').removeClass('fa-square-o').addClass('fa-check-square active');
            $(this).find('i').removeClass('fa-square-o').addClass('fa-check-square active');

            if(handletype == 'add') {
                $('.add-btn').addClass('active');
            }else if(handletype == 'remove'){
                $('.remove-btn').addClass('active');
            }
        }
    })

} );
