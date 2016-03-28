<div data-content="${comment?.id}" id="comment-${comment?.id}" class="content">
    <div class="testimonials-info">
        <div class="level${comment?.level}" >
            <div class="topic-avatar">
                <g:render template="/user/userImage" model="${[userDTO:comment?.userDTO]}" />
            </div>
            <div class="overflow-h">
                <small>
                    <a href="#">${comment?.userDTO?.username}</a> <g:message code="${comment?.timeAgo?.i18nvalue}"  args="${comment?.timeAgo?.agovalue}" />
                </small>

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
            </div>
            <div class="commenttext" >${comment?.text?.encodeAsRaw()}</div>
            <div class="comment-action-bar">
                <ul class="list-inline pull-right " id="comment-commandbar-${comment?.id}">
                    <g:if test="${!article?.disabled}">
                    <li><a data-content="${comment?.id}" class="link-icon" data-action="replycomment" href="#"><i class=" icon-sm rounded-2x  fa fa-reply"></i></a></li>
                    </g:if>
                    <li><a data-content="${comment?.id}"  class="link-icon" data-action="editcomment" href="#"><i class=" icon-sm rounded-2x  fa fa-edit"></i></a></li>
                    <li><a data-toggle="modal" href="/comment/delete/${article.id}?commid=${comment?.id}"  class="link-icon" data-target="#myModalDelete" ><i class=" icon-sm rounded-2x  fa fa-trash"></i></a></li>
                    <li><a data-content="${comment?.id}" data-action="votecomment" data-loading-text='<i class="fa fa-spinner fa-pulse"></i>' class="link-icon"  data-vote-value="1" href="#" ><i class=" icon-sm rounded-2x  fa fa-thumbs-o-up"></i></a></li>
                    <li><a data-content="${comment?.id}" data-action="votecomment"  data-loading-text='<i class="fa fa-spinner fa-pulse"></i>' class="link-icon" data-vote-value="-1" href="#"><i class=" icon-sm rounded-2x  fa fa-thumbs-o-down"></i></a></li>
                </ul>
            </div>
            <div class="clearfix"></div>


        </div>
    </div>
</div>
