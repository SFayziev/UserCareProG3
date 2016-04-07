<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> /
            <g:link controller="community" action="control" > <g:message code="setting.leftMenu.project.settings" /></g:link>
        </h3>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h4><i class="fa fa-cog "></i> <g:message code="setting.leftMenu.project.settings" />: <span class="color-green">${forum.name}</span> </h4>
            </div>
            <g:form controller="community" action="setting" id="${forum.id}" class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >

        <div class="panel-body">


            <fieldset>
                <div class="form-group">
                    <label for="name" class="col-lg-3 control-label"><g:message code="setting.name" /></label>
                    <div class="col-lg-7">
                        <div class="input-group m-b">
                            <span class="input-group-btn">
                                <button type="button" onclick="translationModal('forum.title', ${forum?.id});" class="btn btn-default"><i class="icon-append fa fa-globe" ></i></button>
                            </span>
                            <input class="form-control"  id="name" name="forum.name" required type="text" value="${forum?.name}">
                        </div>
                        <div class="note"><g:message code="setting.community.forum.name.info"/> </div>
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="forum.langid" class="col-lg-3 control-label"><g:message code="setting.default.language" /></label>
                    <div class="col-lg-7">
                        <g:select class="form-control" id="forum.langid" optionKey="id" value="${forum?.langid}"
                                  name="forum.langid"  optionValue="name" from="${activleLangs}" />
                        <div class="note"><g:message code="setting.default.language.note"/> </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label  class="col-lg-3 control-label"><g:message code="setting.voting" /></label>
                    <div class="col-lg-7">
                        <g:select class="form-control" name="forum.votetype" from="${['0', '2', '3']}" value="${forum?.votetype}"
                                  valueMessagePrefix="community.voting.type" />
                        <div class="note"><g:message code="setting.voting.note"/> </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="forum.votelimit"  class="col-lg-3 control-label"><g:message code="setting.community.setting.vote.limit" /></label>
                    <div class="col-lg-7">
                        <input class="form-control" id="forum.votelimit" name="forum.votelimit" required type="text" value="${forum?.votelimit}">
                        <div class="note"><g:message code="setting.community.setting.vote.limit.note"/> </div>
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="forum.votetopiclimit" class="col-lg-3 control-label"><g:message code="setting.community.setting.vote.topic.limit" /></label>
                    <div class="col-lg-7">
                        <g:select class="form-control" name="forum.votetopiclimit" from="${1..9}" value=""/>
                        <div class="note"><g:message code="setting.community.setting.vote.topic.limit.note"/> </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="satisfactionon" class="col-lg-3 control-label"><g:message code="setting.community.setting.satisfaction.rating" /></label>
                    <div class="col-lg-7">
                        <div class="checkbox c-checkbox">
                            <label>
                                <input id ="satisfactionon" name="forum.satisfactionon"  value="1" <g:if test="${forum.satisfactionon}">checked=""</g:if>  type="checkbox">
                                <span class="fa fa-check"></span><g:message code="setting.community.setting.satisfaction.rating.description"/>
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="sharingon" class="col-lg-3 control-label"><g:message code="setting.community.setting.sharing.panel" /></label>
                    <div class="col-lg-7">
                        <div class="checkbox c-checkbox">
                            <label>
                                <input id ="sharingon" name="forum.sharingon"  value="1" <g:if test="${forum.sharingon}">checked=""</g:if> type="checkbox">
                                <span class="fa fa-check"></span> <g:message code="setting.community.setting.sharing.panel.description"/>
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="meta" class="col-lg-3 control-label"><g:message code="setting.community.setting.meta.description" /></label>
                    <div class="col-lg-7">
                        <input class="form-control" id="meta" name="forum.meta"  type="text" value="${forum?.meta}">
                        <div class="note"><g:message code="setting.community.setting.meta.description.note"/> </div>
                        <div class="help-block with-errors"></div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="defkhowlagebase" class="col-lg-3 control-label"><g:message code="setting.community.setting.related.knowlage" /></label>
                    <div class="col-lg-7">
                        <g:select class="form-control" id="defkhowlagebase" optionKey="id" value="${forum?.defkhowlagebase}"
                                  name="forum.defkhowlagebase"  optionValue="name" from="${knowledgebases}" />
                        <div class="note"><g:message code="setting.community.setting.related.knowlage.note"/> </div>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div class="form-group">
                    <label for="defhelpdesk" class="col-lg-3 control-label"><g:message code="setting.community.setting.related.helpdesk" /></label>
                    <div class="col-lg-7">
                        <g:select class="form-control" id="defhelpdesk" optionKey="id" value="${forum?.defhelpdesk}"
                                  name="forum.defhelpdesk"  optionValue="name" from="${helpdesks}" />
                        <div class="note"><g:message code="setting.community.setting.related.helpdesk.note"/> </div>
                    </div>
                </div>
            </fieldset>
                </div>
                <div class="panel-footer text-center">
                    <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                    <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                </div>
            </g:form>

        </div>

    </content>
</g:applyLayout>