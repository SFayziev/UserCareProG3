<g:applyLayout name="settingMain">
    <content tag="mainContent1">

<asset:javascript src="jquery.ui.widget.js"/>
<asset:javascript src="jquery.fileupload.js"/>
<asset:javascript src="jquery.xdr-transport.js"/>
<asset:stylesheet href="jquery.fileupload.css"/>
        <h3><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> /
            <g:link controller="settings" > <g:message code="setting.leftMenu.project.design" /></g:link>
        </h3>

        <div class="panel panel-default">

            <div class="panel-heading"><h2><g:message code="setting.project.design.title" /></h2></div>
            <div class="panel-body"
                <g:render template="/settings/project/image"/>
            </div>
        </div>


    </content>
</g:applyLayout>