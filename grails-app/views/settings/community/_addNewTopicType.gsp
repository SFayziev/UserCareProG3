<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${params.topicType}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="setting.community.topic.type.addnew" /></g:else>
    </h4>
</div>
<g:form controller="${params.controller}"  action="addNewTopicType"  id="${params.id}" class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >
    <div class="modal-body">
        <input type="hidden" name="topicType" value="${topicType?.id}">
        <div class="form-group">
            <label for="meta" class="col-lg-4 control-label"><g:message code="setting.community.topic.type.name" /></label>
            <div class="col-lg-8">
                <div class="input-group m-b">
                    <span class="input-group-btn">
                        <g:if test="${topicType?.id}">
                            <button type="button" onclick="translationTopicType('topictype.name',${topicType.forumid},  ${topicType?.id});" class="btn btn-default"><i class="icon-append fa fa-globe" ></i></button>
                        </g:if>
                    </span>
                    <input class="form-control"  id="meta" name="name"  type="text" value="${topicType?.articleTypeDTO?.name}">
                    <div class="help-block with-errors"></div>
                </div>
            </div>
        </div>

        <fieldset>
        <div class="form-group">
            <label  class="col-lg-4 control-label"><g:message code="setting.community.topic.type.access" /></label>
            <div class="col-lg-7">
                <div class="checkbox c-checkbox">
                    <label>
                    <input   name="topicType.useraccess"  value="1" <g:if test="${topicType?.useraccess}">checked=""</g:if>  type="checkbox">
                        <span class="fa fa-check"></span><g:message code="setting.community.topic.type.access.info" />
                    </label>
                </div>
            </div>
        </div>
        </fieldset>
        <div class="form-group">
            <label  class="col-lg-4 control-label"><g:message code="setting.status.title" /></label>
            <div class="col-lg-8">
                <g:select name="topicType.enable" class="form-control"  from="${[0, 1]}" value="${topicType?.enable?1:0}"
                          valueMessagePrefix="setting.status.type" />
            </div>
        </div>
        <div class="form-group">
            <label  class="col-lg-4 control-label"><g:message code="setting.community.setting.status.first.reply" /></label>
            <div class="col-lg-8">
                <g:select class="form-control"  id="firstreplystatus" optionKey="id" value="${topicType?.firstreplystatus}"
                          name="topicType.firstreplystatus"  optionValue="name" from="${topicStatuses}" />
            </div>
        </div>


    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
    </div>
</g:form>