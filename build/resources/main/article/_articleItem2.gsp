<div id="article-${article?.id}"  data-article-id="${article?.id}" class="content-boxes-v2-o">
    <div class="testimonials-info">
        <h2 class="heading-sm overflow-h">
            <span><i class="fa  fa-file"></i>  <g:link controller="article" action="item" id="${article.id}" >${article.title}</g:link> </span>
        </h2>
        <g:if test="${1 != ishort}">
            <div class="clearfix margin-bottom-20"><p>${article?.text.encodeAsRaw() } </p></div>
        </g:if>
        <g:render template="/article/articleVoter" model="${[article: article]}" />
    </div>
</div>
