<div class="module-body" data-moduleid="${module?.id}">
    <dl>
        <dt><g:message code="widget.links.title" /></dt>
        <g:each in="${links}" var="link">
            <dd>
                <g:render template="/file/imageByTypeS" model="${[imgid: "imglinks${link?.id}",  img:link?.imgDTO ]}" />
                <a href="${link.links}" target="_blank">${link.title}</a>
            </dd>
        </g:each>
    </dl>
</div>