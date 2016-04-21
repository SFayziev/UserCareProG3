<div  id="votepanel-${article?.id}" class="comment-action-bar">
    <span class="vote-text"><g:message code="article.vote2.title"/></span>
    <button class="btn btn-success" id="voteup-${article?.id}" data-content="${article?.id}" data-action="votearticle" data-vote-value="1"  ><i class="expand-list rounded-x fa fa-thumbs-up"></i>  <g:message code="article.vote2.value.up"/> </button>
    <button class="btn btn-warning" id="votedown-${article?.id}" data-content="${article?.id}" data-action="votearticle" data-vote-value="-1"><i class="expand-list rounded-x fa fa-thumbs-down"></i> <g:message code="article.vote2.value.up"/></button>
    <div id="follow-${article?.id}" class="pull-right"> </div>
</div>
