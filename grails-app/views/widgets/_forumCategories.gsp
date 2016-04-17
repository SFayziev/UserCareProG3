<div class="module-body" data-moduleid="${module?.id}">

    <dl>
        <dt><g:message code="setting.leftMenu.community.categories" /></dt>
        <g:each in="${categories}" var="category">
            <dd>
                <span class="badge pull-right">${category?.articles}</span>
                <g:link controller="forum" action="list" id="${module.forumid}" params="${[category:category?.id ]}"><locale:message  proj="${UCproject}" code="category.name.${category?.id}" default="${category?.name}" /></g:link>
            </dd>
        </g:each>
    </dl>
</div>