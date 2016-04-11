<g:applyLayout name="settingMain">
    <content tag="mainContent1">

        <h3><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> /
        <g:link controller="settings" > <g:message code="setting.leftMenu.project.aliasing" /></g:link>
        </h3>


    <div class="panel panel-default">
        <g:form controller="project" action="aliasing" id="moduleEditForm"  class="form-horizontal" >
            <div class="panel-body">
                <p><g:message code="setting.project.aliasing.text1"/></p>
                <h4><g:message code="setting.project.aliasing.text2" /></h4>
                <p><g:message code="setting.project.aliasing.text3"  args="${[UCproject.alias + "."+ domainUrl ]}"/></p>

                <div class="tag-box tag-box-v6">
                    <p>feedback 14400  IN  CNAME  ${UCproject.alias}.${domainUrl}.</p>
                </div>
                <p><g:message code="setting.project.aliasing.text4" args="${[domainUrl, UCproject.alias + "."+ domainUrl ]}"/></p>
                <h4><g:message code="setting.project.aliasing.text5" args="${[ domainUrl ]}"/></h4>
                <p><g:message code="setting.project.aliasing.text6" args="${[UCproject.alias + "."+ domainUrl ]}"/></p>
                <fieldset>
                    <label class="col-lg-3 control-label"><g:message code="setting.project.aliasing.alternative.url" /></label>
                    <div class="col-lg-7">
                        <input type="text" class="form-control" name="aliasurl" value="${UCproject.params?.aliasurl?.value}">
                        <span class="help-block m-b-none"> <g:message code="setting.project.aliasing.alternative.url.note" /></span>
                    </div>
                </fieldset>
            </div>
            <div class="panel-footer text-center">
                <button type="reset" class="btn btn-default"><g:message code="button.cancel" /></button>
                <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
            </div>
        </g:form>
    </div>


    </content>
</g:applyLayout>