<div  id="votepanel-${article?.id}" class="comment-action-bar">
%{--<g:if test="${forum?.votetype!=0}">--}%
    <span class="vote-text hidden-xs"><g:message code="article.vote.title"/></span>
    <button class="btn btn-default" id="voteup-${article?.id}" data-content="${article?.id}" data-action="votearticle" data-vote-value="1"  ><i class="expand-list rounded-x fa fa-thumbs-up"></i> <span>${article?.getVoteup()}</span> </button>
    <g:if test="${forum?.votetype==3}"> <button class="btn btn-default" id="votedown-${article?.id}" data-content="${article?.id}" data-action="votearticle" data-vote-value="-1"><i class="expand-list rounded-x fa fa-thumbs-down"></i> ${article?.getVotedown()}</button></g:if>
%{--</g:if>--}%
    <div id="follow-${article?.id}" class="pull-right"> </div>
</div>
