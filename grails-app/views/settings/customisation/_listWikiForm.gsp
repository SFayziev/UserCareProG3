<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.listWiki.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="sky-form" >
        <fieldset>
            <section>
                <label class="label"><g:message code="setting.customize.forumlist.param.header" /></label>
                <label class="input state-success">
                    <input type="text" name="title" value="${module.params?.title?.value}">
                </label>
            </section>
            <section>
                <label class="label"><g:message code="setting.customize.listWiki.mode" /></label>
                <label class="select state-success">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select name="modetype" from="${['default', 'onelevel']}" value="${module.params?.modetype?.value }"
                              valueMessagePrefix="setting.customize.listWiki.mode.type" />
                    <i></i>

                </label>
            </section>

            <section>
                <label class="label"><g:message code="setting.customize.forumlist.maxRecods" type="number"  /></label>
                <label class="input state-success">
                    <input type="text" name="maxRecords" value="${module.params?.maxRecords?.value}">
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
