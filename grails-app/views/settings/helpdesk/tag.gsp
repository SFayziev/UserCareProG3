<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="helpdesk" ><g:message code="forum.type0" /></g:link> /
        <g:link controller="helpdesk" action="tag" > <g:message code="setting.leftMenu.community.tags" /></g:link>
        </h3>


        <div class="row">
            <div class="col-sm-8">
                <div class="panel panel-default">
                    <g:form controller="helpdesk" action="tag"  id="${params.id}" class="sky-form" style="border: none;" >

                        <div class="panel-body">

                             <fieldset>
                                <div class="form-group">
                                <label class="col-lg-3 control-label"> <g:message code="setting.community.tag.assigne.title" /></label>
                                    <div class="col-lg-7">
                                        <g:select class="form-control"  name="assigntag" from="${['0', '1' ]}" value="${forum?.privacy?.assigntag }"
                                                  valueMessagePrefix="setting.community.tag.assigne.type" />
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

        <div class="panel panel-default">
            <div class="panel-body">
                <div >
                    <h4><g:message code="setting.community.tag.setup.title" /></h4>
                    <a data-toggle="modal" href="/settings/helpdesk/addNewTag/${forum.id}" data-target="#ucmodal"  class="btn-u btn-brd rounded btn-u-default btn-u-xs" ><i class="fa fa-plus"></i> <g:message code="default.button.add.label" />  </a>
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
                                    <a data-toggle="modal" href="/settings/helpdesk/edittag/${forum.id}/?tagid=${tag.id}" data-target="#ucmodal"  id="${tag.id}" class="btn btn-info "><i class="fa fa-pencil"></i> <g:message code="default.button.edit.label"/></a>
                                    %{--<a class="btn btn-primary"  ><i class="fa  fa-globe"></i></a>--}%
                                    <a class="btn btn-danger" data-toggle="modal" href="/settings/helpdesk/deltag/${tag.id}" data-target="#ucmodal"  ><i class="fa fa-trash-o"></i></a>
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