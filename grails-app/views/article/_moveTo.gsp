
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title"><g:message code="article.action.MoveTo.title" /></h4>
</div>			<!-- /modal-header -->
<g:form controller="article" action="moveto" method="post" id="${params.id}"  >
    <div class="modal-body">
        <div class="form-group">
            <label for="forumid"><g:message code="forum.title" /></label>
            <select class="form-control" id="forumid" name="forumid">
                <g:if test="${communitys}">
                    <optgroup label="<g:message code="forum.type2"/>">
                    <g:each in="${communitys}" var="community">
                        <option <g:if test="${forumid==community.id}">selected</g:if> value="${community.id}">
                            <locale:message  proj="${project}" code="forum.title.${community.id}" default="${community.name}" />
                        </option>
                    </g:each>
                    </optgroup>
                </g:if>
                <g:if test="${knowledgebases}">
                <optgroup label="<g:message code="forum.type1"/>">
                    <g:each in="${knowledgebases}" var="knowledgebase">
                        <option <g:if test="${forumid==knowledgebase.id}">selected</g:if> value="${knowledgebase.id}">
                            <locale:message  proj="${project}" code="forum.title.${knowledgebase.id}" default="${knowledgebase.name}" />
                        </option>
                    </g:each>
                </optgroup>
            </g:if>
                <g:if test="${helpdesks}">
                    <optgroup label="<g:message code="forum.type0"/>">
                        <g:each in="${helpdesks}" var="helpdesk">
                            <option <g:if test="${forumid==helpdesk.id}">selected</g:if>  value="${helpdesk.id}">
                                <locale:message  proj="${project}" code="forum.title.${helpdesk.id}" default="${helpdesk.name}" />
                            </option>
                        </g:each>
                    </optgroup>
                </g:if>

            </select>
        </div>
        <div class="form-group">
            <label for="forumtypeid"><g:message code="setting.community.topic.type.name" /> </label>
            <select class="form-control" name="forumtypeid" id ="forumtypeid"></select>
        </div>
        <div  class="form-group">
            <label for="forumcategoryid"><g:message code="setting.community.category" /></label>
            <select class="form-control" name="forumcategoryid" id ="forumcategoryid"></select>
        </div>


    </div>			<!-- /modal-body -->
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" name="submit" value="save" class="btn btn-primary">Save changes</button>
    </div>			<!-- /modal-footer -->
</g:form>
<g:javascript>
    getforumParams();
    $('#forumid').change(function(){ getforumParams() });

function getforumParams(){
    var forumid=$( "#forumid" ).val();
    var data={'id':forumid};

    $.ajax({  dataType: "json", data:data, url:  "/forum/getforumparams/"})
            .done(function( data ) {
        if (data.status=='success') {
            $("#forumtypeid").html(data.forumoptions)
            $("#forumcategoryid").html(data.forumcategory)
        }
    });
    return false;
}

</g:javascript>
