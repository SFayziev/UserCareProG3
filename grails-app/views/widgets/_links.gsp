<div  id="linksForm" data-moduleid="${module?.id}" >
    <div class="headline">
        <h2><g:message code="widget.links.title" /></h2>
    </div>
    <ul class="list-unstyled">
<g:each in="${links}" var="link">
    <li>
        <g:render template="/file/imageByTypeS" model="${[imgid: "imglinks${link?.id}",  img:link?.imgDTO ]}" />
        <a href="${link.links}" target="_blank">${link.title}</a>
    </li>
</g:each>
    </ul>
</div>