<g:applyLayout name="settingMain">
    <content tag="mainContent1">

        <h3><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> /
            <g:link controller="community" action="control" > <g:message code="setting.leftMenu.community.control" /></g:link>
        </h3>

        <div class="panel panel-default">

            <div class="panel-body">
                <div class="alert alert-info fade in">
                    <g:message code="setting.community.controle.inform"/>
                </div>
            <g:render template="/settings/community/communityList"/>
            </div>
        </div>
    </content>
</g:applyLayout>