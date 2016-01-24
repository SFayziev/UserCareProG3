<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")} : ${article?.title}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="main"/>
    <title></title>

</head>
<body>
<!--=== Content Part ===-->
<div class="container content-sm">

    <div id="mainBar" class="col-xs-9 padding-right-5 padding-left-5 ">
       <g:render template="/article/itemAndReplies"/>
    </div>
    <div  class="col-xs-3  padding-right-5 padding-left-5">
        <div class=" tag-box tag-box-v1 margin-bottom-10">
            <g:render template="/widgets/projectLogo"/>
        </div>
    <sec:ifAllGranted roles='ROLE_MANAGER'>
        <div class=" tag-box tag-box-v1 margin-bottom-10">
            <g:render template="/modules/articleControlePanelW"/>
        </div>
    </sec:ifAllGranted>
        <div class=" tag-box tag-box-v1 margin-bottom-10">
            <g:render template="/widgets/articleStats"/>
        </div>

        <g:render template="/widgets/poweredBy"/>

    </div>

</div>

</body>

</html>