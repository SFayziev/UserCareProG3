<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title"><g:message code="setting.customize.edit.text" /></h4>
</div>
<div class="modal-body">
    <form id="moduleEditForm"   class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate"  >
        <fieldset>
            <div class="form-group">
                <div class="col-lg-12">
                    <textarea class="form-control" rows="4" id="articleDesc" name="description">${module.params?.description?.value}</textarea>
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
    $(document).ready(function() {
        setAjaxModuleCustomisationSave(${module.id});

        $('#articleDesc').summernote({
            height: 150,
            minHeight: null,
            maxHeight: null,
            focus: true,
            toolbar: [
                ['style', ['style',  'bold', 'italic', 'underline']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol']],
                ['insert', ['link', 'picture', 'video' , 'table' , 'hr']],
                ['misc', ['codeview', 'fullscreen']]
            ]
        });
    });

</script>
