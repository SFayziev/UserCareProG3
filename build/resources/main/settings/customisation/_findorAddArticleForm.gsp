
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.forumlist.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="sky-form" >
        <fieldset>
            <section>
                <label class="label"><g:message code="setting.customize.findOrAdd.placeholder" /></label>
                <label class="input state-success">
                    <input type="text" name="placeholder" value="${module.params?.placeholder?.value}">
                </label>
            </section>
            <section>
                <label class="label"><g:message code="setting.customize.findOrAdd.add.button" /></label>
                <label class="input state-success">
                    <input type="text" name="addButton" value="${module.params?.addButton?.value}">
                </label>
            </section>


            <section>
                <label class="checkbox state-success"><input  name="showPrivate"  value="1" <g:if test="${module.params?.showprivate?.value=1}">checked=""</g:if> type="checkbox"><i></i><g:message code="setting.customize.findOrAdd.show.private"/></label>
            </section>
            <section>
                <label class="label"><g:message code="setting.customize.findOrAdd.private.title" type="number"  /></label>
                <label class="input state-success">
                    <input type="text" name="privateTitle" value="${module.params?.privateTitle?.value}">
                </label>
            </section>
            <section>
                <label class="label"><g:message code="setting.customize.listWiki.articles.limit" type="number"  /></label>
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
