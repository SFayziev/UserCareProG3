/**
 * Created by Lenovo on 26.04.2016.
 */
var iContainer=$('.content-wrapper');
iContainer.on("click","[data-action=showarticle]",showArticle);

function showArticle(){
    var articleid=$(this).data('article-id');
    refreshArticle(articleid,'#article-0');
    refreshComments(articleid, '#comment-0')
}


function refreshComments(articid,objid ){
    data={'id':articid };
    $.ajax({  dataType: "json", data:data, url:  "/comment/list/"})
        .done(function( data ) {
            if (data.status=='success') {
                $(objid).replaceWith(data.value);
            }
        });
    return false
}
