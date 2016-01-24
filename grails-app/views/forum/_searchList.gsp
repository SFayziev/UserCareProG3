<div class="tab-v1">
    <ul class="nav nav-tabs">
        <li class="active"><a  data-toggle="tab">${title}</a></li>
    </ul>
    <div class="tab-content profile">
        <g:each in="${lastArticle}" var="article">
            <g:render template="/article/articleItem${article.forumDTO.type.ordinal()}" model="${[article: article, ishort:1]}" />
        </g:each>
    </div>
</div>