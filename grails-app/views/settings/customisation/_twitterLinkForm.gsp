<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.twitter.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="form-horizontal" >
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="setting.customize.twitter.widget.id" /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="widgetid" value="${module.params?.widgetid?.value}">
                    <div class="note"> <g:message code="setting.customize.twitter.widget.id.note" /> </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="setting.customize.facefook.height"   /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="formheight" type="number" value="${module.params?.formheight?.value}">
                    <div class="note"> <g:message code="setting.customize.facefook.height.note" /> </div>
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
