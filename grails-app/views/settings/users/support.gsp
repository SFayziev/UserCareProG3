<g:applyLayout name="settingMain">
    <content tag="mainContent1">


<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="community" ><g:message code="setting.leftMenu.users" /></g:link> </li>
        <li class="active"><g:link controller="users" action="support" > <g:message code="setting.leftMenu.users.agents" /></g:link></li>
    </ol>


    <div class="panel-body">
        <div >
            <h4><g:message code="setting.user.agents.current.title" /> <a class="btn btn-default" data-toggle="modal" href="/settings/users/invitesupportuser/" data-target="#myModal"  ><i class="fa fa-plus"></i> <g:message code="default.button.add.label" /></a></h4>
        </div>

        <table class="table table-striped">
            <thead>
            <tr>

                <th><g:message code="setting.user.agents.status.title"/></th>
                <th><g:message code="setting.name"/></th>
                <th><g:message code="setting.email"/></th>
                %{--<th><g:message code="setting.user.agents.staff.position"/></th>--}%
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
<g:render template="/modal/myModal"/>

    </content>
</g:applyLayout>

