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
        <g:applyLayout name="moduleLayout" model="${[module:module]}">
            <content tag="moduleContent">
                <g:render template="${module?.moduleTypeDTO?.template}" model="${[module:module]}"/>
            </content>
        </g:applyLayout>

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