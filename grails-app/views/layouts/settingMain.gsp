<!DOCTYPE html>
<html lang="ru">
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
        <!-- START Page content-->
        <div class="content-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <g:pageProperty name="page.mainContent1"/>
                </div>
            </div>
        </div>
    </section>

    %{--<div class="container content-sm">--}%

        %{--<div class="row ">--}%

            %{--<g:if test="${UCproject!= null}"><g:render template="/layouts/header" /></g:if>--}%
            %{--<div class="side-block col-md-3">--}%
                %{----}%
            %{--</div>--}%
            %{--<div id="mainBar" class="main-block col-md-9" >--}%
                %{--<g:pageProperty name="page.mainContent1"/>--}%
            %{--</div>--}%
        %{--</div>--}%
    %{--</div>--}%

    %{--<g:render template="/layouts/footer" />--}%

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


</html>