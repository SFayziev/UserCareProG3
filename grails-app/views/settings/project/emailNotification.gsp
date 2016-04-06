<g:applyLayout name="settingMain">
    <content tag="mainContent1">
        <h3><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> /
        <g:link controller="settings" > <g:message code="setting.leftMenu.project.mail.settings" /></g:link>
        </h3>

        <div class="panel panel-default">
            <g:form controller="project" action="emailNotification"   >
                <div class="panel-body">
                    <p><g:message code="setting.project.emailNotification.text1"/></p>
                    <div class="tag-box tag-box-v6">
                        <p>${UCproject.name}  ${emailNoReply}@${UCproject.alias}.${domainUrl}</p>
                    </div>

                    <h4><g:message code="setting.project.emailNotification.text2" /></h4>

                    <fieldset>
                        <div class="form-group">
                            <label class="col-lg-3 control-label"><g:message code="setting.name" /></label>
                            <div class="col-lg-7">
                                <input class="form-control" type="text" name="emailname" value="${UCproject.params?.emailname?.value}">
                                <span class="help-block m-b-none"><g:message code="setting.project.emailNotification.name" /></span>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-lg-3 control-label"><g:message code="setting.project.emailNotification.footer" /></label>
                            <div class="col-lg-9">
                                <textarea rows="4" id="emailFooter" class="form-control" name="emailFooter">${UCproject.params?.emailFooter?.value}</textarea>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="panel-footer text-center">
                    <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                    <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
                </div>
            </g:form>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        $('#emailFooter').summernote({
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

</content>
</g:applyLayout>

