<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="settingMain"/>
    <title></title>
</head>
<body>

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="community" ><g:message code="forum.type1" /></g:link> </li>
        <li class="active"><g:link controller="community" action="control" > <g:message code="setting.leftMenu.project.settings" /></g:link></li>
    </ol>

    <div class="panel-body">
        <g:form controller="knowledgebase" action="setting" id="${forum.id}" class="form-horizontal sky-form" role="form" data-toggle="validator" novalidate="novalidate" >
            <div class="form-group">
                <label  class="col-lg-4 control-label"></label>
                <div class="col-lg-8">
                    <h4><i class="fa fa-cog "></i> <g:message code="setting.leftMenu.project.settings" />: <span class="color-green">${forum.name}</span></h4>
                </div>

            </div>
            <div class="form-group">
                <label for="name" class="col-lg-4 control-label"><g:message code="setting.name" /></label>
                <div class="col-lg-8">
                    <label for="name" class="input input-file state-success">
                        <input  id="name" name="forum.name" required type="text" value="${forum?.name}">
                        <div class="help-block with-errors"></div>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="forum.langid" class="col-lg-4 control-label"><g:message code="setting.default.language" /></label>
                <div class="col-lg-8">
                    <label for="forum.langid" class="select state-success">
                        <g:select id="forum.langid" optionKey="id" value="${forum?.langid}"
                                  name="forum.langid"  optionValue="name" from="${activleLangs}" />
                        <i></i>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label  class="col-lg-4 control-label"><g:message code="setting.knowledgebase.voting" /></label>
                <div class="col-lg-8">
                    <label  class="select state-success">
                        <g:select name="forum.votetype" from="${['0', '1']}" value="${forum?.votetype}"
                                  valueMessagePrefix="community.voting.type" />
                        <i></i>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="sharingon" class="col-lg-4 control-label"><g:message code="setting.community.setting.sharing.panel" /></label>
                <div class="col-lg-8">
                    <label class="checkbox state-success"><input id ="sharingon" name="forum.sharingon"  value="1" <g:if test="${forum.sharingon}">checked=""</g:if> type="checkbox"><i></i><g:message code="setting.community.setting.sharing.panel.description"/></label>

                </div>
            </div>
            <div class="form-group">
                <label for="meta" class="col-lg-4 control-label"><g:message code="setting.community.setting.meta.description" /></label>
                <div class="col-lg-8">
                    <label for="meta" class="input input-file state-success">
                        <input  id="meta" name="forum.meta"  type="text" value="${forum?.meta}">
                        <div class="help-block with-errors"></div>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="defhelpdesk" class="col-lg-4 control-label"><g:message code="setting.community.setting.related.knowlage" /></label>
                <div class="col-lg-8">
                    <label for="defhelpdesk" class="select state-success">
                        <g:select id="defhelpdesk" optionKey="id" value="${forum?.defhelpdesk}"
                                  name="forum.defhelpdesk"  optionValue="name" from="${helpdesks}" />
                        <i></i>
                    </label>
                </div>
            </div>
            <footer>
                <div class="row"><g:render template="/layouts/errorMessage" /></div>
                <div class="col-lg-offset-4 col-lg-8 margin-bottom-10">
                    <button type="submit" name="submit" value="save" class="btn-u btn-u-green"><g:message code="button.save" /></button>
                </div>
            </footer>
        </g:form>

    </div>
</div>

</body>
</html>