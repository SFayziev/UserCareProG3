<g:applyLayout name="settingMain">
    <content tag="mainContent1">

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> </li>
        <li class="active"><g:link controller="settings" > <g:message code="setting.leftMenu.project.settings" /></g:link></li>
    </ol>

    <div class="panel-body">
        <g:form controller="project" action="settings" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
            <div class="form-group">
                <label  class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <h4><i class="fa fa-cog "></i> <g:message code="setting.project.settings.title" /></h4>
                </div>

            </div>
            <div class="form-group">
                <label for="name" class="col-lg-4 control-label"><g:message code="setting.project.settings.name" /></label>
                <div class="col-lg-8">
                    <label for="name" class="input input-file state-success">
                        <input  id="name" name="project.name" required type="text" value="${project?.name}">
                        <div class="help-block with-errors"></div>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="defaultforum" class="col-lg-4 control-label"><g:message code="setting.project.settings.default.forum" /></label>
                <div class="col-lg-8">
                    <label for="alias" class="select state-success">
                        <g:select id="defaultforum" optionKey="id" value="${project?.defaultforum}"
                                  name="project.defaultforum"  optionValue="name" from="${forums}" />
                        <i></i>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label  class="col-lg-4 control-label"><g:message code="setting.project.settings.alias" /></label>
                <div class="col-lg-8">
                    <label for="alias" class="input input-file state-success">
                        <div class="button"><input id="alias"  disabled type="text">.${domainUrl}</div>
                        <input readonly=""  name="project.alias" value="${project?.alias}" type="text">
                    </label>

                </div>
            </div>

            <div class="form-group">
                <label for="project.url"  class="col-lg-4 control-label"><g:message code="setting.project.settings.yoursite.url" /></label>
                <div class="col-lg-8">
                    <label for="alias" class="input input-file state-success">
                        <input  id="project.url" name="project.url" required type="text" value="${project?.url}">

                        <div class="help-block with-errors"></div>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="project.lang" class="col-lg-4 control-label"><g:message code="forum.languages" /></label>
                <div class="col-lg-8">
                    <label for="alias" class="input input-file state-success">
                        <section id="project.lang" class="col">
                            <g:each in="${langs}" var="lang">
                                <label class="toggle"><input name="langs"  value="${lang.id}" <g:if test="${lang.status}">checked=""</g:if> type="checkbox"><i></i>${lang.name}</label>
                            </g:each>
                        </section>
                    </label>
                </div>
            </div>
            <footer>
                <div class="row"><g:render template="/layouts/errorMessage" /></div>
                <div class="col-lg-offset-6 col-lg-6 margin-bottom-10">
                    <button type="submit" name="submit" value="save" class="btn-u btn-u-green"><g:message code="button.save" /></button>

                </div>

            </footer>
        </g:form>

    </div>
</div>


    </content>
</g:applyLayout>

