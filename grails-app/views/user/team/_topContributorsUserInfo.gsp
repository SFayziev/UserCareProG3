<div class="content" >
    <div class="testimonials-info" >
        <div class="topic-avatar">
           <g:render template="/user/userImage2x" model="${[userDTO: userDTO]}"  />
        </div>
        <div class="title">
            <h4>
                <strong>${userDTO.name}</strong>
            </h4>
        </div>
        <div class="overflow-h">
            <small>
                <g:if test="${showcontributor}">
                    <i class="fa fa-star"></i> ${userDTO.raitings}
                </g:if>
                <g:if test="${showcomments}">
                    <i class="fa fa-comments"></i> ${userDTO.comments}
                </g:if>
                <g:if test="${shownewface}">
                    <i class="fa fa-clock-o"></i> <g:message code="${userDTO?.regdateAgo?.i18nvalue}"  args="${userDTO?.regdateAgo?.agovalue}" />
                </g:if>
            </small>
        </div>
    </div>
</div>
