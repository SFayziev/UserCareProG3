<g:applyLayout name="settingMain">
    <content tag="mainContent1">
<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="helpdesk" ><g:message code="forum.type0" /></g:link> </li>
        <li class="active"><g:link controller="helpdesk" action="control" > <g:message code="setting.leftMenu.community.control" /></g:link></li>
    </ol>

    <div class="tag-box tag-box-v6">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <p><g:message code="setting.knowledgebase.controle.inform"/></p>
    </div>
    <br><br><br>
    <g:render template="/settings/helpdesk/helpdeskList"/>

</div>


    </content>
</g:applyLayout>