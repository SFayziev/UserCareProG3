<g:applyLayout name="agentMain">
    <content tag="mainContent1">
        <agent:searchPanel/>
        <div class="row">
        <agent:listArticle params="${[project:UCproject,   params:params]}" />
        %{--<agent:aticleDeatails params="${[project:UCproject,   params:params]}"/>--}%

        </div>

    </content>
</g:applyLayout>