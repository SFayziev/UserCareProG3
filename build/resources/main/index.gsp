<!DOCTYPE html>
<html lang="en">
<head>
    <title>${session.getAttribute("project_name")}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!-- May not be valid but it works -->
    <meta name="layout" content="main"/>
    <title></title>
</head>
<body>
<!--=== Content Part ===-->
<div class="container content-sm">

    <div class="row ">
        <g:render template="/index/mainBar"/>

        <g:render template="/index/miniBar"/>
    </div>


</div>

</body>

</html>