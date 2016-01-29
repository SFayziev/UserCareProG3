<g:applyLayout name="settingMain">
    <content tag="mainContent1">


<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> </li>
        <li class="active"><g:link controller="settings" > <g:message code="setting.leftMenu.project.aliasing" /></g:link></li>
    </ol>
    <div class="panel-body">

        <p><g:message code="setting.project.aliasing.text1"/></p>
        <h4><g:message code="setting.project.aliasing.text2" /></h4>
        <p><g:message code="setting.project.aliasing.text3"  args="${[project.alias + "."+ domainUrl ]}"/></p>

        <div class="tag-box tag-box-v6">
            <p>feedback 14400  IN  CNAME  ${project.alias}.${domainUrl}.</p>
        </div>
        <p><g:message code="setting.project.aliasing.text4" args="${[domainUrl, project.alias + "."+ domainUrl ]}"/></p>
        <h4><g:message code="setting.project.aliasing.text5" args="${[ domainUrl ]}"/></h4>
        <p><g:message code="setting.project.aliasing.text6" args="${[project.alias + "."+ domainUrl ]}"/></p>
        <g:form controller="project" action="aliasing" id="moduleEditForm"  class="sky-form" >
            <fieldset>
            <section>
                <label class="label"><g:message code="setting.project.aliasing.alternative.url" /></label>
                <label class="input state-success">
                    <input type="text" name="aliasurl" value="${project.params?.aliasurl?.value}">
                </label>
                <div class="note note-success"><g:message code="setting.project.aliasing.alternative.url.note" /></div>
            </section>
            </fieldset>
            <div class="modal-footer">
                <button type="submit" name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>

            </div>

        </g:form>
    </div>
</div>


    </content>
</g:applyLayout>