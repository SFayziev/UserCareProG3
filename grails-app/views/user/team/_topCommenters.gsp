<div class="tag-box tag-box-v1 margin-bottom-10"  >
    <div class="headline">
        <h2><g:message code="user.team.top.commenters" /></h2>
    </div>
    <g:each in="${usersTopCommenters}" var="userDTO">
        <g:render template="/user/popoverinfo" model="${[userDTO: userDTO]}" />
    </g:each>

</div>