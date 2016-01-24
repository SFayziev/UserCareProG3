<g:if test="${comment}">

<div class="row">
    <div class="panel-body comments-list">
        <div id="comment-answer-${comment?.id}" class=" media  media-v2">
            <div class="topic-votes pull-right">
                <h2 class="panel-title heading-sm pull-left"><i class="fa  fa-check-square-o "></i>Answer</h2>
            </div>
            <g:render template="/article/userImage" model="${[userDTO:comment?.userDTO]}" />
            <div class="media-body">
                <h4 class="media-heading">
                    <strong><a href="#">${comment?.userDTO?.username}</a></strong>  <g:message code="${comment?.timeAgo?.i18nvalue}"  args="${comment?.timeAgo?.agovalue}" />
                </h4>
                <p>${comment?.text?.encodeAsRaw()}</p>
            </div>
        </div>
    </div>
</div>


</g:if>