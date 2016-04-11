<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="helpdesk" ><g:message code="forum.type0" /></g:link> /
        <g:link controller="helpdesk" action="setting" > <g:message code="setting.leftMenu.project.settings" /></g:link>
        </h3>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h4><i class="fa fa-cog "></i> <g:message code="setting.leftMenu.project.settings" />: <span class="color-green">${forum.name}</span></h4>
            </div>
            <g:form controller="helpdesk" action="setting" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >

                <div class="panel-body">

                    <div class="form-group">
                        <label for="name" class="col-lg-4 control-label"><g:message code="setting.name" /></label>
                        <div class="col-lg-7">
                            <input  class="form-control" id="name" name="forum.name" required type="text" value="${forum?.name}">
                            <div class="help-block with-errors"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="satisfactionon" class="col-lg-4 control-label"><g:message code="setting.community.setting.satisfaction.rating" /></label>
                        <div class="col-lg-7">
                            <div class="checkbox c-checkbox">
                                <label>
                                    <input class="form-control" id ="satisfactionon" name="forum.satisfactionon"  value="1" <g:if test="${forum.satisfactionon}">checked=""</g:if>  type="checkbox">
                                    <span class="fa fa-check"></span> <g:message code="setting.community.setting.satisfaction.rating.description"/>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="forum.langid" class="col-lg-4 control-label"><g:message code="setting.default.language" /></label>
                        <div class="col-lg-7">
                            <g:select class="form-control" id="forum.langid" optionKey="id" value="${forum?.langid}"
                                      name="forum.langid"  optionValue="name" from="${activleLangs}" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="defkhowlagebase" class="col-lg-4 control-label"><g:message code="setting.community.setting.related.knowlage" /></label>
                        <div class="col-lg-7">
                            <g:select class="form-control" id="defkhowlagebase" optionKey="id" value="${forum?.defkhowlagebase}"
                                      name="forum.defkhowlagebase"  optionValue="name" from="${knowledgebases}" />
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