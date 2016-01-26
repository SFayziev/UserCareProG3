<div  id="linksForm" data-moduleid="${module?.id}" >
    <div class="headline">
        <h2><g:message code="setting.leftMenu.community.categories" /></h2>
    </div>
    <ul class="list-unstyled">
        <g:each in="${categories}" var="category">
            <li>
                <span class="badge pull-right">${category?.articles}</span>
                <i class="fa fa-fw fa-rss-square"></i>
                <g:link controller="forum" action="list" id="${module.forumid}" params="${[category:category?.id ]}"><locale:message  proj="${project}" code="category.name.${category?.id}" default="${category?.name}" /></g:link>
            </li>
        </g:each>
    </ul>
</div>