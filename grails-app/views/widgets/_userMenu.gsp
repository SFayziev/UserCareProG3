<div  id="userMenu" >
    <div class="headline">
        <h2><g:message code="widget.usermenu.title" /></h2>
    </div>


    <ul class="list-unstyled">
        <li>
            <span class="badge pull-right">${user.articles}</span> <g:link controller="user" action="topics" id="${user.id}"><g:message code="widget.community.stats.topic" /></g:link>
        </li>

        <li>
            <span class="badge pull-right">${user.comments}</span>  <g:link controller="user" action="topics" id="${user.id}"> <g:message code="widget.community.stats.commnet" /></g:link>
        </li>

        <li>
            <span class="badge pull-right">0</span>  <g:message code="user.profile.user.updates" />
        </li>
        <li>
            <span class="badge pull-right">0</span>  <g:message code="user.profile.user.assigned.topic" />
        </li>
    </ul>
    <div class="headline">
        <h2><g:message code="setting.action" /></h2>
    </div>

    <ul class="list-unstyled">
        <li>
            <i class="fa fa-asterisk"></i> <g:link controller="user" action="profile"><g:message code="user.profile.user.common.settings" /></g:link>
        </li>

        <li>
            <i class="fa fa-envelope"></i> <g:link controller="user" action="notification" id="${user.id}"><g:message code="user.profile.user.notifity.setup" /></g:link>
        </li>


    </ul>

</div>