/* 
* @Author: Lee
* @Date:   2017-08-29 18:19:59
* @Last Modified by:   Lee
* @Last Modified time: 2017-08-30 14:11:34
*/

/**
 * 刷新页面高度
 */
 function refreshHeight() {
    $(parent.document).find('iframe, .right').height($(document).height());
}

/**
 * 后台分页采用
 * @param  {[type]} page    当前页码
 * @param  {[type]} pageNum 每页显示条数
 * @param  {[type]} count   总条数
 * @param  {[type]} $wrapper 包装页码的JQuery元素对象
 * @param {[type]} [fn] 点击页码执行函数
 */
function renderPageHTML(page,pageNum,count,$wrapper,fn){
    //alert(fn)
    //计算总页数
    var totalPage = 0;
    if(count%pageNum==0){
        totalPage = Math.floor(count/pageNum);
    } else {
        totalPage = Math.floor(count/pageNum) + 1;
    }
    var pageInfo='';
    var prev = '';
    var next = '';
    if(page==1){
        pageInfo += '<a class="button_page_disabled first"><span>首页</span></a>';
        prev = '<a class="button_page_disabled"><span><</span></a>';
    }else{
        var prePage = page - 1;
        if(prePage<=0)
            prePage = 1;
        pageInfo += '<a href="javascript:' + fn + '(1);" class="button_page first">首页</a>';
        prev = '<a href="javascript:' + fn + '('+ prePage +');" class="button_page"><</a>';
    }
    var center = 5;
    var pageStart = 1;
    if (page > center) {
        if (totalPage - page < center) {
            pageStart = totalPage - 2 * center + 1;
            if (pageStart < 1) {
                pageStart = 1;
            }
        } else {
            pageStart = page - center;
        }
    } else {
        pageStart = 1;
    }
    // 分页终点
    var pageEnd = pageStart + 2 * center - 1;
    if (pageEnd > totalPage) {
        pageEnd = totalPage;
    }
    // 分页数
    pageInfo += '<span>' + prev;
    for (var i = pageStart; i <= pageEnd; i++) {
        pageInfo += '<a href="javascript:' + fn + '('+i+');"';
        if(i == page){
            pageInfo += 'class="button_page_click"><span>'+i+'</span></a>';
        } else {
            pageInfo += 'class="button_page">'+i+'</a>';
        }
    }
    
    if(page==totalPage || totalPage ==0){
        pageInfo += '<a class="button_page_disabled"><span>></span></a>';
        pageInfo += '</span>';
        pageInfo += '<a class="button_page_disabled last"><span>尾页</span></a>';
    }else{
        var nextPage = page + 1;
        if(nextPage>totalPage)
            nextPage = totalPage;
        pageInfo += '<a href="javascript:' + fn + '('+nextPage+');" class="button_page">></a>';
        pageInfo += '</span>';
        pageInfo += '<a href="javascript:' + fn + '('+totalPage+');" class="button_page last">尾页</a>';
    }
    //pageInfo = '<div class="button_count">共计'+count+'条</div>' + pageInfo;
    $wrapper.html(pageInfo);
}