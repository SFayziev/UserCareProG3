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
        <li><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> </li>
        <li class="active"><g:link controller="community" action="control" > <g:message code="setting.leftMenu.community.control" /></g:link></li>
    </ol>

    <div class="tag-box tag-box-v6">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <p><g:message code="setting.community.controle.inform"/></p>
    </div>
    <br><br><br>
    <g:render template="/settings/community/communityList"/>

</div>

<div id="imageSelector"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            Loading ...
        </div><!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<div id="myModal"  class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            Loading ...
        </div><!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

</body>
</html>