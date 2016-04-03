<div class="row">
    <div class="col-sm-4">
        <g:render template="team/topContributors"/>
    </div>
    <div class="col-sm-4">
        <g:render template="team/topCommenters" model="${[usersTopCommenters:usersTopCommenters]}"/>
    </div>
    <div class="col-sm-4">
        <g:render template="team/newFaces"/>
    </div>
</div>