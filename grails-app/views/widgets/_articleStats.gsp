<div class="module-body" data-moduleid="${module?.id}">
    <dl>
        <dt> <g:message code="widget.article.stats.title" /></dt>
        <dd>
            <span class="badge pull-right">${article?.votes}</span>
            <i class="fa fa-fw fa-file-text"></i> <g:message code="widget.article.stats.votes" />
        </dd>

        <dd>
            <span class="badge pull-right">${article?.views}</span>
            <i class="fa fa-fw fa-comments"></i>  <g:message code="widget.article.stats.views" />
        </dd>

        <dd>
            <span class="badge pull-right">${article?.comments}</span>
            <i class="fa fa-fw fa-thumbs-up"></i> <g:message code="widget.article.stats.comment" />
        </dd>
        <dd>
            <span class="badge pull-right">${article?.followers}</span>
            <i class="fa fa-fw fa-thumbs-up"></i> <g:message code="widget.article.stats.followers" />
        </dd>

    </dl>
</div>