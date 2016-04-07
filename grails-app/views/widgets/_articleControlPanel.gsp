
<div  id="linksForm" data-moduleid="${module?.id}"  data-article-id="${article?.id}" class="module-body">
    <div class="headline">
        <h2><g:message code="article.controlPanel.Title"/></h2>
    </div>
    <ul class="list-group ">
        <li class="list-group-item  list-toggle">
            <a  class="accordion-toggle" href="#collapse-status" data-toggle="collapse"><i class="fa fa-exchange"></i> <g:message code="article.action.change.status"/></a>
        <ul id="collapse-status" class="collapse">
            <g:each in="${forumStatuses}" var="forumStatus">
                <li><a  href="#" data-content="${article.id}" data-action="articleChangeStatus" data-status-value="${forumStatus.articleStatusDTO?.id}"  data-forumid="${article.forumDTO.id}">
                    <locale:message  proj="${UCproject}" code="article.status.name.${forumStatus.articleStatusDTO?.id}" default="${forumStatus.articleStatusDTO?.name}" /></a></li>
            </g:each>
        </ul>
        </li>
        <li class="list-group-item">
            <a href="#" data-action="replycomment" ><i class="fa fa-reply"></i> <g:message code="article.action.Reply"/></a>
        </li>
        <li class="list-group-item">
            <a  data-toggle="modal" href="/article/edit/${article.forumDTO.id}/${article.id}" data-target="#ucmodal" data-content="${article.id}" data-action="articleEdit"  ><i class="fa fa-edit"></i> <g:message code="article.action.Edit"/></a>
        </li>
        <li class="list-group-item list-toggle">
            <a  class="accordion-toggle" href="#collapse-tags" data-toggle="collapse"><i class="fa fa-tags"></i> <g:message code="setting.leftMenu.community.tags"/></a>
            <ul id="collapse-tags" class="collapse">
                <g:each in="${tags}" var="tag">
                    <li><a href="#" data-assignid="${tag?.id}" data-action="articleAssignTags" ><locale:message  proj="${UCproject}" code="tag.name.${tag?.id}" default="${tag?.name}" /> </a></li>
                </g:each>
            </ul>
        </li>
        <li class="list-group-item list-toggle">
            <a  class="accordion-toggle" href="#collapse-categorys" data-toggle="collapse"><i class="fa fa-folder-open"></i> <g:message code="setting.leftMenu.community.categories"/></a>
            <ul id="collapse-categorys" class="collapse">
                <g:each in="${categorys}" var="category">
                    <li><a href="#" data-assignid="${category?.id}" data-action="articleAssignCategory" ><locale:message  proj="${UCproject}" code="category.name.${category?.id}" default="${category?.name}" /> </a></li>
                </g:each>
            </ul>
        </li>

        <li class="list-group-item list-toggle">
            <a  class="accordion-toggle" href="#collapse-forms" data-toggle="collapse"><i class="fa fa-users"></i> <g:message code="article.action.AssignTo"/></a>
            <ul id="collapse-forms" class="collapse">
                <g:each in="${staffs}" var="staff">
                    <li><a href="#" data-assignid="${staff?.id}" data-action="articleAssignTo" >${staff?.username} </a></li>
                </g:each>
            </ul>
        </li>
        <li class="list-group-item">
            <a href="#" data-content="${article.id}" data-action="articleTranslate" data-status-value="${articleStatus?.id}" ><i class="fa fa-globe"></i> <g:message code="article.action.Translations"/></a>
        </li>
        <li class="list-group-item">
            <a href="#" data-content="${article.id}" data-action="getAditionalInfo" data-status-value="${articleStatus?.id}" ><i class="fa fa-info"></i> <g:message code="article.action.Additional.information"/></a>
        </li>
        <li class="list-group-item">
            <a  data-toggle="modal" href="/article/moveto/${article.forumDTO.id}/${article.id}" data-target="#ucmodal" data-content="${article.id}" data-action="articleEdit" ><i class="fa fa-info"></i> <g:message code="article.action.MoveTo"/></a>
        </li>
        <li class="list-group-item">
            <a  data-toggle="modal" href="/article/delete/${article.forumDTO.id}/${article.id}" data-target="#myModalDelete" ><i class="fa fa-trash"></i> <g:message code="article.action.Delete"/></a>
        </li>
    </ul>
</div>
