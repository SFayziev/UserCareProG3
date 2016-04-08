<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:message code="setting.community.add.new" /></h4>
</div>
<g:form controller="${params.controller}"  action="add" role="form" data-toggle="validator" novalidate="novalidate" >
<div class="modal-body">
    <fieldset>
      <div class="form-group">
        <label class="col-lg-3 control-label"><g:message code="setting.name" /></label>
        <div class="col-lg-8">
            <input name="name" class="form-control" required  type="text">
            <div class="note"><g:message code="setting.community.add.new.info"/></div>
        </div>
    </div>
    </fieldset>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
    <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="default.button.add.label" /></button>
</div>
</g:form>