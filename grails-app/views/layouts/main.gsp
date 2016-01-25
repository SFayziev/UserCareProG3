<!DOCTYPE html>
<html lang="ru">
<head>
	<title><g:layoutTitle default="${session.getAttribute("project_name")}"/></title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="${project?.projectDesignDTO?.faviconFileDTO?.svalue?.originalFilename }">
	%{--<asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>--}%
    <g:render template="/layouts/headerFile" />

	<g:layoutHead/>
</head>

<body class="boxed-layout">
<div id="jGrowl-container1" class="jGrowl top-right"></div>

<div class="wrapper">
	<g:render template="/layouts/header" />
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

<script type='text/javascript'>
	var _ues = {
		host:'bong.userecho.com',
		forum:'44763',
		lang:'en',
		tab_corner_radius:5,
		tab_font_size:20,
		tab_image_hash:'ZmVlZGJhY2s%3D',
		tab_chat_hash:'Y2hhdA%3D%3D',
		tab_alignment:'right',
		tab_text_color:'#ffffff',
		tab_text_shadow_color:'#00000055',
		tab_bg_color:'#57a957',
		tab_hover_color:'#f45c5c'
	};

	(function() {
		var _ue = document.createElement('script'); _ue.type = 'text/javascript'; _ue.async = true;
		_ue.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.userecho.com/js/widget-1.4.gz.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(_ue, s);
	})();

</script>



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