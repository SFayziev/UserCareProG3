<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="users" ><g:message code="setting.leftMenu.users" /></g:link> /
            <g:link controller="users" action="support" > <g:message code="setting.leftMenu.users.agents" /></g:link>
        </h3>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4><g:message code="setting.user.agents.current.title" /> <a class="btn btn-default" data-toggle="modal" href="/settings/users/invitesupportuser/" data-target="#ucmodal"  ><i class="fa fa-plus"></i> <g:message code="default.button.add.label" /></a></h4>
            </div>
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th><g:message code="setting.user.agents.status.title"/></th>
                                <th><g:message code="setting.name"/></th>
                                <th><g:message code="setting.email"/></th>
                                <th><g:message code="setting.user.agents.manage.project"/></th>
                                <th><g:message code="setting.user.agents.helpdesk.support"/></th>
                                <th><g:message code="setting.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                        <g:each in="${users}" var="user">
                            <g:render template="/settings/users/supportList"  model="${[user:user]}" />
                        </g:each>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </content>
</g:applyLayout>