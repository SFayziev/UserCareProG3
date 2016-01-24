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
        <li><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> </li>
        <li class="active"><g:link controller="settings" > <g:message code="setting.leftMenu.project.design" /></g:link></li>
    </ol>
    <div class="headline"><h2><g:message code="setting.project.design.title" /></h2></div>


</div>

</body>
</html>