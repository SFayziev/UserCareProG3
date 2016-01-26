<g:applyLayout name="userMain">
    <content tag="mainContent1">
    <g:render template="profileBreadCrumb" model="${[btitle: 'widget.community.stats.comment']}"/>
    <div class="tag-box tag-box-v1 margin-bottom-10">
        <g:each in="${comments}" var="comment">
            <g:render template="/comment/userComments" model="${[comment:comment]}"/>
        </g:each>
        <div class="text-center">
            <g:paginate total="${total}"  maxsteps="4" max="${maxRecords}"    params="${params}" controller="user" action="comments"/>
        </div>
     </div>
    </content>
</g:applyLayout>
