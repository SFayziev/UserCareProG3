<div id="article-${article?.id}"  data-article-id="${article?.id}" class="content ">
    <div class="testimonials-info">



        <div class="overflow-h">
            <div class="title">
                <g:render template="/file/imageByTypeS" model="${[imgid: "imglinks${topicType?.id}",  img:topicType?.articleTypeDTO?.imgDTO  ]}" />
                <g:link controller="article" action="item" id="${article.id}" >${article.title}</g:link>
            </div>
        </div>
        <g:if test="${1 != ishort}">
            <div class="comment-info">
                ${article?.text.encodeAsRaw()}
            </div>
        </g:if>
        <g:render template="/article/articleVoter" model="${[article: article]}" />
    </div>
</div>
