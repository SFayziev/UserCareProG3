<!DOCTYPE html>
<html lang="ru">
<head>
	<title><g:layoutTitle default="${session.getAttribute("project_name")}"/></title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="icon" href="${UCproject?.projectDesignDTO?.faviconFileDTO?.svalue?.originalFilename }">
	%{--<asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>--}%
    <g:render template="/layouts/headerFile" />

	<g:layoutHead/>
</head>

<body class="boxed-layout">
<div id="jGrowl-container1" class="jGrowl top-right"></div>

<div class="wrapper">
    <g:if test="${UCproject!= null}"><g:render template="/layouts/header" /></g:if>
	%{--<g:render template="/layouts/topMenu" />--}%
	<g:layoutBody/>
	<g:render template="/layouts/footer" />
</div>

<g:if test="${customize}">
    <div class="simple_overlay"></div>
    <asset:stylesheet href="config.css"/>
	<asset:javascript src="customisation.js"/>
</g:if>

</body>


<script type="text/javascript">
    var userCareOpt = {
        /* required */
        host: 'feedback.usercare.info',
        forum: '2',
        showTab: true,
        /* optional */
        alignment: 'left',
        background_color:'#f00',
        text_color: 'white',
        hover_color: '#06C',
        lang: 'en'
    };

    function _loadUserCare() {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', ("https:" == document.location.protocol ? "https://" : "http://") + "cdn.usercare.info/js/widgets/tab.js");
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    _loadSuper = window.onload;
    window.onload = (typeof window.onload != 'function') ? _loadUserCare : function() { _loadSuper(); _loadUserCare(); };
</script>



<g:render template="/layouts/footerFile" />

</html>