<div class="row">
<ul class=" breadcrumb">
    <g:if test="${forum}"><li><b> <g:message code="forum.title" />:</b> <a href="/list/${forum?.id}/">${forum?.name}</a></li></g:if>
    <g:if test="${catalog}"> <li><a href="/list/${forum?.id}/${catalog?.id}">${catalog?.name}</a></li></g:if>
    %{--<g:if test="${forum}"> <li><a href="#">Features</a></li></g:if>--}%
</ul>
</div>