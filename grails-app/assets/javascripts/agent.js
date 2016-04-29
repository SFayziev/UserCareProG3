/**
 * Created by Lenovo on 26.04.2016.
 */
var iContainer=$('.content-wrapper');
var lastarticleid=0;
iContainer.on("click","[data-action=showarticle]",showArticle);


function showArticle(){
    var articleid=$(this).data('article-id');
    getandChangeJson ("#artilceDeatails", {'id':articleid }, "/agent/articleDetail"  );
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
