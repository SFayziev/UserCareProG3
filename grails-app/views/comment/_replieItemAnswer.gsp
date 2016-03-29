<g:if test="${comment}">
<div id="comment-answer-${comment?.id}" class="testimonials-info">
    <div class="title">
        <h3 class="pull-right"><i class="fa  fa-check-square-o "></i> Answer </h3>
    </div>
    <div class="topic-avatar">
        <g:render template="/user/userImage" model="${[userDTO:comment?.userDTO]}" />
    </div>
    <div class="overflow-h">
        <small>
           <a href="#">${comment?.userDTO?.username}</a>
            <g:message code="${comment?.timeAgo?.i18nvalue}"  args="${comment?.timeAgo?.agovalue}" />
        </small>
    </div>
    <div class="commenttext" >
        <p>${comment?.text?.encodeAsRaw()}</p>
    </div>
</div>
</g:if>