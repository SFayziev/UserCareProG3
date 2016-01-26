<div  id="articleStats" data-moduleid="${module?.id}" >
    <div class="headline">
        <h2><g:message code="widget.community.stats.title" /></h2>
    </div>

    <ul class="list-unstyled">
        <li>
            <span class="badge pull-right">${projectStats?.people}</span>
            <i class="fa fa-fw fa-users"></i> <g:message code="widget.community.stats.people" />
        </li>

        <li>
            <span class="badge pull-right">${projectStats?.articles}</span>
            <i class="fa fa-fw fa-file-text"></i> <g:message code="widget.community.stats.topic" />
        </li>

        <li>
            <span class="badge pull-right">${projectStats?.comments}</span>
            <i class="fa fa-fw fa-comments"></i> <g:message code="widget.community.stats.comment" />
        </li>

        <li>
            <span class="badge pull-right">${projectStats?.votes}</span>
            <i class="fa fa-fw fa-thumbs-up"></i> <g:message code="widget.community.stats.votes" />
        </li>
    </ul>
    <h3> <g:message code="widget.community.stats.staff" /></h3>
    <div class="row margin-left-10">
        <g:each in="${staffs}" var="staff">   <g:render template="/article/userImage" model="${[userDTO:staff]}" /></g:each>
    </div>
</div>