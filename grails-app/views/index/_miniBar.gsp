<%@ page import="com.sh.utils.ModulePosType" %>
<div class="col-xs-3  padding-right-5 padding-left-5">
    <g:each in="${modulPos}" var="module">
        <g:if test="${module?.dispos==ModulePosType.Mini}">
            <g:applyLayout name="moduleLayout">
                <content tag="moduleContent">
                    <g:render template="${module?.moduleTypeDTO?.template}" model="${[module:module]}"/>
                </content>
            </g:applyLayout>
        </g:if>
    </g:each>
    <g:render template="/widgets/poweredBy"/>
</div>
