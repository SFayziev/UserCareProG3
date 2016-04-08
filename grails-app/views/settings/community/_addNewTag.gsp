<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${params.id}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="default.button.add.label" /></g:else>
    </h4>
</div>
<g:form controller="${params.controller}"  action="addNewTag"  id="${params.id}" class="form-horizontal"  role="form" data-toggle="validator" novalidate="novalidate" >
    <div class="modal-body">
        <input type="hidden" name="tagid" value="${params.tagid}">
        <div class="form-group">
            <label class="col-lg-3 control-label" ><g:message code="setting.name" /></label>
            <div class="col-lg-8">
                <div class="input-group m-b">
                    <span class="input-group-btn">
                        <g:if test="${tag?.id}">
                            <button type="button" onclick="translationTag('tag.name',${params.id} ,   ${tag?.id});" class="btn btn-default"><i class="icon-append fa fa-globe" ></i></button>
                        </g:if>
                    </span>
                    <input  name="tag.name" class="form-control" value="${tag?.name}" required  type="text">
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
    </div>
</g:form>