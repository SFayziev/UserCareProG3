<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="community" ><g:message code="setting.leftMenu.community" /></g:link> /
            <g:link controller="community" action="control" > <g:message code="setting.leftMenu.community.categories" /></g:link>
        </h3>

        <div class="row">
            <div class="col-sm-8">

                <div class="panel panel-default">
            <g:form controller="community" action="category"  id="${params.id}"  >
                <div class="panel-body">

                    <fieldset>
                        <div class="form-group">
                            <label class="col-lg-4 control-label"><g:message code="setting.community.category.assigne.mode.text" /></label>
                            <div class="col-lg-8">
                                <g:select  class="form-control" name="assigntype" from="${['0', '1' ,'2']}" value="${forum?.privacy?.assigntype }"
                                      valueMessagePrefix="setting.community.category.assigne.mode" />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="panel-footer text-center">
                    <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                </div>
            </g:form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">

                <div class="panel panel-default">
            <div class="panel-body">
                <div  >
                    <a data-toggle="modal" href="/settings/community/addNewCategory/${forum.id}" data-target="#ucmodal"  class="btn-u btn-brd rounded btn-u-default btn-u-xs" ><i class="fa fa-plus"></i> <g:message code="setting.community.category.addnew" />  </a>
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
                            <td> <g:render template="/file/imageByType" model="${[imgid: "forumlogo${category.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:category?.imgDTO]}" /> </td>
                            <td> ${category.name}</td>
                            <td>
                                <div class="btn-group">
                                    <a class="btn btn-primary" href="#" onclick="changeCategoryImg(${category.id})" > <g:message code="setting.change.logo"/></a>
                                    <a data-toggle="modal" href="/settings/community/editCategory/${forum.id}/?catid=${category.id}" data-target="#ucmodal"  id="${category.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
                                    <a class="btn btn-primary" onclick="categoryUP(${category.id}); return false; "><i class="fa  fa-arrow-up"></i></a>
                                    <a class="btn btn-primary" onclick="categoryDOWN(${category.id}); return false; " ><i class="fa  fa-arrow-down"></i></a>
                                    <a class="btn btn-danger" data-toggle="modal" href="/settings/community/delcategory/${category.id}" data-target="#ucmodal"  ><i class="fa fa-trash-o"></i></a>
                                </div>
                            </td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
        </div>
            </div>
        </div>
    </content>
</g:applyLayout>