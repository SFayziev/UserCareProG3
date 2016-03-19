<g:if test="${tags}">
<ul class="list-unstyled list-inline blog-tags">
    <li>
        <g:each in="${tags}" var="tag">
            <a href="#" data-content="${tag.id}" data-action="deleteAssignTags">  <i class="fa fa-tags"></i> <locale:message  proj="${UCproject}" code="tag.name.${tag?.id}" default="${tag?.name}" /> </a>
        </g:each>
    </li>
</ul>
</g:if>
