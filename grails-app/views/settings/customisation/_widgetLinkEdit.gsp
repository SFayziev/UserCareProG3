<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.projectLinks.edit.title" /></h4>
</div>
<div class="modal-body">
    <form   id="widgetLinkEdit"   class="sky-form" >
        <fieldset>
            <section>
                <label class="label"><g:message code="setting.name" /></label>
                <label class="input state-success">
                    <input type="text" name="link.title" value="${link.title}">
                </label>
                <div class="note"><g:message code="setting.customize.projectLinks.edit.name.note"/></div>
            </section>
            <section>
                <label class="label"><g:message code="setting.customize.projectLinks.edit.url" /></label>
                <label class="input state-success">
                    <input type="text" name="link.links" value="${link.links}">
                </label>
                <div class="note"><g:message code="setting.customize.projectLinks.edit.url.note"/></div>
            </section>

            <section>
                <label class="checkbox state-success"><input  name="link.newwindow"  value="1" <g:if test="${link?.newwindow=1}">checked=""</g:if> type="checkbox"><i></i><g:message code="setting.customize.projectLinks.edit.new.windows.note"/></label>
            </section>

        </fieldset>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
            <button  id="saveOkBut" type="submit" onclick="widgetLinkSave(${params.moduleid}, ${params.linkid}); return false; "  class="btn btn-primary"><g:message code="button.save" /></button>
        </div>

    </form>
</div>
