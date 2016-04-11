<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="helpdesk" ><g:message code="forum.type0" /></g:link> /
        <g:link controller="helpdesk" action="control"> <g:message code="setting.leftMenu.community.control" /></g:link>
        </h3>

        <div class="panel panel-default">
            <div class="panel-body">
                <div class="alert alert-info fade in">
                    <g:message code="setting.knowledgebase.controle.inform"/>
                </div>
                <br>
                <g:render template="/settings/helpdesk/helpdeskList"/>
            </div>
        </div>

    </content>
</g:applyLayout>