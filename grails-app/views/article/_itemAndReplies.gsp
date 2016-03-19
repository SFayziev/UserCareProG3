<div id="itemandcomment" class="tag-box tag-box-v1 margin-bottom-10" >
    <g:render template="/article/articleBreadcrumb"/>
    <g:render template="/modules/articleDetails" model="${[project:UCproject, forum:forum ,  module:module, article:article,  params:params]}" />
    <g:render template="/comment/replies" model="${[article: article, comments:comments]}" />
</div>