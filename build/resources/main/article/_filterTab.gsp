<ul class="nav nav-tabs">
    <li class="<g:if test="${!catalogParams?.type || catalogParams?.type<0 }">active</g:if> "><a href="#"  onclick="setArticleListType(${module?.id},  -1)"> All  <span class="badge badge-blue rounded-x">${pageCount?.getCountByType(-1 )}</span></a></li>
<g:each in="${forumTypes}" var="forumTypeDTO">
    <li class="<g:if test="${catalogParams?.type==forumTypeDTO?.id}">active</g:if> "> <a   data-action="listByType" data-type-value="${forumTypeDTO?.id}" onclick="setArticleListType(${module?.id}, ${forumTypeDTO?.id})" >
        %{--<g:render template="/article/imageByType" model="${[imgid: "forumtype${forumTypeDTO.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:forumTypeDTO?.articleTypeDTO?.imgDTO]}" />--}%
        <locale:message  proj="${project}" code="topictype.name.$forumTypeDTO.id" default="${forumTypeDTO?.articleTypeDTO?.name}" />
        <g:if test="${pageCount?.getCountByType(forumTypeDTO?.id )>0 }"><span class="badge badge-blue rounded-x">${pageCount?.getCountByType(forumTypeDTO?.id )}</span></g:if> </a>
    </li>
</g:each>

</ul>