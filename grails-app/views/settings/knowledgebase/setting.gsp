<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="knowledgebase" ><g:message code="forum.type1" /></g:link> /
        <g:link controller="community" action="control" > <g:message code="setting.leftMenu.project.settings" /></g:link>
        </h3>

        <div class="panel panel-default">

            <div class="panel-heading">
                <h4><i class="fa fa-cog "></i> <g:message code="setting.leftMenu.project.settings" />: <span class="color-green">${forum.name}</span></h4>
            </div>
            <g:form controller="knowledgebase" action="setting" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
                <div class="panel-body">
                    <div class="form-group">
                        <label for="name" class="col-lg-4 control-label"><g:message code="setting.name" /></label>
                        <div class="col-lg-8">
                            <input class="form-control" id="name" name="forum.name" required type="text" value="${forum?.name}">
                            <div class="help-block with-errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="forum.langid" class="col-lg-4 control-label"><g:message code="setting.default.language" /></label>
                        <div class="col-lg-8">
                            <g:select class="form-control" id="forum.langid" optionKey="id" value="${forum?.langid}"
                                      name="forum.langid"  optionValue="name" from="${activleLangs}" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label  class="col-lg-4 control-label"><g:message code="setting.knowledgebase.voting" /></label>
                        <div class="col-lg-8">
                            <g:select class="form-control" name="forum.votetype" from="${['0', '1']}" value="${forum?.votetype}"
                                      valueMessagePrefix="community.voting.type" />
                        </div>
                    </div>



                    <div class="form-group">
                        <label for="sharingon" class="col-lg-4 control-label"><g:message code="setting.community.setting.sharing.panel" /></label>
                        <div class="col-lg-8">
                            <div class="checkbox c-checkbox">
                                <label>
                                    <input class="form-control" id ="sharingon" name="forum.sharingon"  value="1" <g:if test="${forum.sharingon}">checked=""</g:if> type="checkbox">
                                    <span class="fa fa-check"></span> <g:message code="setting.community.setting.sharing.panel.description"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="meta" class="col-lg-4 control-label"><g:message code="setting.community.setting.meta.description" /></label>
                        <div class="col-lg-8">
                            <input  class="form-control" id="meta" name="forum.meta"  type="text" value="${forum?.meta}">
                            <div class="help-block with-errors"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="defhelpdesk" class="col-lg-4 control-label"><g:message code="setting.community.setting.related.helpdesk" /></label>
                        <div class="col-lg-8">
                            <g:select class="form-control" id="defhelpdesk" optionKey="id" value="${forum?.defhelpdesk}"
                                      name="forum.defhelpdesk"  optionValue="name" from="${helpdesks}" />
                        </div>
                    </div>
                </div>
                <div class="panel-footer text-center">
                    <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                    <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                </div>
            </g:form>
        </div>


    </content>
</g:applyLayout>
