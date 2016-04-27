<g:applyLayout name="agentMain">
    <content tag="mainContent1">
        <agent:searchPanel/>


            <div class="row">
            <div class="col-xs-5">

                <agent:listArticle params="${[project:UCproject,   params:params]}" />

            </div>
            <div class="col-xs-7">
                <g:render template="/agent/articleDetails" />
            </div>


            </div>
        %{--</div>--}%
    </content>
</g:applyLayout>