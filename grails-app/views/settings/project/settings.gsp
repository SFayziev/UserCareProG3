<g:applyLayout name="settingMain">
    <content tag="mainContent1">

        <h3><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> /
            <g:link controller="settings" > <g:message code="setting.leftMenu.project.settings" /></g:link>
        </h3>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3><i class="fa fa-cog "></i> <g:message code="setting.project.settings.title" /></h3>
            </div>
            <g:form controller="project" action="settings" class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >
                <div class="panel-body">
                    <fieldset>
                        <div class="form-group">
                        <label for="name" class="col-lg-3 control-label"><g:message code="setting.project.settings.name" /></label>
                        <div class="col-lg-7">
                            <input  id="name" class="form-control" name="project.name" required type="text" value="${UCproject?.name}">
                            <div class="help-block with-errors"></div>
                        </div>
                    </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label for="defaultforum" class="col-lg-3 control-label"><g:message code="setting.project.settings.default.forum" /></label>
                            <div class="col-lg-7">
                                <g:select  class="form-control m-b" id="defaultforum" optionKey="id" value="${UCproject?.defaultforum}"
                                          name="project.defaultforum"  optionValue="name" from="${forums}" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label  class="col-lg-3 control-label"><g:message code="setting.project.settings.alias" /></label>
                            <div class="col-lg-7">
                                <div class="input-group m-b">
                                    <input readonly="" class="form-control"   name="project.alias" value="${UCproject?.alias}" type="text">
                                    <span class="input-group-addon">.${domainUrl}</span>
                                 </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label for="project.url"  class="col-lg-3 control-label"><g:message code="setting.project.settings.yoursite.url" /></label>
                            <div class="col-lg-7">
                                <input class="form-control" id="project.url" name="project.url" required type="text" value="${UCproject?.url}">
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                     </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label for="project.url"  class="col-lg-3 control-label"><g:message code="setting.project.settings.layout.mode.title" /></label>
                            <div class="col-lg-7">
                                <g:select class="form-control" name="project.layout.mode" from="${['0', '1' ]}" value="${UCproject.projectDesignDTO.layoutmode}"
                                          valueMessagePrefix="setting.project.settings.layout.mode" />
                                <div class="note"><g:message code="setting.project.settings.layout.mode.note"/> </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div class="form-group">
                            <label  class="col-lg-3 control-label"><g:message code="forum.languages" /></label>
                            <div class="col-lg-7">
                                <g:each in="${langs}" var="lang">
                                    <div class="checkbox c-checkbox">
                                        <label> <input name="langs" value="${lang.id}" <g:if test="${lang.status}">checked=""</g:if> type="checkbox">
                                        <span class="fa fa-check"></span> ${lang.name}</label>
                                    </div>
                                </g:each>
                            </div>
                        </div>
                     </fieldset>
                    <div class="row"><g:render template="/layouts/errorMessage" /></div>
                </div>
                <div class="panel-footer text-center">
                    <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                    <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                </div>
            </g:form>
        </div>
    </content>
</g:applyLayout>

