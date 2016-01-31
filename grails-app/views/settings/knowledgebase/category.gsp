<g:applyLayout name="settingMain">
    <content tag="mainContent1">

<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="knowledgebase" ><g:message code="forum.type1" /></g:link> </li>
        <li class="active"><g:link controller="knowledgebase" action="control" > <g:message code="setting.leftMenu.community.categories" /></g:link></li>
    </ol>

    <div class="panel-body">
        <div >
            <a data-toggle="modal" href="/settings/knowledgebase/addNewCategory/${forum.id}" data-target="#myModal"  class="btn-u btn-brd rounded btn-u-default btn-u-xs" ><i class="fa fa-plus"></i> <g:message code="setting.community.category.addnew" />  </a>
            %{--<button class="btn-u btn-brd rounded btn-u-default btn-u-xs" type="button"><i class="fa fa-download"></i> <g:message code="setting.community.categoru.addnew" />  </button>--}%
        </div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th><g:message code="setting.logo"/></th>
                <th><g:message code="setting.name"/></th>
                <th><g:message code="setting.action"/></th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${categories}" var="category">
                <tr id="category${category.id}" >
                    <td>${category.id}</td>
                    <td> <g:render template="/article/imageByType" model="${[imgid: "forumlogo${category.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:category?.imgDTO]}" /> </td>
                    <td> ${category.name}</td>
                    <td>
                        <div class="btn-group">
                            <a class="btn btn-primary" href="#" onclick="changeCategoryImg(${category.id})" > <g:message code="setting.change.logo"/></a>
                            <a data-toggle="modal" href="/settings/knowledgebase/editCategory/${forum.id}/?catid=${category.id}" data-target="#myModal"  id="${category.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
                            <a class="btn btn-primary" onclick="categoryUP(${category.id}); return false; "><i class="fa  fa-arrow-up"></i></a>
                            <a class="btn btn-primary" onclick="categoryDOWN(${category.id}); return false; " ><i class="fa  fa-arrow-down"></i></a>
                            <a class="btn btn-danger" data-toggle="modal" href="/settings/knowledgebase/delete/${category.id}" data-target="#myModal"  ><i class="fa fa-trash-o"></i></a>
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