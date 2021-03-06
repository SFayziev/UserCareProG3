<div class="module-body" data-moduleid="${module?.id}">
<h3><i class="fa fa-comments"></i> Comments </h3>

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
</div>