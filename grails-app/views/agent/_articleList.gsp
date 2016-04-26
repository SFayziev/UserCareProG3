<g:applyLayout name="moduleLayout" model="${[module:module]}">
    <content tag="moduleContent">
        <g:render template="/project/lastArticle" model="${[module:module]}"/>
    </content>
</g:applyLayout>