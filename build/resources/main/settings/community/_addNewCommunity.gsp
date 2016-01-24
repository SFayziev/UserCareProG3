<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:message code="setting.community.add.new" /></h4>
</div>
<g:form controller="community" action="add" class="sky-form" style="border: none;" >
<div class="modal-body">
    <section>
        <label class="label"><g:message code="setting.name" /></label>
        <label class="input state-success">

            <input name="name" class="form-control" required  type="text">
        </label>
        <div class="note"><g:message code="setting.community.add.new.info"/></div>

    </section>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
    <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="default.button.add.label" /></button>
</div>
</g:form>