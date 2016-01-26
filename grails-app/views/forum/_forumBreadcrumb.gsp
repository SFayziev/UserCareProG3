<ol class="breadcrumb hidden-xs">
    <li>
       <b><g:message code="forum.title" /></b> : <g:link  controller="list" action="${forum.id}"><locale:message  proj="${project}" code="forum.title.${forum.id}" default="${forum.name}" />
    </g:link>
    </li>
   <g:if test="${category}">
        <li><a > <locale:message  proj="${project}" code="category.name.${category?.id}" default="${category?.name}" /></a></li>
   </g:if>

</ol>