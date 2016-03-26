<div  id="linksForm" data-moduleid="${module?.id}" >
    <div class="headline">
        <h2><g:message code="widget.links.title" /></h2>
    </div>
    <ul class="list-unstyled">
<g:each in="${links}" var="link">
    <li>
        <i class="fa fa-fw fa-rss-square"></i>
        <a href="${link.links}" target="_blank">${link.title}</a>
    </li>
</g:each>

        %{--<li>--}%
            %{--<i class="fa fa-fw fa-rss-square"></i>--}%
            %{--<a href="" target="_blank">Activity feed</a>--}%
        %{--</li>--}%
        %{--<li>--}%
            %{--<i class="fa fa-fw fa-link"></i>--}%
            %{--<a target="_blank" href="${UCproject.url}">Наш веб-сайт</a>--}%
        %{--</li>--}%

        %{--<li>--}%
            %{--<i class="fa fa-fw fa-group" ></i>--}%

            %{--<a href="/team">Наша команда</a>--}%
        %{--</li>--}%
    </ul>
</div>