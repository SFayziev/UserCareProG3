<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:message code="setting.user.agents.edit.title" />
    </h4>
</div>
<g:form controller="users" action="editsupport"  id="${params.id}" class="form-horizontal " role="form" data-toggle="validator" novalidate="novalidate" >
    <div class="modal-body">

         <fieldset>
             <div class="form-group">
                <label class="col-lg-3 control-label"><b><g:message code="setting.user.agents.staff.position"/></b></label>
                <div class="col-lg-7">
                    <input  class="form-control" required name="user.position"  type="text" value="${user?.position}">
                </div>
            </div>
        </fieldset>
         <fieldset>
             <div class="checkbox c-checkbox">
                 <label>
                     <input   name="userPermissionsDTO.showinteamlist"  value="1" <g:if test="${user.userPermissionsDTO.showinteamlist}">checked=""</g:if>  type="checkbox">
                     <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.inteam.list" />
                     <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.inteam.list.info" />" ><i class="fa fa-question-circle"></i> </a>
                 </label>
             </div>
         </fieldset>
        <fieldset>
            <div class="checkbox c-checkbox">
                <label>
                <input   name="userPermissionsDTO.manager"  value="1" <g:if test="${user.userPermissionsDTO.manager}">checked=""</g:if>  type="checkbox">
                <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.project.manager" />
                <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.inteam.list.info" />" ><i class="fa fa-question-circle"></i> </a>
                </label>
            </div>
        </fieldset>
    <hr>
        <div class="row">
            <div class="col-lg-6">
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.payforproject"  value="1" <g:if test="${user.userPermissionsDTO.payforproject}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.can.pay" />
                            <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.can.pay.info" />" ><i class="fa fa-question-circle"></i> </a>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.assignperformers"  value="1" <g:if test="${user.userPermissionsDTO.assignperformers}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span> <g:message code="setting.user.agents.permission.assign.performers" />
                            <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.assign.performers.info" />" ><i class="fa fa-question-circle"></i> </a>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.editfeedback"  value="1" <g:if test="${user.userPermissionsDTO.editfeedback}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.edit.feadback" />
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.feedbacktags"  value="1" <g:if test="${user.userPermissionsDTO.feedbacktags}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.settsg.feadback" />
                            <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.settsg.feadback.info" />" ><i class="fa fa-question-circle"></i> </a>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.managefeedback"  value="1" <g:if test="${user.userPermissionsDTO.managefeedback}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.manage.feadback" />
                            <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.manage.feadback.info" />" ><i class="fa fa-question-circle"></i> </a>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.manageusers"  value="1" <g:if test="${user.userPermissionsDTO.manageusers}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.manage.users" />
                            <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.manage.users.info" />" ><i class="fa fa-question-circle"></i> </a>
                        </label>
                    </div>
                </fieldset>

            </div>
            <div class="col-lg-6">
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.chatoperator"  value="1" <g:if test="${user.userPermissionsDTO.chatoperator}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.chat" />
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.deletefeedback"  value="1" <g:if test="${user.userPermissionsDTO.deletefeedback}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span> <g:message code="setting.user.agents.permission.delete.feadback" />
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.moderation"  value="1" <g:if test="${user.userPermissionsDTO.moderation}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.moderation" />
                            <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.moderation.info" />" ><i class="fa fa-question-circle"></i> </a>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.translationcontent"  value="1" <g:if test="${user.userPermissionsDTO.translationcontent}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.translation" />
                            <a href="#" data-toggle="popover" title="<g:message code="setting.user.agents.permission.translation.info" />" ><i class="fa fa-question-circle"></i> </a>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div class="checkbox c-checkbox">
                        <label>
                            <input   name="userPermissionsDTO.viewstatistics"  value="1" <g:if test="${user.userPermissionsDTO.viewstatistics}">checked=""</g:if>  type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.user.agents.permission.stattistics" />
                        </label>
                    </div>
                </fieldset>

            </div>
        </div>
<br>

    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
    </div>
</g:form>