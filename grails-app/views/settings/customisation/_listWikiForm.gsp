<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.listWiki.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate"  >
        <fieldset>
            <div class="form-group">
               <label class="col-lg-3 control-label"><g:message code="setting.customize.forumlist.param.header" /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="title" value="${module.params?.title?.value}">
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-3 control-label"><g:message code="setting.customize.listWiki.mode" /></label>
                <div class="col-lg-8">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select class="form-control" name="modetype" from="${['default', 'onelevel']}" value="${module.params?.modetype?.value }"
                              valueMessagePrefix="setting.customize.listWiki.mode.type" />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-3 control-label"><g:message code="setting.customize.forumlist.maxRecods" type="number"  /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="maxRecords" value="${module.params?.maxRecords?.value}">
                </div>
            </div>

        </fieldset>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
            <button data-content="${params.id}" id="saveOkBut" type="submit"  class="btn btn-primary"><g:message code="default.button.update.label" /></button>
        </div>

    </form>
</div>

<script type="text/javascript">
    $(document).ready(function() { setAjaxModuleCustomisationSave(${module.id}); });
</script>
