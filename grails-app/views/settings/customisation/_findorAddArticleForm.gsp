
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.forumlist.title" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"  class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >
        <fieldset>
            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.customize.findOrAdd.placeholder" /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="placeholder" value="${module.params?.placeholder?.value}">
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.customize.findOrAdd.add.button" /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="addButton" value="${module.params?.addButton?.value}">
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
                <div class="col-lg-offset-4 col-lg-7">
                    <div class="checkbox c-checkbox">
                        <label>
                            <input  name="showPrivate"  value="1" <g:if test="${module.params?.showprivate?.value=1}">checked=""</g:if> type="checkbox">
                            <span class="fa fa-check"></span><g:message code="setting.customize.findOrAdd.show.private"/>
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>    
            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.customize.findOrAdd.private.title" type="number"  /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="privateTitle" value="${module.params?.privateTitle?.value}">
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div class="form-group">
                <label class="col-lg-4 control-label"><g:message code="setting.customize.listWiki.articles.limit" type="number"  /></label>
                <div class="col-lg-7">
                    <input class="form-control" type="text" name="maxRecords" value="${module.params?.maxRecords?.value}">
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
