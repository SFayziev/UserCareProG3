<div class="module-body" >
    <div class="headline">
        <h2><g:message code="user.team.top.commenters" /></h2>
    </div>
    <g:each in="${usersTopCommenters}" var="userDTO">
        <g:render template="/user/team/topContributorsUserInfo" model="${[userDTO: userDTO, showcomments:true ]}" />

    </g:each>

</div>