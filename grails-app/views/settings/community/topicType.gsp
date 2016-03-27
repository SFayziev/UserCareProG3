<g:applyLayout name="settingMain">
    <content tag="mainContent1">

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
                <th> <g:message code="setting.leftMenu.community.statuses.note" /> </th>
                <th><g:message code="setting.action"/></th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${topicTypes}" var="topicType">
                <tr id="topicType${topicType.id}" >
                    <td>${topicType.id}</td>
                    <td> <g:render template="/file/imageByType" model="${[imgid: "forumtype${topicType.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:topicType?.articleTypeDTO?.imgDTO]}" /> </td>
                    <td> ${topicType.articleTypeDTO.name}</td>
                    <td>
                        <div class="btn-group">
                        <g:link controller="community" action="topicStatus"  id="${topicType.forumid}" params="${[topictype:topicType.id]}"  class="btn btn-primary"> <i class="fa fa-pencil-square-o"></i></g:link>
                        </div>
                        <g:each in="${topicType?.typeStatusDTOList}" var="topicStatus">
                            <span class="rounded  label " style="background: ${topicStatus.articleStatusDTO?.color}" > ${topicStatus.articleStatusDTO.name}</span>

                        </g:each>
                        %{--<g:if test="${topicType.enable}"><g:message code="setting.status.type.1"/> </g:if><g:else><g:message code="setting.status.type.0"/> </g:else>--}%

                    </td>
                    <td>
                        <div class="btn-group">
                            <a class="btn btn-primary" href="#" onclick="changeTopicTypeImg(${topicType.id})" > <i class="fa fa-picture-o "></i> </a>
                            <a data-toggle="modal" href="/settings/community/edittopicType/${forum.id}/?topicType=${topicType.id}" data-target="#myModal"  id="topicType${topicType.id}" class="btn btn-info "><i class="fa fa-pencil-square-o"></i></a>
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
    </content>
</g:applyLayout>