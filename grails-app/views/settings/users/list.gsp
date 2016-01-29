<g:applyLayout name="settingMain">
    <content tag="mainContent1">


<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="community" ><g:message code="setting.leftMenu.users" /></g:link> </li>
        <li class="active"><g:link controller="users" action="list" > <g:message code="setting.leftMenu.users" /></g:link></li>
    </ol>


    <div class="panel-body">
        <form class="form-inline" role="form">
            <div class="form-group">
                <input type="text" class="form-control" name="email" placeholder="Enter email" value="${params.email}">
            </div>
            <div class="form-group">

                <input type="text" class="form-control" name="uname" id="username" placeholder="name" value="${params.uname}">
            </div>
            <button type="submit" class="btn-u btn-u-default"><i class="fa fa-search"></i> Search</button>
        </form>

        <table class="table table-striped">
            <thead>
            <tr>

                <th></th>
                <th><g:message code="setting.name"/></th>
                <th><g:message code="setting.email"/></th>
                <th><g:message code="setting.user.registered"/></th>
                <th><g:message code="setting.user.last.login"/></th>
                <th><g:message code="setting.user.rating"/></th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${users}" var="user">
                <tr class="active" id="user${user.id}" >
                    <td>   <g:render template="/article/userImage" model="${[userDTO: user]}" />  </td>
                    <td><g:link controller="user" action="profile" id="${user.id}">${user.name}</g:link>    </td>
                    <td>${user.email} </td>
                    %{--<td>${user.position} </td>--}%
                    <td><g:formatDate format="yyyy-MM-dd" date="${user.regdate}"/>  </td>
                    <td><g:formatDate format="yyyy-MM-dd" date="${user.lastlogin}"/> </td>
                    <td><i class="fa fa-star"></i> <g:formatNumber number="${user.raitings}" format="#.00"></g:formatNumber>  </td>
                </tr>

            </g:each>
            </tbody>
        </table>
    </div>
</div>
<g:render template="/modal/myModal"/>

    </content>
</g:applyLayout>

