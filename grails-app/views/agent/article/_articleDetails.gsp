<div id="artilceDeatails">
    <g:if test = "${article}">
        <g:render template="/agent/article/agentTopicActionBar" />
        <g:each in="${modulPos}" var="module">
            <g:applyLayout name="moduleLayout" model="${[module:module]}">
                <content tag="moduleContent">
                    <g:render template="${module?.moduleTypeDTO?.template}" model="${[module:module]}"/>
                </content>
            </g:applyLayout>
        </g:each>
    </g:if>
</div>