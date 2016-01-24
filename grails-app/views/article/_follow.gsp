<g:if test="${isfol}">
<button  class="btn btn-default pull-right btn-follow active"   data-loading-text="<i class='fa fa-refresh fa-spin'></i>" data-content="${id}" data-action="follow" onclick="follow(${id})">
        <i class="fa fa-envelope"></i> <span> <g:message code="article.follow.subscribe"/></span>
</button>
</g:if>
<g:else>
    <button  class="btn btn-default pull-right btn-follow  btn-success"   data-loading-text="<i class='fa fa-refresh fa-spin'></i>"  data-content-id="${id}" data-action="follow" onclick="follow(${id})">
        <i class="fa fa-envelope"></i> <span> <g:message code="article.follow.title"/></span>
    </button>
</g:else>