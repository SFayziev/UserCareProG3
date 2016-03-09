<div class=" tag-box tag-box-v1 margin-bottom-10"  >
    <div class="headline">
        <h2><g:message code="user.team.top.contributors" /></h2>
    </div>
    <g:each in="${usersTopContributors}" var="userDTO">
        <g:render template="/user/team/topContributorsUserInfo" model="${[userDTO: userDTO, showcontributor:true ]}" />
    </g:each>


</div>