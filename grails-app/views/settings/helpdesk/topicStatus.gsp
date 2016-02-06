<g:applyLayout name="settingMain">
    <content tag="mainContent1">
<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="helpdesk" ><g:message code="forum.type0" /></g:link> </li>
        <li class="active"> <g:message code="setting.leftMenu.community.statuses" /></li>
    </ol>


    <div class="panel-body">
        <div >
            <h4><g:message code="setting.leftMenu.community.statuses" />
                <a data-toggle="modal" href="/settings/helpdesk/addForumStatus/${forum.id}" data-target="#myModal"  class="btn-u btn-brd rounded btn-u-default btn-u-xs" ><i class="fa fa-plus"></i> <g:message code="default.button.add.label" />  </a></h4>
            %{--<button class="btn-u btn-brd rounded btn-u-default btn-u-xs" type="button"><i class="fa fa-download"></i> <g:message code="setting.community.categoru.addnew" />  </button>--}%
        </div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th><g:message code="setting.name"/></th>
                <th><g:message code="setting.community.status.logical.group"/></th>
                <th><g:message code="article.type"/></th>
                <th><g:message code="setting.action"/></th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${forumStatuses}" var="forumStatus">
                <tr id="forumStatus${forumStatus.id}" >
                    <td>${forumStatus.articleStatusDTO.id}</td>
                    <td><span class="rounded  label " style="background: ${forumStatus.articleStatusDTO?.color}" > ${forumStatus.articleStatusDTO.name}</span></td>
                    <td><g:message code="setting.community.status.logical.group.type.${forumStatus.articleStatusDTO.logicalgroup}"/>  </td>
                    <td><g:message code="setting.community.status.type.${forumStatus.articleStatusDTO.atype}"/>  </td>
                    <td>
                        <g:if test="${forumStatus.articleStatusDTO.atype!=0}">
                            <div class="btn-group">
                                <a data-toggle="modal" href="/settings/helpdesk/editforumstatus/${forum.id}/?forumStatus=${forumStatus.id}" data-target="#myModal"  id="${forumStatus.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
                                <a class="btn btn-primary" onclick="statusMove(${forumStatus.id} , 'up'); return false; "><i class="fa  fa-arrow-up"></i></a>
                                <a class="btn btn-primary" onclick="statusMove(${forumStatus.id}, 'down'); return false; " ><i class="fa  fa-arrow-down"></i></a>
                                <a class="btn btn-danger" data-toggle="modal" href="/settings/helpdesk/delforumstatus/${forumStatus.id}" data-target="#myModal"  ><i class="fa fa-trash-o"></i></a>
                            </div>
                        </g:if>
                    </td>
                </tr>
            </g:each>
            </tbody>
        </table>
    </div>
</div>

<g:render template="/modal/myModal"/>
<g:render template="/modal/translationForm"/>
    </content>
</g:applyLayout>