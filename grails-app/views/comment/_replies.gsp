<div class="row no-margin" >
    <h2 class="heading-sm pull-left"><i class="fa fa-comments"></i>Comments</h2>
    <a href="#"><i class="fa fa-cog pull-right"></i></a>
</div>
<g:if test="${article?.disabled}">
    <g:render template="/comment/commentDisabled" />
</g:if>
<g:else>
    <g:render template="/comment/commentTemplate" />
</g:else>
<div class="comments-list" data-article-id="${article?.id}">
    <g:each in="${comments}" var="comment">
        <g:render template="/comment/repliesItem" model="${[comment: comment]}" />
    </g:each>
</div>