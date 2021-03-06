/**
 * Created by shuhrat on 03.09.2015.
 */
$.jGrowl.defaults.closerTemplate = '<div class="alert alert-info">Close All</div>';
var alertTypes = ['success', 'info', 'warning', 'danger'];


//===========================================================
var iContainer=$('#container');
iContainer.on("click","[data-action=votecomment]",voteComment);
iContainer.on("click","[data-action=votearticle]",voteArticle);
iContainer.on("click","[data-action=voteshow]",voteShow);
iContainer.on("click","[data-action=articleChangeStatus]",articleChangeStatus);
iContainer.on("click","[data-action=replycomment]",showCommentReply);
iContainer.on("click","a[data-action=deletecomment]",deleteReply);
iContainer.on("click","[data-action=deletearticle]",deleteArtilce);

//$("a[data-action=deletecomment]").click(showCommentReply);
iContainer.on("click","a[data-action=articleAssignTo]",articleAssignTo);
iContainer.on("click","a[data-action=articleAssignTags]",articleAssignTags);
iContainer.on("click","a[data-action=deleteAssignTags]",deleteAssignTags);

iContainer.on("click","a[data-action=articleAssignCategory]",articleAssignCategory);

iContainer.on("click","a[data-action=pagination]",setArticlePageTo);

$("input[data-action='searchArticle']").change(articleStartFind);
$("input[data-action='searchArticle']").keyup(articleStartFind);

iContainer.on("click","[data-action=editcomment]",showCommentEdit);
iContainer.on("click","[data-action=editarticle]",showArticleEdit);

iContainer.tooltip({selector: '[data-toggle="tooltip"]'});

function articleStartFind(){
    var instr=$(this);
    setTimeout(function(){ startSearching($(instr));   },1000);
}

function showMassge(mass){
    $.jGrowl(mass, { life:5000});

}
function clearSearching(inBox){
    var listItems= $("#searchresult");
    listItems.html('')
}
function startSearching(inBox){
    if(!inBox.data('isbusy') && inBox.data('prevsearch')!=inBox.val() && inBox.val().length>2 ){
        inBox.data('isbusy', 1);
        var data={'forum':2,'searchtext':inBox.val()};
        inBox.data('prevsearch', inBox.val() );
        $.ajax({  dataType: "json", data:data, url:  "/forum/search/"})
            .done(function( data ) {
                if (data.status=='success') {
                    var listItems= $("#searchresult");
                    listItems.html(data.value)
                }
            });
        inBox.data('isbusy', 0);

    }
    if(inBox.val().length<=2 ){
        clearSearching()
    }
    return false;
}



function  setArticleListType(moduleid, type){
    __uc_settings['module_'+ moduleid ]['typeid']=type;
    getArticleList(moduleid)
    return false;
}
function  setArticleListStatus(moduleid, status){
    __uc_settings['module_'+ moduleid ]['statusid']=status;
    getArticleList(moduleid);
    return false;
}

function setArticlePageTo(){
    var moduleid=$(this).closest('[data-moduleid]').attr('data-moduleid');
    __uc_settings['module_'+ moduleid ]['offset']=$(this).data('offset');
    getArticleList(moduleid);
    return false;
}


function  setArticleListOrder(moduleid,order){
    __uc_settings['module_'+ moduleid ]['orderid']=order;
    getArticleList(moduleid);
    return false;
}



$('*[data-poload]').hover(function() {
    $('.popover').remove();
    var e=$(this);
    e.popover('destroy');
    e.off('hover');
    $.get(e.data('poload'),function(d) {
        e.popover({html: true, content: d }).popover('show');
    });
});

function deleteAssignTags(){
    var articid=$(this).closest('[data-article-id]').attr('data-article-id');
    var forumid=$(this).closest('[data-forum-id]').attr('data-forum-id');
    var tagid= $(this).data('content');
    showModalForm ("#ucmodal" , '/article/deleteAssignTags/'+forumid +"/"+articid +"/?tag=" + tagid )
    //var modal =$("#ucmodal");
    //modal.removeData('bs.modal');
    //modal.modal({remote: '/article/deleteAssignTags/'+forumid +"/"+articid +"/?tag=" + tagid });
    //modal.modal('show');
    return false;
}

function showModal(modalWindowId, url){
    var modal =$(modalWindowId);
    modal.removeData('bs.modal');
    modal.modal({remote: url});
    modal.modal('show');
    return false;
}

function changeUserAvatar(userId){
    showModalForm ("#ucmodal" , '/file/userAvatarSelector/' + userId );
    return false;

}


function  getArticleList(moduleid){
    var listItems= $("#listItems");

    var status=__uc_settings['module_'+ moduleid ]['statusid'];
    var type=__uc_settings['module_'+ moduleid ]['typeid'];
    var order=__uc_settings['module_'+ moduleid ]['orderid'];

    var filter_user_id =__uc_settings['module_'+ moduleid ]['filter_user_id'];
    var category = __uc_settings['module_'+ moduleid ]['category'];
    var offset = __uc_settings['module_'+ moduleid ]['offset'];
    var tag = __uc_settings['module_'+ moduleid ]['tag'];
    var filterid = __uc_settings['module_'+ moduleid ]['filterid'];
    var forumids= __uc_settings['module_'+ moduleid ]['forumids'];
    var pagination=listItems.find(".pagination .active span").text();

    var data= { 'forumids':forumids,'offset':offset, 'filterid':filterid, 'tag':tag, 'category':category,  'moduleid':moduleid, 'status':status,'type':type,  'order': order,  'filter_user_id': filter_user_id };
    $.ajax({  dataType: "json", data:data, url:  "/forum/jsonlist/"})
        .done(function( data ) {
            if (data.status=='success') {
                var listItems= $("#listItems");
                listItems.replaceWith(data.value)
            }
        });
    return false;

}

function articleAssignCategory(){
    var articid=$(this).closest('[data-article-id]').attr('data-article-id');
    var categoryid= $(this).data('assignid');
    var data={'id':articid,'categoryid': categoryid};

    $.ajax({  dataType: "json", data:data, url:  "/article/assignToCategory/"})
        .done(function( data ) {
            if (data.status=='success') {
                refreshArticle(articid, '#article-'+articid);
                showMassge(data.massage);
            }
        });
    return false;
}
function articleAssignTags(){
    var articid=$(this).closest('[data-article-id]').attr('data-article-id');
    var tagid= $(this).data('assignid');
    var data={'id':articid,'tagid': tagid};

    $.ajax({  dataType: "json", data:data, url:  "/article/assignToTag/"})
        .done(function( data ) {
            if (data.status=='success') {
                refreshArticle(articid, '#article-'+articid);
                showMassge(data.massage);
            }
        });
    return false;

}

function articleAssignTo(){
    var articid=$(this).closest('[data-article-id]').attr('data-article-id');
    var userid= $(this).data('assignid');
    var data={'id':articid,'userid': userid};

    $.ajax({  dataType: "json", data:data, url:  "/article/assignToUser/"})
        .done(function( data ) {
            if (data.status=='success') {
                refreshArticle(articid,'#article-'+articid);
                showMassge(data.massage);
            }
        });
    return false;
}


//===========================================================

function articleChangeStatus(){
    var articid= $(this).data('content');
    var data={'id':articid,'value':$(this).data('status-value')};

    showCommentReply();
    $('.comment-copy').hide();
    $('.comment-copy #articstatus option:selected').val($(this).data('status-value'));
    $('.comment-copy #comment-tmpbar .comment-submit').click();
    return false;
}

/**
 * @return {boolean}
 */
function IsFollow(id){
    $.ajax({  dataType: "json",  url:  "/article/isfollow/?id="+id})
        .done(function( data ) {
            if (data.status=='success') {
                var follow=$('#follow-'+id);
                follow.html(data.value);
                //follow.click(follow);
            }
        });
    return false;
}
function follow(articid){

    $.ajax({  dataType: "json",  url:  "/article/follow/?id="+ articid})
        .done(function( data ) {
            if (data.status=='success') {
                var follow=$('#follow-'+articid);
                follow.html(data.value);
                showMassge(data.massage);
            }
            if (data.status=="error"){
                showMassge(data.massage);
            }

        });
    return false;
}
function voteShow(){
    var articid= $(this).data('content');
    var article=$('#article-'+articid);
    article.find("#votepanel-"+articid).toggle();

    IsFollow(articid);
    return false;
}
function voteComment(){
    //var data={'id':id,'value':value};
    var data={'id':$(this).data('content'),'value':$(this).data('vote-value')};
    var commentid= $(this).data('content');

    $.ajax({  dataType: "json", data:data, url:  "/comment/vote"})
        .done(function( data ) {

    if (data.status=='success') {
        var article=$('#comment-'+commentid);
        changeVotesum(article.find('#votesum-'+commentid),data.values.votesum );
        showMassge(data.massage);
    }
    if (data.status=="error"){
        showMassge(data.massage);
    }

   });
return false;
}

$('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
});

function changeVotesum( votesum, val ){
    votesum.removeClass("label-warning");
    votesum.removeClass("label-success");
    if(val>=0){
        votesum.text("+" +val);
        votesum.addClass("label-success")
    }
    else{
        votesum.text(val);
        votesum.addClass("label-warning")
    }
}

function voteArticle(){
    var data={'id':$(this).data('content'),'value':$(this).data('vote-value')};
    var articid= $(this).data('content');
    $.ajax({  dataType: "json", data:data, url:  "/article/vote"})
        .done(function( data ) {

        if (data.status=='success') {
            var article=$('#article-'+articid);
            changeVotesum(article.find('#votesum-'+articid),data.values.votesum );
            article.find('#voteup-'+articid).html('<i class="expand-list rounded-x fa fa-thumbs-up"></i> ' +  data.values.voteup);
            article.find('#votedown-'+articid).html('<i class="expand-list rounded-x fa fa-thumbs-down"></i> ' + data.values.votedown);
            showMassge(data.massage)
        }
        if (data.status=="error"){
            showMassge(data.massage);
        }

    });
    return false;
}

function deleteArtilce(){
    var articid= $(this).data('content');
    var forumid= $(this).data('forumid');
    showModal('#ucmodal', '/article/delete/'+forumid +'/'+articid) ;
    return false

}

function deleteReply(commid){

    data={'commid':commid  };
    $.ajax({  dataType: "json", data:data, url:  "/comment/deleteComment/"})
        .done(function( data ) {
            if (data.status=='success') {
                $('#comment-'+commid).remove();
            }
        });
    $('#ucmodal').modal('hide');
    return false
}
function showCommentReply(){
    removeComment();
    $("#commentDesc").hide();
    var template= $("#comment-template");
    template.hide();
    var content = $(this).data('content');

    var commentForm=template.clone();
    commentForm.addClass('comment-copy');
    commentForm.find('.comment-submit').click(postComment);
    commentForm.find('.comment-reset').click(removeComment);
    commentForm.attr('data-comment-parent-id',content);
    if (content>0){
        commentForm.appendTo("#comment-"+content+ " .media-body")}
    else {
        commentForm.appendTo(".comments-list");
    }
    commentForm.find('#comment-tmpbar').show();
    commentForm.find('#comment-adminbar').show();

    commentForm.show();
    var commText=commentForm.find(".commenttext");
    commText.summernote({focus: true});
    //$(".comment-copy .media-body textarea").focus()
    return false;
}

function showArticleEdit(){
    var articid= $(this).data('content');
    var forumid= $(this).data('forumid');

    showModal('#ucmodal', '/article/edit/'+forumid +'/'+articid) ;
    return false
}

function showCommentEdit(){
    removeComment();
    $("#comment-template").hide();

    var commentForm=$("#comment-template").clone(true);
    var content = $(this).data('content');
    //if (content==undefined) {content=0};
    var comment=$("#comment-"+content);
    comment.addClass("comment-copy");
    comment.attr("data-mode", 'edit');
    var commText=comment.find(".commenttext");
    commentForm.find('#comment-tmpbar').insertAfter(commText);
    comment.find("#comment-commandbar-"+content).hide();

    comment.find('#comment-tmpbar').show();
    comment.find('#comment-adminbar').show();
    comment.find('.comment-submit').click(postComment);


    comment.find('.comment-submit').attr("data-content", content);
    comment.find('.comment-reset').attr("data-content", content);
    commText.summernote({focus: true});
    comment.find('.comment-reset').click(removeEditComment);
    return false;
}
function  removeEditComment() {

    var comment=$('.comment-copy');
    var content = comment.data('content');

    comment.find(".commenttext").destroy();
    comment.find("#comment-commandbar-"+content).show();
    comment.find('#comment-tmpbar').remove();
    comment.find('#comment-adminbar').remove();
    comment.removeClass("comment-copy");
    return false;
}

function  removeComment() {
    var mode=$('.comment-copy').data('mode');
    var template= $("#comment-template");
    template.show();
    $("#commentDesc").show();
    if (mode=='edit'){
        removeEditComment();
    }
    else {
        $('.comment-copy').remove();
    }

}
function refreshArticle(articid,objid ){

    data={'id':articid };
    $.ajax({  dataType: "json", data:data, url:  "/article/getArticle/"})
        .done(function( data ) {
            if (data.status=='success') {
                $(objid).replaceWith(data.value);
                //$('#article-'+articid).replaceWith(data.value);
            }
        });
    return false
}

function changeForumNotify(userid, forumid){
    data={'forumid':forumid };
    $.ajax({  dataType: "json", data:data, url:  "/user/changeForumNotify/" +userid })
        .done(function( data ) {
            if (data.status=='success') {
                $("#notifyForums"+ data.contentid ).prop("checked", data.value);
            }
        });
    return false
}

function postComment(){
    var commentid=$(this).data('content');
    var comment=$(this).closest('.comment-copy'); //$('.comment-copy');
    var articid= comment.closest('[data-article-id]').attr('data-article-id');
    var parentid= comment.data('comment-parent-id');
    var statusValue=comment.find('#articstatus option:selected').val();
    var answer = comment.find("#answerChbox").prop("checked");
    var commentText=comment.find(".media-body .commenttext").code();   // $(".comment-copy .media-body .commenttext").code();

    data={ 'commentid': commentid,  'id':articid, 'answer':answer, 'parentid':parentid,'commentText':commentText , 'statusValue':statusValue};
    $.ajax({  dataType: "json", data:data, url:  "/comment/post/"})
        .done(function( data ) {
            if (data.status=='success') {
                $('#itemandcomment').replaceWith(data.value);

            }
        });
    return false
}


var getHost = function() {
    var port = (window.location.port == "8080") ? ":8080" : "";
    return ((port == '443') ? 'https://' : 'http://') + window.location.hostname + port;
};

var onLogin;
$.ajaxSetup({
    beforeSend: function(xhr, event) {
        // save the 'success' function for later use
        onLogin = event.success;
    },
    statusCode: {
        // Set up a global AJAX error handler to handle the 401
        // unauthorized responses. If a 401 status code comes back,
        // the user is no longer logged-into the system and can not
        // use it properly.
        401: function() {
            showLogin();
        }
    }
});

function showLogin() {
    //var ajaxLogin = $('#ajaxLogin');
    //ajaxLogin.css('text-align','center');
    // use jqModal to show and align login panel
    //ajaxLogin.jqmShow();

    var modal =$("#ucmodal");
    modal.removeData('bs.modal');
    modal.modal({remote: '/user/login/' });
    modal.modal('show');
    return false;
}

//function cancelLogin() {
//    $('#ajaxLogin').jqmHide();
//}

function authAjax() {
    $('#loginMessage').html('Sending request ...').show();

    var form = $('#ajaxLoginForm');
    var config = {
        type: 'post',
        url: getHost() + "/login/login/authenticate",
        data: form.serialize(),
        async: false,
        dataType: 'JSON',
        success: function(response) {
            form[0].reset();
            location.reload();
        },
        error: function (response) {
            var responseText = response.responseText || '[]';
            var json = responseText.evalJSON();
            if (json.error) {
                $('#loginMessage').html("<span class='errorMessage'>" + json.error + '</error>');
            }
            else {
                $('#loginMessage').html(responseText);
            }
        },
        beforeSend: function(xhr, event) {
            //console.log("overriding default behaviour");
        }
    };
    $.ajax(config);
}

function logout(event) {
    event.preventDefault();
    $.ajax({
        url: $("#logout").attr("href"),
        method: "POST",
        success: function(data, textStatus, jqXHR) {
            window.location = "/";
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Logout error, textStatus: " + textStatus +
                ", errorThrown: " + errorThrown);
        }
    });
}

$("#logout").click(logout);
$('#authAjax').click(authAjax);

//$.ajaxSetup({
//    error: function(xhr, status, err) {
//        if (xhr.status == 401) {
//            authAjax()
//        }
//    }
//    });



$(".modal-fullscreen").on('show.bs.modal', function () {
    setTimeout( function() {
        $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
    }, 0);
});
$(".modal-fullscreen").on('hidden.bs.modal', function () {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
});


