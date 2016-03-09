<ul class="languages hoverSelectorBlock">
    <g:each in="${langs}" var="lang">
        <li  ><a href="?lang=${lang.namesmall}">${lang.name}</a></li>
    </g:each>
    %{--<li--}%
        %{--<g:if test="${lang=='English'}">class="active"</g:if> >--}%
        %{--<a href="?lang=en">English</a>--}%
    %{--</li>--}%
    %{--<li <g:if test="${lang=='Spanish'}">class="active"</g:if> ><a href="?lang=es">Spanish</a></li>--}%
    %{--<li  <g:if test="${lang=='Russian'}">class="active"</g:if> ><a href="?lang=ru">Russian</a></li>--}%
    %{--<li  <g:if test="${lang=='German'}">class="active"</g:if>><a href="?lang=de">German</a></li>--}%
</ul>
