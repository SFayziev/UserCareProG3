<g:applyLayout name="settingMain">
    <content tag="mainContent1">

        <div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> </li>
        <li class="active"><g:link controller="settings" > <g:message code="setting.leftMenu.project.mail.settings" /></g:link></li>
    </ol>
    <div class="panel-body">

        <p><g:message code="setting.project.emailNotification.text1"/></p>
        <div class="tag-box tag-box-v6">
            <p>${project.name}  ${emailNoReply}@${project.alias}.${domainUrl}</p>
        </div>

        <h4><g:message code="setting.project.emailNotification.text2" /></h4>

        %{--<div class="tag-box tag-box-v6">--}%
            %{--<p>feedback 14400  IN  CNAME  ${project.alias}.${domainUrl}.</p>--}%
        %{--</div>--}%

        <g:form controller="project" action="emailNotification"   class="sky-form" >
            <fieldset>
                <section>
                    <label class="label"><g:message code="setting.project.emailNotification.name" /></label>
                    <label class="input state-success">
                        <input type="text" name="emailname" value="${project.params?.emailname?.value}">
                    </label>
                    <div class="note note-success"><g:message code="setting.project.emailNotification.text3" /></div>
                </section>
                <section>
                    <label class="label"><g:message code="setting.project.emailNotification.footer" /></label>
                    <label class="input state-success">
                        <textarea rows="4" id="emailFooter" name="emailFooter">${project.params?.emailFooter?.value}</textarea>
                    </label>
                </section>
            </fieldset>

            <div class="modal-footer">
                <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>

            </div>

        </g:form>
    </div>
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

