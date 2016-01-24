<div id="itemandcomment" class="tag-box tag-box-v1 margin-bottom-10" >

<g:render template="/article/articleItem${article.forumDTO.type.ordinal()}" model="${[module:module,  article: article]}" />
<g:render template="/comment/replies" model="${[article: article, comments:comments]}" />

</div>