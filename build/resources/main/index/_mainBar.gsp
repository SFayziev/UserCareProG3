<%@ page import="com.sh.utils.ModulePosType" %>
<div id="mainBar" class="col-xs-9 padding-right-5 padding-left-5 ">
    <g:each in="${modulPos}" var="module">
        <g:if test="${module?.dispos==ModulePosType.Main}">
            <div class="<g:if test="${customize}">customisation_mode </g:if> tag-box tag-box-v1 margin-bottom-10"  >
            <g:if test="${customize}">
                <div class="action_buttons">
                    <button class="btn btn-primary btn-sm" data-action="widgetUP" data-content="${module?.id}" type="button"><i class="fa fa-arrow-up "></i></button>
                    <button class="btn btn-primary btn-sm" data-action="widgetDOWN" data-content="${module?.id}" type="button"><i class="fa fa-arrow-down "></i></button>
                    <g:if test="${module?.moduleTypeDTO?.editable==true}"><button class="btn btn-primary btn-sm" data-action="widgetEDIT" data-content="${module?.id}"  type="button"><i class="fa fa-cog "></i></button></g:if>
                    <g:if test="${module.params?.title}"><button class="btn btn-primary btn-sm" data-action="widgetTranslate" data-content="${module?.id}"  type="button" ><i class="icon-append fa fa-globe" ></i></button></g:if>
                    <g:if test="${!module?.moduleTypeDTO?.undeletable==true}"><button class="btn btn-danger btn-sm" data-action="widgetDELETE" data-content="${module?.id}" type="button"><i class="fa fa-trash "></i></button></g:if>
                </div>
            </g:if>
            <g:render template="${module?.moduleTypeDTO?.template}" model="${[module:module]}"/>
                <g:if test="${customize}"><div class="overDiv" ></div></g:if>
            </div>
        </g:if>
    </g:each>
</div>