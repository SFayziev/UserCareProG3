<ul role="menu" class="dropdown-menu">
    <g:each in="${staffs}" var="staff">
        <li><a href="#" data-assignid="${staff?.id}" data-action="articleAssignTo" >${staff?.username} </a></li>
    </g:each>
</ul>