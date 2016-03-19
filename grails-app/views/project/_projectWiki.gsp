<div id="wikiItems" data-moduleid="${module?.id}" >
<g:each in="${knowledgeForums}" var="forum">
    <div class="headline">
        <h2><g:render template="/article/imageByType" model="${[imgid: "forumlogo${forum.id}", imgclass: "img-responsive", iconclass: 'icon-sm', img:forum?.imgDTO]}" />
            <a href="/list/${forum?.id}/"><locale:message  proj="${UCproject}" code="forum.module.title.${module?.id}" default="${module?.params?.title?.value}" /></a>
        </h2>
    </div>
<div class="row multi-columns-row">
    <g:each in="${categoriesDTOs}" var="knowledgebase">
    <g:render template="/project/projectwikiItem" model="[forum:forum,  knowledgebase: knowledgebase]" />
    </g:each>
</div>
</g:each>
</div>
