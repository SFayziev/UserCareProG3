<div class="<g:if test="${customize}">customisation_mode </g:if> module ${module?.moduleTypeDTO?.cssclass}"  >

    <g:if test="${customize}">
        <div class="action_buttons">
            <button class="btn btn-primary btn-sm" data-action="widgetUP" data-displaymode="${params.vtype}" data-content="${module?.id}" type="button"><i class="fa fa-arrow-up "></i></button>
            <button class="btn btn-primary btn-sm" data-action="widgetDOWN" data-displaymode="${params.vtype}" data-content="${module?.id}" type="button"><i class="fa fa-arrow-down "></i></button>
            <g:if test="${module?.moduleTypeDTO?.editable==true}"><button class="btn btn-primary btn-sm" data-action="widgetEDIT" data-content="${module?.id}"  type="button"><i class="fa fa-cog "></i></button></g:if>
            <g:if test="${module?.params?.title}"><button class="btn btn-primary btn-sm" data-action="widgetTranslate" data-content="${module?.id}"  type="button" ><i class="icon-append fa fa-globe" ></i></button></g:if>
            <g:if test="${!module?.moduleTypeDTO?.undeletable==true}"><button class="btn btn-danger btn-sm" data-action="widgetDELETE" data-content="${module?.id}" type="button"><i class="fa fa-trash "></i></button></g:if>
        </div>
    </g:if>
    <g:pageProperty name="page.moduleContent"/>
    <g:if test="${customize}"><div class="overDiv" ></div></g:if>

</div>