<div id="article-${article?.id}" data-forum-id="${article?.forumDTO?.id}"  data-article-id="${article?.id}" class="content-boxes-v2-o">


    <div class="testimonials-info">
        <g:if test="${module?.params?.showTopicAvatar}" >
            <g:render template="/article/userImage" model="${[userDTO: article?.userDTO]}" />
        </g:if>
        <div class="overflow-textH">
            <div  class="topic-votes pull-right">
                <a data-content="${article?.id}" data-action="voteshow"  id="votesum-${article?.id}" class="margin-left-5 rounded label <g:if test="${article?.voteSum<0 }">label-warning</g:if><g:else>label-success</g:else>" >
                    <g:formatNumber number="${article?.voteSum }" format="+0;-0" />
                </a>
            </div>

            <div class="topic-votes pull-right">
                <span class="rounded  label" style="background: ${article?.statusDTO?.color}" ><locale:message  proj="${project}" code="article.status.name.${article?.statusDTO?.id}" default="${article?.statusDTO?.name}" /> </span>
            </div>
            <h2 class="heading-sm">
                <span>
                    <g:if test='${WType}'><g:link target="_blank" controller="article" action="item" id="${article.id}" >${article.title}</g:link></g:if>
                    <g:else><g:link  controller="article" action="item" id="${article.id}" params="${[forumid: article?.forumDTO?.id]}" >${article.title}</g:link></g:else>
                </span>
            </h2>
        </div>
        <div class="overflow-h">
            <h2 class="heading-sm">
                <span><small>
                    <ul class="list-inline share-list">
                        <li><i class="fa fa-user"></i><a href="#">${article?.userDTO?.name}</a> <g:message code="${article?.timeAgo?.i18nvalue}"  args="${article?.timeAgo?.agovalue}" /></li>
                        <g:if test="${article?.updatedUserDTO}"><li> •  updated by <g:link controller="user" action="topics" id="${article?.updatedUserDTO?.id}"> ${article?.updatedUserDTO?.name}</g:link> <g:message code="${article?.timeUpdateAgo?.i18nvalue}"  args="${article?.timeUpdateAgo?.agovalue}" /></li></g:if>
                        <g:if test="${article?.assignedUserDTO}"> <li>  • assigned to <g:link controller="user" action="topics" id="${article?.assignedUserDTO?.id}" >${article?.assignedUserDTO?.name}</g:link> </li></g:if>
                        <li> • <i class="fa fa-comment-o"></i>${article?.comments }</li>
                    </ul></small>
                </span>
            </h2>
        </div>

    <g:if test="${'full'== module?.params?.topicPresentation}">
        <div class="clearfix margin-bottom-20"><p>${article?.text.encodeAsRaw() } </p></div>

        <modules:articleTags params="${[project: project, article: article]}" />
        <g:render template="/article/articleVoter" model="${[article: article]}" />
    </g:if>
    <g:if test="${answer}">
        <g:render template="/comment/replieItemAnswer" model="${[comment: answer ]}"/>
    </g:if>
    </div>
</div>
