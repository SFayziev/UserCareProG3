<div data-content="${comment?.id}" id="comment-${comment?.id}" class="content-boxes-v2-o ">
    <div class="comment-info">
        <g:render template="/article/imageByType" model="${[imgid: "forumtype${comment?.id}", imgclass: "pull-left img-responsive avatar rounded-x", iconclass: 'pull-left icon-sm', img:comment.articleDTO.type?.articleTypeDTO?.imgDTO]}" />
        <h2 class="heading-sm">
            <span>
                <g:link controller="article" action="item" id="${comment.articleDTO.id}" params="${[forumid: comment.articleDTO.forumDTO.id ]}">${comment.articleDTO.title}  </g:link>
            </span>
        </h2>
        <div class=" media-body">
            <h4 class="media-heading">
                <small><a href="#">${comment?.userDTO?.username}</a> <g:message code="${comment?.timeAgo?.i18nvalue}"  args="${comment?.timeAgo?.agovalue}" /></small>
                <div class="topic-votes pull-right">
                    <span id="votesum-${comment?.id}" class='margin-left-5 rounded label <g:if test="${comment?.voteSum<0 }">label-warning</g:if><g:else>label-success</g:else> ' >
                        <g:formatNumber number="${comment?.voteSum }" format="+0;-0" />
                    </span>
                </div>
                <div class="topic-votes pull-right">
                    <g:if test="${comment?.statusDTO}">
                        <span class="margin-left-5 rounded  label" style="background: ${comment?.statusDTO?.color}" ><locale:message  proj="${UCproject}" code="article.status.name.${comment?.statusDTO?.id}" default="${comment?.statusDTO?.name}" /> </span>
                    </g:if>
                </div>
                <div class="topic-votes pull-right">
                    <g:if test="${comment?.answer}">
                        <span class="margin-left-5 rounded  label label-primary" ><g:message code="comment.answer.title" /> </span>
                    </g:if>
                </div>

            </h4>
            <div class="commenttext" >${comment?.text?.encodeAsRaw()}</div>

        </div>
    </div>
</div>
