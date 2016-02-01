<g:applyLayout name="settingMain">
    <content tag="mainContent1">

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="knowledgebase" ><g:message code="forum.type1" /></g:link> </li>
        <li class="active"><g:link controller="knowledgebase" action="tag" > <g:message code="setting.leftMenu.community.tags" /></g:link></li>
    </ol>


    <div class="panel-body">
        <div >
            <h4><g:message code="setting.community.tag.setup.title" /></h4>
            <a data-toggle="modal" href="/settings/knowledgebase/addNewTag/${forum.id}" data-target="#myModal"  class="btn-u btn-brd rounded btn-u-default btn-u-xs" ><i class="fa fa-plus"></i> <g:message code="default.button.add.label" />  </a>
            %{--<button class="btn-u btn-brd rounded btn-u-default btn-u-xs" type="button"><i class="fa fa-download"></i> <g:message code="setting.community.categoru.addnew" />  </button>--}%
        </div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th><g:message code="setting.leftMenu.community.tags"/></th>
                <th><g:message code="setting.action"/></th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${tags}" var="tag">
                <tr id="tag${tag.id}" >
                    <td> ${tag.name}</td>
                    <td>
                        <div class="btn-group">
                            <a data-toggle="modal" href="/settings/knowledgebase/edittag/${forum.id}/?tagid=${tag.id}" data-target="#myModal"  id="${tag.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
                            %{--<a class="btn btn-primary"  ><i class="fa  fa-globe"></i></a>--}%
                            <a class="btn btn-danger" data-toggle="modal" href="/settings/knowledgebase/deltag/${tag.id}" data-target="#myModal"  ><i class="fa fa-trash-o"></i></a>
                        </div>
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