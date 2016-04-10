<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.projectLinks.edit.title" /></h4>
</div>
<div class="modal-body">
    <form   id="widgetLinkEdit"   class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >
        <fieldset>
            <div class="form-group">
               <label class="col-lg-3 control-label"><g:message code="setting.name" /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="link.title" value="${link.title}">
                    <div class="note"><g:message code="setting.customize.projectLinks.edit.name.note"/></div>
                </div>

            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-3 control-label"><g:message code="setting.customize.projectLinks.edit.url" /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="link.links" value="${link.links}">
                    <div class="note"><g:message code="setting.customize.projectLinks.edit.url.note"/></div>
                </div>

            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
                <div class="col-lg-offset-3 col-lg-7">
                    <div class="checkbox c-checkbox">
                        <label>
                            <input  name="link.newwindow"  value="1" <g:if test="${link?.newwindow=1}">checked=""</g:if> type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.customize.projectLinks.edit.new.windows.note"/>
                        </label>
                    </div>
                </div>
            </div>

        </fieldset>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
            <button  id="saveOkBut" type="submit" onclick="widgetLinkSave(${params.moduleid}, ${params.linkid}); return false; "  class="btn btn-primary"><g:message code="button.save" /></button>
        </div>

    </form>
</div>
