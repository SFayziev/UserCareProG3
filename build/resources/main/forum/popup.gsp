<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <g:render template="/layouts/headerFile" />
    <title></title>
</head>
<body class="popup" >
<div class="container">
    <div class="row">
        <g:set var="WType" value="true" />
        <button type="button" class="close" onClick = "window.parent.postMessage('Hello From IFrame', '*');" >×</button>
    </div>
    <g:each in="${modulPos}" var="module">
        <div class="<g:if test="${customize}">customisation_mode</g:if> tag-box tag-box-v1 margin-bottom-10">
            <g:if test="${customize}">
                <div class="action_buttons">
                    <button class="btn btn-primary btn-sm" data-action="widgetUP" data-content="${module?.id}" type="button"><i class="fa fa-arrow-up "></i></button>
                    <button class="btn btn-primary btn-sm" data-action="widgetDOWN" data-content="${module?.id}" type="button"><i class="fa fa-arrow-down "></i></button>
                    <g:if test="${module?.moduleTypeDTO?.editable}"><button class="btn btn-primary btn-sm" data-action="widgetEDIT" data-content="${module?.id}"  type="button"><i class="fa fa-cog "></i></button></g:if>
                    <g:if test="${!module?.moduleTypeDTO?.undeletable}"><button class="btn btn-primary btn-sm" data-action="widgetDELETE" data-content="${module?.id}" type="button"><i class="fa fa-trash "></i></button></g:if>
                </div>
            </g:if>
            <g:render template="${module?.moduleTypeDTO?.template}" model="${[module:module]}"/>
            <g:if test="${customize}"><div class="overDiv"></div></g:if>
        </div>

    </g:each>
    <g:render template="/widgets/poweredBy"/>
</div>
<g:render template="/layouts/footerFile" />
<g:if test="${customize}">
    <div class="simple_overlay"></div>
    <asset:stylesheet href="config.css"/>
    <asset:javascript src="customisation.js"/>
</g:if>

</body>
</html>