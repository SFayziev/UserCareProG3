<g:applyLayout name="moduleContent">

    <content tag="mainContent1">
        <div id="mainBar" class="col-xs-9 padding-right-5 padding-left-5 ">
            <g:render template="team/ourTeam"/>
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
        </div>

    </content>
    <content tag="menuContent1">
        <g:render template="/index/miniBar"/>
    </content>
</g:applyLayout>
