<div class="tag-box tag-box-v1 margin-bottom-10"  >
    <div class="headline">
        <h2><g:message code="user.team.new.faces" /></h2>
    </div>

    <g:each in="${usersNewFace}" var="userDTO">
        <g:render template="/user/team/topContributorsUserInfo" model="${[userDTO: userDTO, shownewface:true ]}" />
    </g:each>

</div>