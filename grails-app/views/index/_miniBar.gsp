<%@ page import="com.sh.utils.ModulePosType" %>
<div class="side-block col-xs-8 col-sm-4 col-md-3">
    <div class="row">
    <g:each in="${modulPos}" var="module">
        <g:if test="${module?.dispos==ModulePosType.Mini}">
            <g:applyLayout name="moduleLayout" model="${[module:module]}">
                <content tag="moduleContent">
                    <g:render template="${module?.moduleTypeDTO?.template}" model="${[module:module]}"/>
                </content>
            </g:applyLayout>
        </g:if>
    </g:each>
        <g:render template="/widgets/poweredBy"/>
    </div>

</div>
