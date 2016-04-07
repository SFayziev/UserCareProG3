<div class="row">
<div class="col-md-12">
    <div class="panel panel-sea margin-bottom-40">
        <div class="panel-heading">
            <h3 class="panel-title"><i class="fa fa-edit"></i><g:message code="setting.leftMenu.community" />
                <a class="btn btn-info" data-toggle="modal" href="/settings/helpdesk/add" data-target="#ucmodal" ><i class="fa fa-plus" ></i>  <g:message code="default.button.add.label"/></a>
            </h3>
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
                <td><g:render template="/file/imageByType" model="${[imgid: "forumlogo${forum.id}", imgclass: "img-responsive", iconclass: 'icon-sm', img:forum?.imgDTO]}" /></td>
                <td> ${forum.name}</td>
                <td> </td>
                <td>
                    <div class="btn-group">
                        <a class="btn btn-primary" href="#" onclick="changeForumImg(${forum.id})" > <g:message code="setting.change.logo"/></a>
                        <g:link controller="helpdesk" action="setting" id="${forum.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></g:link>
                        <a class="btn btn-danger" data-toggle="modal" href="/settings/helpdesk/delete/${forum.id}" data-target="#ucmodal"  ><i class="fa fa-trash-o"></i></a>
                    </div>
                </td>
            </tr>
            </g:each>
            </tbody>
        </table>
    </div>
</div>
</div>