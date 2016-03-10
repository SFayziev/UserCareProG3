<div class="row no-margin" >
    <g:render template="/article/userImage2x" model="${[userDTO: userDTO]}"  />
    <div class="media-body">
        <h4 class="media-heading">
            <strong>${userDTO.name}</strong>
        </h4>
        <g:if test="${showcontributor}">
            <i class="fa fa-star"></i> ${userDTO.raitings}
        </g:if>
        <g:if test="${showcomments}">
            <i class="fa fa-comments"></i> ${userDTO.comments}
        </g:if>
        <g:if test="${shownewface}">
            <i class="fa fa-clock-o"></i> <g:message code="${userDTO?.regdateAgo?.i18nvalue}"  args="${userDTO?.regdateAgo?.agovalue}" />
        </g:if>
    </div>
</div>