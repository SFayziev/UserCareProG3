<ul class="nav nav-tabs">
    <li class="<g:if test="${!catalogParams?.type || catalogParams?.type<0 }">active</g:if> "><a href="#"  onclick="setArticleListType(${module?.id},  -1)"> All  <span class="badge badge-blue rounded-x">${pageCount?.getCountByType(-1 )}</span></a></li>
<g:each in="${forumTypes}" var="topicTypeDTO">
    <li class="<g:if test="${catalogParams?.type==topicTypeDTO?.id}">active</g:if> "> <a   data-action="listByType" data-type-value="${topicTypeDTO?.id}" onclick="setArticleListType(${module?.id}, ${topicTypeDTO?.id})" >
        %{--<g:render template="/article/imageByType" model="${[imgid: "forumtype${topicTypeDTO.id}", imgclass: "img-responsive avatar rounded-x", iconclass: 'icon-sm', img:topicTypeDTO?.articleTypeDTO?.imgDTO]}" />--}%
        <locale:message  proj="${UCproject}" code="topictype.name.$topicTypeDTO.id" default="${topicTypeDTO?.articleTypeDTO?.name}" />
        <g:if test="${pageCount?.getCountByType(topicTypeDTO?.id )>0 }"><span class="badge badge-blue rounded-x">${pageCount?.getCountByType(topicTypeDTO?.id )}</span></g:if> </a>
    </li>
</g:each>

</ul>