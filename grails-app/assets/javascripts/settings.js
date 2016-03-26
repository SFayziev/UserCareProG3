/**
 * Created by Admin on 04.11.2015.
 */
// Here "addEventListener" is for standards-compliant web browsers and "attachEvent" is for IE Browsers.
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];

// Now...
// if
//    "attachEvent", then we need to select "onmessage" as the event.
// if
//    "addEventListener", then we need to select "message" as the event
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child IFrame window
eventer(messageEvent, function (e) {
    //alert(e.data);
    var messages = e.data.split('=');
    command=messages[0];
    mparams=messages[1];
    switch(command)
    {
        case 'widgetDELETE':
            widgetDELETEConfirm(mparams);
            break;
        case 'widgetEDIT':
            widgetEDIT(mparams);
            break;
        case  'widgetTranslate':
            widgetTranslate(mparams);
            break;
    }
    // Do whatever you want to do with the data got from IFrame in Parent form.
}, false);


function topicTypeUP(forumid,  id) {
    var dparent=$('#topicType'+id );
    var data={'id':forumid ,'topicType':id , 'direction':'up'};
    $.ajax({  dataType: "json", data:data, url:  "/settings/community/moveTopicType"})
        .done(function( data ) {
            if (data.status=='success') {
                dparent.prev('tr').before(dparent)
            }
        });
    return false;
}

function topicTypeDOWN(forumid,  id) {
    var dparent=$('#topicType'+id );
    var data={'id':forumid ,'topicType':id , 'direction':'down'};
    $.ajax({  dataType: "json", data:data, url:  "/settings/community/moveTopicType"})
        .done(function( data ) {
            if (data.status=='success') {
                dparent.next('tr').after(dparent)
            }
        });
    return false;
}

function statusMove(id , direction){
    var dparent=$('#topicStatus'+id );
    var data={'id':id ,'direction':direction};
    $.ajax({  dataType: "json", data:data, url:  "/settings/community/moveTopicStatus"})
        .done(function( data ) {
            if (data.status=='success') {
                if(direction=='up'){
                    dparent.prev('tr').before(dparent)
                }
                else{
                    dparent.next('tr').after(dparent)
                }
            }
        });
    return false;
}

function categoryUP(id) {
    var dparent=$('#category'+id );
    var data={'id':id ,'direction':'up'};
    $.ajax({  dataType: "json", data:data, url:  "/settings/community/moveCategory"})
        .done(function( data ) {
            if (data.status=='success') {
                dparent.prev('tr').before(dparent)
            }
        });
    return false;
}

function categoryDOWN(id) {
    var dparent=$('#category'+id );
    var data={'id':id ,'direction':'down'};
    $.ajax({  dataType: "json", data:data, url:  "/settings/community/moveCategory"})
        .done(function( data ) {
            if (data.status=='success') {
                dparent.next('tr').after(dparent)
            }
        });
    return false;
}


function widgetTranslate(mparams){
    translationModule('forum.module.title' , mparams)
}

function widgetDELETEConfirm(mparams){
    var modal =$("#ucmodal");
    modal.removeData('bs.modal');
    modal.modal({remote: '/settings/customisation/delete/' + mparams });
    modal.modal('show');
    modal.find("#deleteOkBut").click(widgetDELETE);
    return false;
}
function widgetDELETE(){
    var modal =$("#ucmodal");
    var content = modal.find("#deleteOkBut").data('content');
    data={'id':content };
    $.ajax({  dataType: "json", url:  "/settings/customisation/deleteWidget/"+content  })
        .done(function( data ) {
            if (data.status=='success') {
                document.getElementById('iframe1').contentWindow.location.reload();
                $("#ucmodal").modal('hide');
            }
        });
    return false;
}

function widgetAdd(id ,vtype, dtype , modtypeid){

    data={'vtype': vtype, 'dtype': dtype, 'modtypeid':modtypeid };
    $.ajax({  dataType: "json", data:data, url:  "/settings/customisation/addwidget/"+id })
        .done(function( data ) {
            if (data.status=='success') {
                document.getElementById('iframe1').contentWindow.location.reload();
                $("#myLargModal").modal('hide');
            }
        });
    return false;
}

function changeSupportStatus(userid, state){
    data={'id':userid, state:state };
    $.ajax({  dataType: "json", data:data, url:  "/settings/users/changesupportstatus/"  })
        .done(function( data ) {
            if (data.status=='success') {
                var listItems= $("#user" +data.userid);
                listItems.replaceWith(data.value)

            }
        });
    return false;
}

function widgetEDIT(mparams){
    showModal('#ucmodal', '/settings/customisation/editWidget/' + mparams )

}

function changeForumImg(id){
    showModal('#ucmodal', '/file/forumImageSelector/' + id +"?withicon=1" )

}

function changeCategoryImg(id){
    showModal('#ucmodal', '/file/categoryImageSelector/' + id +"?withicon=1" )

}

function showModal(modalWindowId, url){
    var modal =$(modalWindowId);
    modal.removeData('bs.modal');
    modal.modal({remote: url});
    modal.modal('show');
    return false;
}

function changeTopicTypeImg(id){
    showModal('#ucmodal', '/file/topicTypeSelector/' + id +"?withicon=1" )

}


function setAjaxModuleCustomisationSave(moduleid){
    $('#moduleEditForm').submit(function() {
        ajaxSubmit({'form':'#moduleEditForm','url':'/settings/customisation/saveWidget/'+moduleid ,'result':moduleCustomisationSaveSuccess, 'resulterr':moduleCustomisationSaveFail});
        return false;
    });
}

function moduleCustomisationSaveSuccess(data){
    $("#ucmodal").modal('hide');
    document.getElementById('iframe1').contentWindow.location.reload();
}
function moduleCustomisationSaveFail(data){

}



function ajaxSubmit(args) {
    $(".has-error").removeClass('has-error');
    $(".help-block.error-description").remove();
    data = $(args.form).serialize();
    if (args.vars != null) data = data + args.vars;
    url = args.url;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function(data) {

            if (data.status=='success') {
                args.result(data);
            } else {
                //ajaxEditFail(data);
                if (args.resulterr) {
                    args.resulterr(data);
                }
            }
        },
        error: function(data, status, error) {},
        dataType: 'json'
    });
    return false;
}


function  translationModal(mkey, forumid){
    translation('/traslation/projecttrans/forum/'+forumid +'?mkey=' + mkey );
    return false;

}

function    translationTag(mkey,forumid, tagid){
    translation('/traslation/projecttrans/topictag/'+tagid +'?mkey=' + mkey +"&forumid="+forumid );
    return false;}

function   translationTopicType(mkey,forumid, typeid){
    translation('/traslation/projecttrans/topictype/'+typeid +'?mkey=' + mkey +"&forumid="+forumid );
    return false;}

function translationArticSatus(mkey,forumid, typeid){
    translation('/traslation/projecttrans/topicarticsatus/'+typeid +'?mkey=' + mkey +"&forumid="+forumid );
    return false;
}
function  translationCategory(mkey, catid){
    translation('/traslation/projecttrans/category/'+catid +'?mkey=' + mkey );
    return false;

}
function  translationModule(mkey, moduleid){
    translation('/traslation/projecttrans/module/'+moduleid +'?mkey=' + mkey );
    return false;
}
function  translation( url){
    showModal("#translationModal", url )

}


function widgetLinkMove(moduleid, linkid, direction){
    var dparent=$('#widgetlink'+linkid );
    var data={'moduleid':moduleid , 'linkid':linkid, 'direction': direction};
    $.ajax({  dataType: "json", data:data, url:  "/settings/customisation/widgetLinkMove"})
        .done(function( data ) {
            if (data.status=='success') {
                if(direction=='down'){
                    dparent.next('tr').after(dparent)
                }else {
                    dparent.prev('tr').before(dparent)
                }

            }
        });
    return false;

}

function widgetLinkDelete(moduleid, linkid){
    var dparent=$('#widgetlink'+linkid );

    var data={'moduleid':moduleid , 'linkid':linkid};
    $.ajax({  dataType: "json", data:data, url:  "/settings/customisation/widgetLinkDelete"})
        .done(function( data ) {
            if (data.status=='success') {
                dparent.remove();
            }
        });
    return false;
}

function widgetLinkEdit(moduleid, linkid){
    showModal("#ucmodal", '/settings/customisation/widgetLinkEdit?moduleid='+moduleid+'&linkid='+linkid  )

}

function widgetLinkSave(moduleid, linkid){
    var data = $("#widgetLinkEdit").serialize();
    $.ajax({  dataType: "json", data:data, url:  '/settings/customisation/widgetLinkSave?moduleid='+moduleid+"&linkid="+linkid })
        .done(function( data ) {
        });
    widgetEDIT(moduleid)
}

function widgetLinkImg (moduleid, linkid){
    showModal('#ucmodal', '/file/topicTypeSelector/' + moduleid +"?withicon=1")
}