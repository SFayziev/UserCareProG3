
    <ol class="breadcrumb hidden-xs">
        <li><g:link  controller="list" action="${forum.id}">
            <locale:message  proj="${UCproject}" code="forum.title.${forum.id}" default="${forum.name}" />
        </g:link>
        </li>
       <g:if test="${article?.categoriesDTO}">
            <li><a > <locale:message  proj="${UCproject}" code="category.name.${article?.categoriesDTO?.id}" default="${article?.categoriesDTO?.name}" /></a></li>
       </g:if>
        <g:if test="${article?.type}">
            <li class="active"><a ><locale:message  proj="${UCproject}" code="topictype.name.${article.type.id}" default="${article?.type?.articleTypeDTO?.name}" /></a></li>
        </g:if>
    </ol>
