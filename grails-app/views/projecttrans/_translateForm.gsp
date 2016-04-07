<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><i class="icon-custom rounded-x icon-bg-blue icon-line fa fa-globe"></i>  <g:message code="setting.translation.popup.title" /></h4>
</div>
<div class="modal-body">
    <blockquote class="hero">
        <g:message code="setting.translation.popup.info" />
    </blockquote>

    <form id="translateForm" >
        <input type="hidden" name="mkey"  id="mkey" value="${mkey}" >
        <input type="hidden" name="id" id="transid" value="${params.id}" >
        <input type="hidden" id="keylang" name="keylang" value="${selLang?.namesmall}" >

        <div class="form-group">
            <div class="row">
            <section class="col-sm-6">
                <label class="control-label"><g:message code="setting.translation.popup.key.language" /></label>
                <input name="name" class="form-control" disabled value="${selLang?.name}" readonly type="text">
            </section>
            <section class="col-sm-6">
                <label class="control-label"><g:message code="setting.translation.popup.target" /></label>
                <g:select  onchange="selectedI18nValue(); return false;" class="form-control"  id="selectLang" optionKey="namesmall" value="${selectLang?.namesmall}"
                          name="selectLang"  optionValue="name" from="${selectLangs}" />
            </section>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
            <section class="col-sm-6">
                <label  class="control-label"><g:message code="setting.name" /></label>
                <input name="name" class="form-control" disabled id="orgvalue" type="text" value="${curval}">
            </section>
            <section class="col-sm-6">
                <label  class="control-label"><g:message code="setting.name" /></label>
                <input name="transvalue"  class="form-control" id="transvalue" value="${transval}" type="text" >
            </section>

            </div>

        </div>
        <div class="form-group">
            <div class="row">
                <section class="col-sm-12">
                    <label class="input pull-right space-xs-hor">
                        <button  class="btn-u " onclick="bingTranslate(); return false;"><g:message code="setting.translation.popup.suggest" /></button>
                        <button  class="btn-u"   onclick="copyOriginal(); return false;"><g:message code="setting.translation.popup.copy" /></button>
                    </label>
                </section>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
    <button  type="button" onclick="saveTranslate(); return false;" class="btn btn-primary"><g:message code="button.save" /></button>
</div>
<script language="JavaScript">
function copyOriginal(){
    $('#transvalue').val($('#orgvalue').val());
    return false;
}

function bingTranslate(){
    data={'text':$('#orgvalue').val(), keylang:$('#keylang').val() , "sellang": $("#selectLang").val()};
    $.ajax({  dataType: "json",        data: data, url:  "/traslation/projecttrans/bingtranslate"  })
            .done(function( data ) {
                if (data.status=='success') {
                    $('#transvalue').val(data.value );
                }
            });
    return false;
}

function selectedI18nValue(){
    data={'mkey':$('#mkey').val(), id:$('#transid').val() , "sellang": $("#selectLang").val()};
    $.ajax({  dataType: "json",        data: data, url:  "/traslation/projecttrans/mkeyvalue"  })
            .done(function( data ) {
                if (data.status=='success') {
                    $('#transvalue').val(data.value );
                }
            });
    return false;
}

function saveTranslate(){
    data = $('#translateForm').serialize();
    $.ajax({  dataType: "json",        data: data, url:  "/traslation/projecttrans/savetranslate"  })
            .done(function( data ) {
                if (data.status=='success') {
                    $('#transvalue').val(data.value );
                    var modal =$("#translationModal");
                    modal.modal('hide');
                }
            });
    return false;
}


</script>
