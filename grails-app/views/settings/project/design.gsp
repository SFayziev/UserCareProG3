<g:applyLayout name="settingMain">
    <content tag="mainContent1">

<asset:javascript src="jquery.ui.widget.js"/>
<asset:javascript src="jquery.fileupload.js"/>
<asset:javascript src="jquery.xdr-transport.js"/>
<asset:stylesheet href="jquery.fileupload.css"/>
<div class="tag-box tag-box-v1 margin-bottom-10">

    <ol class="breadcrumb hidden-xs">
        <li><g:link controller="settings" ><g:message code="setting.leftMenu.project" /></g:link> </li>
        <li class="active"><g:link controller="settings" > <g:message code="setting.leftMenu.project.design" /></g:link></li>
    </ol>
    <div class="headline"><h2><g:message code="setting.project.design.title" /></h2></div>

    <g:render template="/settings/project/image"/>
</div>


    </content>
</g:applyLayout>