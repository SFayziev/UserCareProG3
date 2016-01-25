<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="main"/>
    <title><g:layoutTitle/></title>
    <g:layoutHead/>
</head>
<body>

<g:set var="pos" value="1"/>

<!--=== Content Part ===-->
<div class="container content-sm">

    <div class="row ">
<g:if test="${pos=='0'}">
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