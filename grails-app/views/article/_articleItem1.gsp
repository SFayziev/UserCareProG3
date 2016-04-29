<g:applyLayout name="articleItemLayout" model="${[article:article]}">

    <content tag="avatar">
        <g:if test="${module?.params?.showTopicAvatar?.value==1}" >
            <div class="topic-avatar">
                <g:render template="/user/userImage" model="${[userDTO: article?.userDTO]}" />
            </div>
        </g:if>
    </content>

    <content tag="votes">
        <div  class="topic-votes pull-right">
            <a data-content="${article?.id}" data-action="voteshow"  id="votesum-${article?.id}" class="margin-left-5 rounded label <g:if test="${article?.voteSum<0 }">label-warning</g:if><g:else>label-success</g:else>" >
                <g:formatNumber number="${article?.voteSum }" format="+0;-0" />
            </a>
        </div>
    </content>

    <content tag="status">
        <div class="topic-votes pull-right">
            <span class="rounded  label" style="background: ${article?.statusDTO?.color}" ><locale:message  proj="${UCproject}" code="article.status.name.${article?.statusDTO?.id}" default="${article?.statusDTO?.name}" /> </span>
        </div>
    </content>

    <content tag="title">
        <div class="title">
            <g:render template="/file/imageByTypeS" model="${[imgid: "imglinks${topicType?.id}",  img:topicType?.articleTypeDTO?.imgDTO  ]}" />
            <g:if test='${module.usedby==4}'><g:link target="_blank" controller="article" action="item" id="${article.id}" >${article.title}</g:link></g:if>
            <g:else><g:link  controller="article" action="item" id="${article.id}" params="${[forumid: article?.forumDTO?.id]}" >${article.title}</g:link></g:else>
        </div>
    </content>

    <content tag="info">
        <div class="overflow-h">
            <small>
                <ul class="list-inline ">
                    <li><i class="fa fa-user"></i> <a href="#">${article?.userDTO?.name}</a> <g:message code="${article?.timeAgo?.i18nvalue}"  args="${article?.timeAgo?.agovalue}" /></li>
                    <g:if test="${article?.updatedUserDTO}"><li> •  updated by <g:link controller="user" action="topics" id="${article?.updatedUserDTO?.id}"> ${article?.updatedUserDTO?.name}</g:link> <g:message code="${article?.timeUpdateAgo?.i18nvalue}"  args="${article?.timeUpdateAgo?.agovalue}" /></li></g:if>
                    <g:if test="${article?.assignedUserDTO}"> <li> • assigned to <g:link controller="user" action="topics" id="${article?.assignedUserDTO?.id}" >${article?.assignedUserDTO?.name}</g:link> </li></g:if>
                    <li> • <i class="fa fa-comment-o"></i> ${article?.comments }</li>
                </ul>
            </small>
        </div>
    </content>
    <g:if test="${'full'== module?.params?.topicPresentation?.value}">
        <content tag="text">
            <div class="comment-info">${article?.text?.encodeAsRaw()}</div>
        </content>
        <content tag="action">
            <modules:articleTags params="${[project: project, article: article]}" />
            <g:render template="/article/articleVoter" model="${[article: article]}" />
        </content>
    </g:if>
    <g:if test="${answer}">
        <content tag="answer">
            <g:render template="/comment/replieItemAnswer" model="${[comment: answer ]}"/>
        </content>
    </g:if>
</g:applyLayout>
