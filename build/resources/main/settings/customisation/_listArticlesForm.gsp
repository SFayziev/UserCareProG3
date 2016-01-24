<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.forumlist.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="sky-form" >
        <fieldset>
            <section>
                <label class="label"><g:message code="setting.customize.forumlist.param.header" /></label>
                <label class="input state-success">

                    <input type="text" name="title" id="mtitle" value="${module.params?.title?.value}">
                </label>
            </section>
            <section>
                <label class="label"><g:message code="setting.customize.forumlist.filter.bar" /></label>
                <label class="select state-success">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select name="filtertype" from="${['hide', 'filterOnly', 'filterTab',  'filterUserStats',  'filterTabUserStats']}" value="${module.params?.filtertype?.value }"
                              valueMessagePrefix="setting.customize.forumlist.filter.type" />
                    <i></i>

                </label>
            </section>

            <section>
                <label class="label"><g:message code="setting.customize.forumlist.topic.presentation" /></label>
                <label class="select state-success">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select name="topicPresentation" from="${['compact', 'medium', 'full']}" value="${module.params?.topicPresentation?.value }"
                              valueMessagePrefix="setting.customize.forumlist.topic.presentation.type" />
                    <i></i>

                </label>
            </section>
            <section>
                <label class="label"><g:message code="order.type.title" /></label>
                <label class="select state-success">
                    %{--<label for="firstreplystatus" class="select state-success">--}%
                    <g:select name="order" from="${['byupdatedate', 'bycreatedate', 'bycomment', 'top' , 'byupvotes','bydownvotes','byviews','byfollow' ]}" value="${module.params?.order?.value }"
                              valueMessagePrefix="order.type" />
                    <i></i>

                </label>
            </section>

            %{--<section>--}%
                %{--<label class="label"><g:message code="article.status.title" /></label>--}%
                %{--<label class="select state-success">--}%
                    %{--<g:select  optionKey="id" value="${module.params?.status?.value }" noSelection="['-1':'-All-']"--}%
                              %{--name="status"  optionValue="name" from="${project?.articleStatusDTOs}" />--}%
                    %{--<i></i>--}%
                %{--</label>--}%
            %{--</section>--}%

            <section>
                <label class="label"><g:message code="order.type.title" /></label>
                <label class="select state-success">
                    <g:select  optionKey="id" value="${module.params?.type?.value }" noSelection="['-1':'-All-']"
                               name="type"  optionValue="alias" from="${forumTypes}" />
                    <i></i>
                </label>
            </section>
            <section>
                <label class="label"><g:message code="setting.customize.forumlist.footer.mode" /></label>
                <label class="select state-success">
                    <g:select name="footerMode" from="${['hide', 'paginate', 'browseall' ]}" value="${module.params?.footerMode?.value }"
                              valueMessagePrefix="setting.customize.forumlist.footer.type" />
                    <i></i>
                </label>
            </section>

            <section>
                <label class="label"><g:message code="setting.customize.forumlist.maxRecods" type="number"  /></label>
                <label class="input state-success">
                    <input type="text" name="maxRecords" value="${module.params?.maxRecords?.value}">
                </label>
            </section>

            <section>
                <label class="checkbox state-success"><input  name="showTopicAvatar"  value="1" <g:if test="${module.params?.showTopicAvatar}">checked=""</g:if> type="checkbox"><i></i><g:message code="setting.customize.forumlist.show.avatar"/></label>
            </section>

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
