/**
 * Created by Admin on 03.11.2015.
 */

var iContainer=$('.container');
iContainer.on("click","[data-action=widgetUP]",widgetUP);
iContainer.on("click","[data-action=widgetDOWN]",widgetDOWN);
iContainer.on("click","[data-action=widgetEDIT]",widgetEDIT);
iContainer.on("click","[data-action=widgetDELETE]",widgetDELETE);
iContainer.on("click","[data-action=widgetTranslate]",widgetTranslate);

function widgetTranslate(){
    window.parent.postMessage('widgetTranslate='+$(this).data('content') , '*');
}

function widgetDELETE(){
    window.parent.postMessage('widgetDELETE='+$(this).data('content') , '*');
}

function  widgetEDIT(){
    window.parent.postMessage('widgetEDIT='+$(this).data('content') , '*');
}


function widgetUP(){
    var dparent=$(this).closest(".customisation_mode");
    var data={'id':$(this).data('content'),'direction':'up',displaymode :$(this).data('displaymode')};
    $.ajax({  dataType: "json", data:data, url:  "/settings/customisation/moveWidget"})
        .done(function( data ) {
            if (data.status=='success') {
                dparent.prev('div.customisation_mode').before(dparent)
            }
        });
    return false;
}

function widgetDOWN(){
    var dparent=$(this).closest(".customisation_mode");
    var data={'id':$(this).data('content'),'direction':'down' ,displaymode :$(this).data('displaymode')};
    $.ajax({  dataType: "json", data:data, url:  "/settings/customisation/moveWidget"})
        .done(function( data ) {
            if (data.status=='success') {
                dparent.next('div.customisation_mode').after(dparent)
            }
        });
    return false;
}
