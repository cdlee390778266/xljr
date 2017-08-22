
$(document).ready( function () {

            var flag = true;

            var myDataTables = $('#table_id_example').DataTable({
                autoFill: true,
                dom: 'Brtip',
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
                language: {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "数据中记录数为 _TOTAL_ 条",
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
            })


        } );

         $('#table_id_example')
            .removeClass( 'display' )
            .addClass('table table-striped table-bordered');