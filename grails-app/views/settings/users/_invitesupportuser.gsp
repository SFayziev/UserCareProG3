<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:message code="setting.user.agents.add.new" />
    </h4>
</div>
<g:form controller="users" action="invitesupportuser"  id="${params.id}" class="form-horizontal sky-form" role="form" data-toggle="validator"  >
    <div class="modal-body">
        <section>
            <label class="label"><b><g:message code="setting.email"/></b></label>
            <label class="input state-success">
                <input   name="user.email"  required type="email" value="">
                <div class="note">  <g:message code="setting.user.agents.add.new.info" /></div>
            </label>
        </section>

    <div class="alert alert-info fade in">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <p><g:message code="setting.user.agents.add.new.note" /></p>
    </div>

    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="default.button.add.label" /></button>
    </div>
</g:form>