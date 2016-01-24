<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${params.id}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="setting.community.category.addnew" /></g:else>
        </h4>
</div>
<g:form controller="community" action="addNewCategory"  id="${params.id}" class="sky-form" style="border: none;" >
    <div class="modal-body">
        <input type="hidden" name="catid" value="${category?.id}">
        <section>
            <label class="label"><g:message code="setting.name" /></label>
            <label class="input state-success">
                <g:if test="${category?.id}"><i class="icon-append fa fa-globe" onclick="translationCategory('category.name', ${category?.id});"></i></g:if>
                <input name="category.name" class="form-control" value="${category?.name}" required  type="text">
            </label>
        </section>
        <section>
            <label class="label"><g:message code="setting.community.category.parent" /></label>
            <label class="select state-success">
                <g:select  optionKey="id" value="${category?.parentid}" noSelection="['0':'']"
                           name="category.parentid"  optionValue="name" from="${categoris}" />
                <i></i>
            </label>
            <div class="note"><g:message code="setting.community.category.parent.info"/></div>
        </section>
        <section>
            <label class="label"><g:message code="setting.community.category.privacy" /></label>
            <label class="select state-success">
                %{--<label for="firstreplystatus" class="select state-success">--}%
                <g:select name="description.privated" from="${['0', '1' ]}" value="${category?.privated }"
                          valueMessagePrefix="setting.community.category.privacy.type" />
                <i></i>

            </label>
            <div class="note"><g:message code="setting.community.category.privacy.info"/></div>
        </section>

        <section>
            <label class="label"><g:message code="setting.community.category.description" /></label>
            <label class="input state-success">
                <input name="category.description" class="form-control" value="${category?.description}" required  type="text">
            </label>
        </section>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="default.button.add.label" /></button>
    </div>
</g:form>