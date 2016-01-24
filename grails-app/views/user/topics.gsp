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
        <div class="col-md-9">

            <div class="tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/modules/listArticles" model="${[module:module]}"/>
            </div>
        </div>

        <div class="col-xs-3  padding-right-5 padding-left-5">
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userAvatar" />
            </div>
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userContact" />
            </div>

            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userMenu" />
            </div>
            <div class=" tag-box tag-box-v1 margin-bottom-10">
                <g:render template="/widgets/userAdminMenu" />
            </div>
        </div>


    </div>
</div>
<g:render template="/modal/imageSelector"/>

<asset:javascript src="validator.min.js"/>
<asset:stylesheet  src="sky-forms.css"/>
</body>
</html>