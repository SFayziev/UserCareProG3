<div class="row" id="projStats" data-moduleid="${module?.id}" >
    <div class="col-xs-4 col-sm-4  text-center">
        <g:link controller="forum" action="list" id="${forum.id}" params="${[status:0]}">Unmarked topics</g:link>
        <p><h2>${pageCount?.getUnmarkedTopic()}</h2><p>
    </div>

    <div class="col-xs-4 col-sm-4  text-center">
        <g:link controller="forum" action="list" id="${forum.id}" params="${[status:-10]}">Active topics</g:link>

        <p><h2>${pageCount?.getActiveTopic()}</h2><p>
    </div>

    <div class="col-xs-4 col-sm-4  text-center">
        <g:link controller="forum" action="list" id="${forum.id}" params="${[status:-20]}">Closed topics</g:link>
        <p><h2>${pageCount?.getClosedTopic()}</h2><p>
    </div>
</div>
