<%@ page import="com.sh.utils.ModulePosType" %>
<div id="mainBar" class="col-xs-9 padding-right-5 padding-left-5 ">
    <g:each in="${modulPos}" var="module">
        <g:if test="${module?.dispos==ModulePosType.Main}">
            <g:applyLayout name="moduleLayout" model="${[module:module]}">
                <content tag="moduleContent">
                    <g:render template="${module?.moduleTypeDTO?.template}" model="${[module:module]}"/>
                </content>
            </g:applyLayout>
        </g:if>
    </g:each>
</div>