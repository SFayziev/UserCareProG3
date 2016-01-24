<div data-content="${comment?.id}" id="comment-${comment?.id}" class="content-boxes-v2-o ">
    <div class="comment-info">


        <div class="level${comment?.level}">
        <g:render template="/article/userImage" model="${[userDTO:comment?.userDTO]}" />
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
                        <span class="margin-left-5 rounded  label" style="background: ${comment?.statusDTO?.color}" ><locale:message  proj="${project}" code="article.status.name.${comment?.statusDTO?.id}" default="${comment?.statusDTO?.name}" /> </span>
                    </g:if>
                </div>
                <div class="topic-votes pull-right">
                    <g:if test="${comment?.answer}">
                        <span class="margin-left-5 rounded  label label-primary" ><g:message code="comment.answer.title" /> </span>
                    </g:if>
                </div>

                </h4>
                <div class="commenttext" >${comment?.text?.encodeAsRaw()}</div>


                <ul class="list-inline pull-right " id="comment-commandbar-${comment?.id}">
        <g:if test="${!article?.disabled}">
                    <li><a data-content="${comment?.id}" class="link-bg-icon" data-action="replycomment" href="#"><i class="icon-custom icon-sm rounded-2x icon-color-u fa fa-reply"></i></a></li>
        </g:if>
                    <li><a data-content="${comment?.id}"  class="link-bg-icon" data-action="editcomment" href="#"><i class="icon-custom icon-sm rounded-2x icon-color-u fa fa-edit"></i></a></li>
                    <li><a data-toggle="modal" href="/comment/delete/${article.id}?commid=${comment?.id}"  class="link-bg-icon" data-target="#myModalDelete" ><i class="icon-custom icon-sm rounded-2x icon-color-u fa fa-trash"></i></a></li>
                    <li><a data-content="${comment?.id}" data-action="votecomment" data-loading-text='<i class="fa fa-spinner fa-pulse"></i>' class="link-bg-icon"  data-vote-value="1" href="#" ><i class="icon-custom icon-sm rounded-2x icon-color-u fa fa-thumbs-o-up"></i></a></li>
                    <li><a data-content="${comment?.id}" data-action="votecomment"  data-loading-text='<i class="fa fa-spinner fa-pulse"></i>' class="link-bg-icon" data-vote-value="-1" href="#"><i class="icon-custom icon-sm rounded-2x icon-color-u fa fa-thumbs-o-down"></i></a></li>
                </ul>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>
