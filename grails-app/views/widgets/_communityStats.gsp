<div class="module-body" data-moduleid="${module?.id}">

    <dl>
        <dt><g:message code="widget.community.stats.title" /></dt>
        <dd>
            <span class="badge pull-right">${projectStats?.people}</span>
            <i class="fa fa-fw fa-users"></i> <g:message code="widget.community.stats.people" />
        </dd>

        <dd>
            <span class="badge pull-right">${projectStats?.articles}</span>
            <i class="fa fa-fw fa-file-text"></i> <g:message code="widget.community.stats.topic" />
        </dd>

        <dd>
            <span class="badge pull-right">${projectStats?.comments}</span>
            <i class="fa fa-fw fa-comments"></i> <g:message code="widget.community.stats.comment" />
        </dd>

        <dd>
            <span class="badge pull-right">${projectStats?.votes}</span>
            <i class="fa fa-fw fa-thumbs-up"></i> <g:message code="widget.community.stats.votes" />
        </dd>
    </dl>

    <div class="staff">
        <h3> <g:message code="widget.community.stats.staff" /></h3>
        <div class="staff-list">
        <g:each in="${staffs}" var="staff">   <g:render template="/user/userImage" model="${[userDTO:staff]}" /></g:each>
        </div>
    </div>
</div>