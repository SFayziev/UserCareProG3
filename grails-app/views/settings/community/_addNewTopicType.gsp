<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${params.topicType}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="setting.community.topic.type.addnew" /></g:else>
    </h4>
</div>
<g:form controller="${params.controller}"  action="addNewTopicType"  id="${params.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
    <div class="modal-body">
        <input type="hidden" name="topicType" value="${topicType?.id}">
        <div class="form-group">
            <label for="meta" class="col-lg-4 control-label"><g:message code="setting.community.topic.type.name" /></label>
            <div class="col-lg-8">
                <label for="meta" class="input input-file state-success">
                    <g:if test="${topicType?.id}"><i class="icon-append fa fa-globe" onclick="translationTopicType('topictype.name',${topicType.forumid},  ${topicType?.id});"></i></g:if>
                    <input  id="meta" name="name"  type="text" value="${topicType?.articleTypeDTO?.name}">
                    <div class="help-block with-errors"></div>
                </label>
            </div>
        </div>

        <div class="form-group">
            <label  class="col-lg-4 control-label"><g:message code="setting.community.topic.type.access" /></label>
            <div class="col-lg-8">
                <label class="checkbox state-success"><input   name="topicType.useraccess"  value="1" <g:if test="${topicType?.useraccess}">checked=""</g:if>  type="checkbox"><i></i> <g:message code="setting.community.topic.type.access.info" /> </label>
            </div>
        </div>
        <div class="form-group">
            <label  class="col-lg-4 control-label"><g:message code="setting.status.title" /></label>
            <div class="col-lg-8">
                <label class="select state-success">
                    <g:select name="topicType.enable" from="${[0, 1]}" value="${topicType?.enable?1:0}"
                              valueMessagePrefix="setting.status.type" />
                    <i></i>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label  class="col-lg-4 control-label"><g:message code="setting.community.setting.status.first.reply" /></label>
            <div class="col-lg-8">
                <label class="select state-success">
                    <g:select id="firstreplystatus" optionKey="id" value="${topicType?.firstreplystatus}"
                              name="topicType.firstreplystatus"  optionValue="name" from="${topicStatuses}" />
                    <i></i>

                </label>
            </div>
        </div>


    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
    </div>
</g:form>