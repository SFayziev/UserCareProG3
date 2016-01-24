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
        <li class="active"><g:link controller="community" action="control" > <g:message code="setting.leftMenu.community.control" /></g:link></li>
    </ol>

    <div class="tag-box tag-box-v6">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <p><g:message code="setting.knowledgebase.controle.inform"/></p>
    </div>
    <br><br><br>
    <g:render template="/settings/knowledgebase/knowledgebaseList"/>

</div>

</body>
</html>