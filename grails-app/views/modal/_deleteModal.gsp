<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="default.button.delete.label" /></h4>
</div>
<div class="modal-body">
    <p><g:message code="setting.community.customize.delete.msg" /></p>
</div>
<g:form params="${params}" action="${params.action}">
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
    <button data-content="${params.id}" id="deleteOkBut"  name="submit" value="save"  type="submit"  class="btn btn-primary"><g:message code="default.button.delete.label" /></button>
</div>
</g:form>