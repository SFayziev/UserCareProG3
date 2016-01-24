<div  id="articleStats"  data-moduleid="${module?.id}" >
    <div class="headline">
        <h2><g:message code="widget.article.stats.title" /></h2>
    </div>

    <ul class="list-unstyled">
        <li>
            <span class="badge pull-right">${article?.votes}</span>
            <i class="fa fa-fw fa-file-text"></i> <g:message code="widget.article.stats.votes" />
        </li>

        <li>
            <span class="badge pull-right">${article?.views}</span>
            <i class="fa fa-fw fa-comments"></i>  <g:message code="widget.article.stats.views" />
        </li>

        <li>
            <span class="badge pull-right">${article?.comments}</span>
            <i class="fa fa-fw fa-thumbs-up"></i> <g:message code="widget.article.stats.commnet" />
        </li>
        <li>
            <span class="badge pull-right">${article?.followers}</span>
            <i class="fa fa-fw fa-thumbs-up"></i> <g:message code="widget.article.stats.followers" />
        </li>
    </ul>
</div>