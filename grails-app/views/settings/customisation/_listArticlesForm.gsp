<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.forumlist.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="setting.customize.forumlist.param.header" /></label>
                <div class="col-lg-7">

                    <input class="form-control" type="text" name="title" id="mtitle" value="${module.params?.title?.value}">
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="setting.customize.forumlist.filter.bar" /></label>
                <div class="col-lg-7">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select class="form-control" name="filtertype" from="${['hide', 'filterOnly', 'filterTab',  'filterUserStats',  'filterTabUserStats']}" value="${module.params?.filtertype?.value }"
                              valueMessagePrefix="setting.customize.forumlist.filter.type" />
                    <i></i>

                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="setting.customize.forumlist.topic.presentation" /></label>
                <div class="col-lg-7">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select class="form-control" name="topicPresentation" from="${['compact', 'medium', 'full']}" value="${module.params?.topicPresentation?.value }"
                              valueMessagePrefix="setting.customize.forumlist.topic.presentation.type" />
                 </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="order.type.title" /></label>
                <div class="col-lg-7">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select class="form-control" name="order" from="${['byupdatedate', 'bycreatedate', 'bycomment', 'top' , 'byupvotes','bydownvotes','byviews','byfollow' ]}" value="${module.params?.order?.value }"
                              valueMessagePrefix="order.type" />

                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="order.type.title" /></label>
                <div class="col-lg-7">
                    <g:select class="form-control" optionKey="id" value="${module.params?.type?.value }" noSelection="['-1':'-All-']"
                               name="type"  optionValue="alias" from="${forumTypes}" />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="setting.customize.forumlist.footer.mode" /></label>
                <div class="col-lg-7">
                    <g:select class="form-control" name="footerMode" from="${['hide', 'paginate', 'browseall' ]}" value="${module.params?.footerMode?.value }"
                              valueMessagePrefix="setting.customize.forumlist.footer.type" />
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
               <label class="col-lg-4 control-label"><g:message code="setting.customize.forumlist.maxRecods" type="number"  /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="maxRecords" value="${module.params?.maxRecords?.value}">
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
                <div class="col-lg-offset-4 col-lg-7">
                    <div class="checkbox c-checkbox">
                        <label>
                            <input  name="showTopicAvatar"  value="1" <g:if test="${module.params?.showTopicAvatar}">checked=""</g:if> type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.customize.forumlist.show.avatar"/>
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
            <button data-content="${params.id}" id="saveOkBut" type="submit"  class="btn btn-primary"><g:message code="default.button.update.label" /></button>
        </div>

    </form>
</div>

<script type="text/javascript">
    $(document).ready(function() { setAjaxModuleCustomisationSave(${module.id}); });
</script>
