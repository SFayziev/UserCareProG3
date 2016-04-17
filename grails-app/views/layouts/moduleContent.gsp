<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main"/>
    <title><g:layoutTitle/></title>
    <g:layoutHead/>
</head>
<body>


<!--=== Content Part ===-->
<div class="container content-sm">

    <div class="row ">
<g:if test="${UCproject?.projectDesignDTO?.layoutmode==1}">
        <g:pageProperty name="page.mainContent1"/>
        <g:pageProperty name="page.menuContent1"/>
</g:if>
 <g:else>
     <g:pageProperty name="page.menuContent1"/>
     <g:pageProperty name="page.mainContent1"/>
 </g:else>

    </div>
</div>

</body>
</html>