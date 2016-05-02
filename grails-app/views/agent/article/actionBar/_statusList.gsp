<ul role="menu" class="dropdown-menu">
    <g:each in="${forumStatuses}" var="forumStatus">
        <li><a  href="#" data-content="${article.id}" data-action="articleChangeStatus" data-status-value="${forumStatus.articleStatusDTO?.id}"  data-forumid="${article.forumDTO.id}">
            <locale:message  proj="${UCproject}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" /></a></li>
    </g:each>
</ul>