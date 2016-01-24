<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.twitter.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="sky-form" >
        <fieldset>
            <section>
                <label class="label"><g:message code="setting.customize.twitter.widget.id" /></label>
                <label class="input state-success">
                    <input type="text" name="widgetid" value="${module.params?.widgetid?.value}">
                    <div class="note"> <g:message code="setting.customize.twitter.widget.id.note" /> </div>
                </label>
            </section>

            <section>
                <label class="label"><g:message code="setting.customize.facefook.height"   /></label>
                <label class="input state-success">
                    <input type="text" name="formheight" type="number" value="${module.params?.formheight?.value}">
                    <div class="note"> <g:message code="setting.customize.facefook.height.note" /> </div>
                </label>
            </section>

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
