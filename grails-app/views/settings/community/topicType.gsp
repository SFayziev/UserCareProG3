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
        <li class="active"><g:link controller="community" action="control" > <g:message code="setting.leftMenu.community.types" /></g:link></li>
    </ol>


    <div class="panel-body">
        <div >
            <a data-toggle="modal" href="/settings/community/edittopicType/${forum.id}" data-target="#myModal"  class="btn-u btn-brd rounded btn-u-default btn-u-xs" ><i class="fa fa-plus"></i> <g:message code="setting.community.topic.type.addnew" />  </a>
            %{--<button class="btn-u btn-brd rounded btn-u-default btn-u-xs" type="button"><i class="fa fa-download"></i> <g:message code="setting.community.categoru.addnew" />  </button>--}%
        </div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th><g:message code="setting.logo"/></th>
                <th><g:message code="setting.name"/></th>
                <th><g:message code="setting.status.title"/></th>
                <th><g:message code="setting.action"/></th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${topicTypes}" var="topicType">
                <tr id="topicType${topicType.id}" >
                    <td>${topicType.id}</td>
                    <td> <g:render template="/article/imageByType" model="${[imgid: "forumtype${topicType.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:topicType?.articleTypeDTO?.imgDTO]}" /> </td>
                    <td> ${topicType.articleTypeDTO.name}</td>
                    <td> <g:if test="${topicType.enable}"><g:message code="setting.status.type.1"/> </g:if><g:else><g:message code="setting.status.type.0"/> </g:else>  </td>
                    <td>
                        <div class="btn-group">
                            <a class="btn btn-primary" href="#" onclick="changeTopicTypeImg(${topicType.id})" > <g:message code="setting.change.logo"/></a>
                            <a data-toggle="modal" href="/settings/community/edittopicType/${forum.id}/?topicType=${topicType.id}" data-target="#myModal"  id="topicType${topicType.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
                            <a class="btn btn-primary" onclick="topicTypeUP(${forum.id}, ${topicType.id}); return false; "><i class="fa  fa-arrow-up"></i></a>
                            <a class="btn btn-primary" onclick="topicTypeDOWN(${forum.id} , ${topicType.id}); return false; " ><i class="fa  fa-arrow-down"></i></a>
                            <a class="btn btn-danger" data-toggle="modal" href="/settings/community/deleteforumType/${topicType.id}" data-target="#myModal"  ><i class="fa fa-trash-o"></i></a>
                        </div>
                    </td>
                </tr>
            </g:each>
            </tbody>
        </table>
    </div>
</div>
<g:render template="/modal/imageSelector"/>
<g:render template="/modal/myModal"/>
<g:render template="/modal/translationForm"/>
</body>
</html>