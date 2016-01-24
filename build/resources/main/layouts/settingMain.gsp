<!DOCTYPE html>
<html lang="ru">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="${project?.projectDesignDTO?.faviconFileDTO?.svalue?.originalFilename }">
    <g:render template="/layouts/headerFile" />

    <g:layoutHead/>
</head>

<body class="boxed-layout">
<div id="jGrowl-container1" class="jGrowl top-right"></div>

<div class="wrapper">
    <div class="container content-sm">

        <div class="row ">

            <g:render template="/layouts/header" />
            <div id="manuBar" class="col-xs-3  padding-right-5 padding-left-5">
                %{--<g:render template="/settings/leftMenu" />--}%
            <modules:settingLeftMenu />
            </div>
            <div id="mainBar" class="col-xs-9  padding-right-5 padding-left-5" >
                <g:layoutBody/>
            </div>
        </div>
    </div>

    <g:render template="/layouts/footer" />

</div>
</body>
<g:render template="/layouts/footerFile" />
<asset:stylesheet href="sky-forms.css"/>
<asset:stylesheet href="config.css"/>
<asset:javascript src="validator.min.js"/>
<asset:javascript src="settings.js"/>
<asset:stylesheet  href="summernote.css"/>
<asset:javascript src="summernote.min.js"/>
<asset:javascript src="bootstrap-colorpicker.min.js"/>
<asset:stylesheet  href="bootstrap-colorpicker.min.css"/>


</html>