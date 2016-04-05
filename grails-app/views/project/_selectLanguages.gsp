<ul class="dropdown-menu">
    <g:each in="${langs}" var="lang">
        <li  ><a href="?lang=${lang.namesmall}">${lang.name}  (${lang.namesmall}) </a></li>
    </g:each>
</ul>
