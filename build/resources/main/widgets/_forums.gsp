<div id="forumStats"  data-moduleid="${module?.id}" >
    <g:if test="${communitys}">
        <dl>
       <dt> <g:message code="forum.type2" /></dt>
            <g:each in="${communitys}" var="community">
                <dd>
                   <g:link  controller="list" action="${community.id}">
                       <span class="badge pull-right">${community.articles}</span>
                       <locale:message  proj="${project}" code="forum.title.${community.id}" default="${community.name}" />
                   </g:link>
                </dd>
            </g:each>
        </dl>
    </g:if>
    <g:if test="${knowledgebases}">
        <dl>
        <dt> <g:message code="forum.type1" /></dt>

        <g:each in="${knowledgebases}" var="knowledgebase">
            <dd>
                <g:link  controller="list" action="${knowledgebase.id}">
                    <span class="badge pull-right ">${knowledgebase.articles}</span>
                    <locale:message  proj="${project}" code="forum.title.${knowledgebase.id}" default="${knowledgebase.name}" />

            </g:link>
            </dd>
        </g:each>

        </dl>
    </g:if>
</div>