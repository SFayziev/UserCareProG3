<li>
<a class="dropdown-toggle" data-toggle="dropdown" href="#">
    %{--<img src="${user?.fileDTO?.originalFilename}"  class="img-bordered  rounded-2x" style="height: 32px"/> ${user.username}--}%
        %{--<g:render template="/user/userImage" model="${[userDTO: userDTO]}" />--}%
        %{--<g:render template="/file/imageByType" model="${[imgid: "userid${userDTO?.id}", imgclass: "img-bordered  rounded-2x", iconclass: 'icon-sm', img:userDTO?.imgDTO]}" />--}%
    ${user?.username}
    <b class="caret"></b></a>

    <ul class="dropdown-menu pull-right" role="menu">
        <li ><g:link controller="user" action="profile"> <i class="fa fa-eye"></i> <g:message code="user.menu.profile" /></g:link></li>
        <li ><a href="#"><i class="fa fa-bullhorn"></i> <g:message code="user.menu.notification" /></a></li>
        <li class="divider"></li>
        <li ><g:link controller="index"><i class="fa fa-home"></i> <g:message code="user.menu.main" /> </g:link></li>

        <li ><g:link controller="project" action="settings"><i class="fa fa-cogs"></i> <g:message code="user.menu.settings" /> </g:link></li>
        <li ><g:link controller="articles"><i class="fa fa-user"></i> <g:message code="user.menu.operator" /> </g:link></li>
        <li ><g:link controller="settings"><i class="fa fa-money"></i> <g:message code="user.menu.payments" /> </g:link></li>
        <li class="divider"></li>
        <li ><a id="logout" href="/logout"><i class="fa fa-unlock"></i> <g:message code="user.logout" /></a></li>
    </ul>
</li>