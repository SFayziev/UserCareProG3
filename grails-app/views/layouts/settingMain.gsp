<!DOCTYPE html>
<html lang="ru"  class="no-ie">
<head>
    <title><g:layoutTitle default="${session.getAttribute("project_name")}"/></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <g:if test="${UCproject!= null}"> <link rel="icon" href="${UCUCproject?.projectDesignDTO?.faviconFileDTO?.svalue?.originalFilename }"></g:if>

      <g:render template="/layouts/headerFile" />

    <g:layoutHead/>
</head>

<body>
<div id="jGrowl-container1" class="jGrowl top-right"></div>


<div class="wrapper">
    <g:if test="${UCproject!= null}"><g:render template="/layouts/settingHeader" /></g:if>
    <modules:settingLeftMenu/>

    <section>
        <div class="content-wrapper">
            <g:pageProperty name="page.mainContent1"/>
        </div>
    %{--<g:render template="/layouts/footer" />--}%
    </section>




</div>
</body>
<g:render template="/layouts/footerFile" />
%{--<asset:stylesheet href="sky-forms.css"/>--}%
<asset:stylesheet href="settings.css"/>
<asset:javascript src="validator.min.js"/>
<asset:javascript src="settings.js"/>
<asset:stylesheet  href="summernote.css"/>
<asset:javascript src="summernote.min.js"/>
<asset:javascript src="bootstrap-colorpicker.min.js"/>
<asset:stylesheet  href="bootstrap-colorpicker.min.css"/>
<asset:javascript src="modernizr-custom.js"/>


</html>