<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${params.id}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="setting.community.category.addnew" /></g:else>
        </h4>
</div>
<g:form controller="${params.controller}"  action="addNewCategory"  id="${params.id}" class="form-horizontal"  role="form" data-toggle="validator" novalidate="novalidate" >
    <div class="modal-body">
        <input type="hidden" name="catid" value="${category?.id}">
            <div class="form-group">
                <label class="col-lg-4 control-label" ><g:message code="setting.name" /></label>
                 <div class="col-lg-8">
                     <div class="input-group m-b">
                         <span class="input-group-btn">
                             <g:if test="${category?.id}">
                                 <button type="button" onclick="translationCategory('category.name', ${category?.id});" class="btn btn-default"><i class="icon-append fa fa-globe" ></i></button>
                             </g:if>
                         </span>
                         <input  name="category.name" class="form-control" value="${category?.name}" required  type="text">
                     </div>
                 </div>
            </div>

            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.community.category.parent" /></label>
                <div class="col-lg-8">
                    <g:select   class="form-control" optionKey="id" value="${category?.parentid}" noSelection="['0':'']"
                               name="category.parentid"  optionValue="name" from="${categoris}" />
                    <div class="note"><g:message code="setting.community.category.parent.info"/></div>
                </div>
            </div>

            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.community.category.privacy" /></label>
                <div class="col-lg-8">
                    <g:select class="form-control" name="description.privated" from="${['0', '1' ]}" value="${category?.privated }"
                              valueMessagePrefix="setting.community.category.privacy.type" />
                    <div class="note"><g:message code="setting.community.category.privacy.info"/></div>
                </div>
            </div>

            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.community.category.description" /></label>
                <div class="col-lg-8">
                    <input name="category.description" class="form-control" value="${category?.description}" required  type="text">
                </div>
            </div>
        </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="default.button.add.label" /></button>
    </div>
</g:form>