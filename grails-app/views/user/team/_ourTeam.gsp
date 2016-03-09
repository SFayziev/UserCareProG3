<div class="tag-box tag-box-v1 margin-bottom-10"  >
    <div class="headline">
        <h2><g:message code="user.team.our.team" /></h2>
    </div>
    <div class="row">
    <g:each in="${usersOurStaff}" var="userDTO">
        <g:render template="/user/team/ourTeamUserInfo" model="${[userDTO: userDTO]}" />
    </g:each>
    </div>
</div>