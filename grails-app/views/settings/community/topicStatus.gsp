<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="settingMain"/>
    <title></title>
</head>
<body>

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> </li>
        <li class="active"> <g:message code="setting.leftMenu.community.statuses" /></li>
    </ol>


    <div class="panel-body">
        <div >
            <h4><g:message code="setting.leftMenu.community.statuses" />  <a data-toggle="modal" href="/settings/community/editTopicStatus/${forum.id}" data-target="#myModal"  class="btn-u btn-brd rounded btn-u-default btn-u-xs" ><i class="fa fa-plus"></i> <g:message code="default.button.add.label" />  </a></h4>
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
            <g:each in="${topicStatuses}" var="topicStatus">
                <tr id="topicStatus${topicStatus.id}" >
                    <td>${topicStatus.id}</td>
                    <td><span class="rounded  label " style="background: ${topicStatus?.color}" > ${topicStatus.name}</span></td>
                    <td><g:message code="setting.community.status.logical.group.type.${topicStatus.logicalgroup}"/>  </td>
                    <td><g:message code="setting.community.status.type.${topicStatus.atype}"/>  </td>
                    <td>
                        <g:if test="${topicStatus.atype!=0}">
                        <div class="btn-group">
                            <a data-toggle="modal" href="/settings/community/editTopicStatus/${forum.id}/?topicStatus=${topicStatus.id}" data-target="#myModal"  id="topicStatus${topicStatus.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
                            <a class="btn btn-danger" data-toggle="modal" href="/settings/community/deltopicstatus/${topicStatus.id}" data-target="#myModal"  ><i class="fa fa-trash-o"></i></a>
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
</body>
</html>