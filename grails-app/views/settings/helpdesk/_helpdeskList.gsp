<div class="row">
<div class="col-md-12">
    <div class="panel panel-sea margin-bottom-40">
        <div class="panel-heading">
            <h3 class="panel-title"><i class="fa fa-edit"></i><g:message code="setting.leftMenu.community" /> </h3>
        </div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th><g:message code="setting.logo"/></th>
                <th><g:message code="setting.name"/></th>
                <th><g:message code="setting.leftMenu.community.privacy"/></th>
                <th><g:message code="setting.action"/></th>

            </tr>
            </thead>
            <tbody>
            <g:each in="${forums}" var="forum">
            <tr>
                <td>${forum.id}</td>
                <td><g:render template="/article/imageByType" model="${[imgid: "forumlogo${forum.id}", imgclass: "img-responsive", iconclass: 'icon-sm', img:forum?.imgDTO]}" /></td>
                <td> ${forum.name}</td>
                <td> </td>
                <td><g:link controller="helpdesk" action="setting" id="${forum.id}" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></g:link>
                    </td>
            </tr>
            </g:each>
            </tbody>
        </table>
    </div>
</div>
</div>