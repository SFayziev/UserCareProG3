<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${params.id}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="default.button.add.label" /></g:else>
    </h4>
</div>
<g:form controller="knowledgebase" action="addNewTag"  id="${params.id}" class="sky-form" style="border: none;" >
    <div class="modal-body">
        <input type="hidden" name="tagid" value="${params.tagid}">
        <section>
            <label class="label"><g:message code="setting.name" /></label>
            <label class="input state-success">
                <g:if test="${tag?.id}"><i class="icon-append fa fa-globe" onclick="translationTag('tag.name',${params.id} ,   ${tag?.id});"></i></g:if>
                <input name="tag.name" class="form-control" value="${tag?.name}" required  type="text">
            </label>
        </section>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
    </div>
</g:form>