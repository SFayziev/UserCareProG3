/**
 * Created by Lenovo on 26.04.2016.
 */
var iContainer=$('.content-wrapper');
iContainer.on("click","[data-action=showarticle]",showArticle);
iContainer.on("click","[data-action=toggleNeedreview]",toggleNeedreview);

function toggleNeedreview(){
    var articleid=$(this).data('content')
    getandChangeJson ("#ineedreview", {'id':articleid }, "/agent/articles/toggleNeedreview"  );

}
function showArticle(){
    var articleid=$(this).data('article-id');
    getandChangeJson ("#artilceDeatails", {'id':articleid }, "/agent/articles/articleDetail"  );
}


function  onChangeFilter(moduleid){
    __uc_settings['module_'+ moduleid ]['filterid']=$("#filterid").val();
    getArticleList(moduleid);
}

function  onChangeOrderid(moduleid){
    __uc_settings['module_'+ moduleid ]['orderid']=$("#orderid").val();
    getArticleList(moduleid);
}



function getandChangeJson(objid,  data, url ){
    //data={'id':articid };
    $.ajax({  dataType: "json", data:data, url:  url})
        .done(function( data ) {
            if (data.status=='success') {
                $(objid).replaceWith(data.value);
            }
        });
    return false
}
