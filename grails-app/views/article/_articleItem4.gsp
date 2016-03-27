<div id="article-${article?.id}"  data-article-id="${article?.id}" class="profile-blog blog-border badge-lists">

    <div class="topic-votes pull-right">
        <span class="rounded  label" style="background: ${article?.statusDTO?.color}">${article?.statusDTO?.name}</span>
    </div>
    <g:if test="${1 != ishort}">
        <span class="badge badge-red rounded">Private Ticket #${article?.id}</span>
    </g:if>
    <g:render template="/user/userImage" model="${[userDTO: article?.userDTO]}" />
    <div class="name-location">
        %{--<asset:image src="type/${article?.type?.imageurl}" width="10px" />  --}%
        <strong><g:link controller="article" action="item" id="${article.id}" >${article.title}</g:link> </strong>
    </div>
    <ul class="list-inline share-list">
        <li><i class="fa fa-user"></i><a href="#">${article?.userDTO?.name}</a> <g:message code="${article?.timeAgo?.i18nvalue}"  args="${article?.timeAgo?.agovalue}" /></li>
        <g:if test="${article?.updatedUserDTO}"><li>updated by <a href="#"> ${article?.updatedUserDTO?.name}</a> <g:message code="${article?.timeUpdateAgo?.i18nvalue}"  args="${article?.timeUpdateAgo?.agovalue}" /></li></g:if>
        <g:if test="${article?.assignedUserDTO}"> <li>  assigned to <a href="#">${article?.assignedUserDTO?.name}</a> </li></g:if>
        <li><i class="fa fa-comment-o"></i>${article?.comments }</li>
    </ul>
    <g:if test="${1 != ishort}">
        <div class="clearfix margin-bottom-20"><p>${article?.text?.encodeAsRaw() } </p></div>
        <g:render template="/article/articleVoter4" model="${[article: article]}" />
    </g:if>
</div>
