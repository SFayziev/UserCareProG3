<div class="module-body" >
    <div class="headline">
        <h2><g:message code="user.team.new.faces" /></h2>
    </div>

    <g:each in="${usersNewFace}" var="userDTO">
        <g:render template="/user/team/topContributorsUserInfo" model="${[userDTO: userDTO, shownewface:true ]}" />
    </g:each>

</div>