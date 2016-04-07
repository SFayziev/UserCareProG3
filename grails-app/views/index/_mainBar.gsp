<%@ page import="com.sh.utils.ModulePosType" %>
<div id="mainBar" class="main-block col-xs-12 col-sm-8 col-md-9">
    <div class="row">
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
</div>