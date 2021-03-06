<h3 class="panel-title"><i class="fa fa-edit"></i><g:message code="setting.leftMenu.community" />
    <a class="btn btn-primary" data-toggle="modal" href="/settings/community/add" data-target="#ucmodal" ><i class="fa fa-plus" ></i>  <g:message code="default.button.add.label"/></a>
</h3>
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
        <td> <g:render template="/file/imageByType" model="${[imgid: "forumlogo${forum.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:forum?.imgDTO]}" /> </td>
        <td> ${forum.name}</td>
        <td>
            <g:if test="${forum.privacy.type==1}"><g:message code="setting.community.privacy.mode.private" /></g:if>
            <g:else><g:message code="setting.community.privacy.mode.public" /></g:else>
        </td>
        <td>
            <div class="btn-group">
                 <a class="btn btn-primary" href="#" onclick="changeForumImg(${forum.id})" > <g:message code="setting.change.logo"/></a>
                <g:link controller="community" action="setting" id="${forum.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></g:link>
                <a class="btn btn-danger" data-toggle="modal" href="/settings/community/delete/${forum.id}" data-target="#ucmodal"  ><i class="fa fa-trash-o"></i></a>
            </div>
        </td>
    </tr>
    </g:each>
    </tbody>
</table>
