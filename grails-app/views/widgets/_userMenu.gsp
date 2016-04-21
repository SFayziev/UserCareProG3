<div class="module-body" data-moduleid="${module?.id}">
    <dl>
        <dt><g:message code="widget.usermenu.title" /></dt>
        <dd>
            <span class="badge pull-right">${user.articles}</span> <g:link controller="user" action="topics" id="${user.id}"><g:message code="widget.community.stats.topic" /></g:link>
        </dd>

        <dd>
            <span class="badge pull-right">${user.comments}</span>  <g:link controller="user" action="comments" id="${user.id}"> <g:message code="widget.community.stats.comment" /></g:link>
        </dd>
<sec:ifAllGranted roles='ROLE_MANAGER,ROLE_MANGEUSERS,ROLE_ASSIGNPERFORMERS'>
        <dd>
            <span class="badge pull-right">0</span>  <g:message code="user.profile.user.updates" />
        </dd>
        <dd>
            <span class="badge pull-right">0</span> <g:link controller="user" action="performer_topic" id="${user.id}"> <g:message code="user.profile.user.assigned.topic" /> </g:link>
        </dd>
</sec:ifAllGranted>
    </dl>
<sec:ifAllGranted roles='ROLE_MANAGER,ROLE_MANGEUSERS,ROLE_ASSIGNPERFORMERS'>
    <dl>
        <dt><g:message code="setting.action" /></dt>
        <dd>
            <i class="fa fa-asterisk"></i> <g:link controller="user" action="profile"><g:message code="user.profile.user.common.settings" /></g:link>
        </dd>

        <dd>
            <i class="fa fa-envelope"></i> <g:link controller="user" action="notification" id="${user.id}"><g:message code="user.profile.user.notifity.setup" /></g:link>
        </dd>


    </dl>
</sec:ifAllGranted>
</div>