<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.forumlinks.title" /></h4>
</div>
<div class="modal-body">
    <table class="table table-bordered table-striped">
        <thead>
            <tr> <th> <g:message code="setting.customize.forumlinks.table1.title" /> </th>
                <th> <g:message code="setting.customize.forumlinks.table2.title" /> </th>
            </tr>
        </thead>
        <tbody>
        <g:each in="${links}" var="link">
        <tr id="widgetlink${link.id}"><th>${link.title} </th>
            <th>
                <div class="btn-group">
                    <a class="btn btn-primary"  onclick="widgetLinkImg(${module.id}, ${link.id})" > <i class="fa fa-picture-o "></i> </a>
                    <a class="btn btn-info " onclick="widgetLinkEdit(${module.id}, ${link.id}); return false; " ><i class="fa fa-pencil-square-o"></i></a>
                    <a class="btn btn-primary" onclick="widgetLinkMove(${module.id}, ${link.id}, 'up'); return false; "><i class="fa  fa-arrow-up"></i></a>
                    <a class="btn btn-primary" onclick="widgetLinkMove(${module.id} , ${link.id}, 'down'); return false; " ><i class="fa  fa-arrow-down"></i></a>
                    <a class="btn btn-danger" onclick="widgetLinkDelete(${module.id} , ${link.id}); return false; "   ><i class="fa fa-trash-o"></i></a>
                </div>

            </th>
        </tr>
        </g:each>
        </tbody>

    </table>

    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button onclick="widgetLinkEdit(${module.id}, 0 ); return false; "   class="btn btn-primary"><g:message code="setting.customize.forumlinks.add.new" /></button>
    </div>
</div>
