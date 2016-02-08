
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title"><g:message code="article.action.MoveTo.title" /></h4>
</div>			<!-- /modal-header -->
<g:form controller="article" action="moveto" method="post" id="${article?.id}" params="${[forumid:forumid]}" >
    <div class="modal-body">
        <div class="form-group">
            <label for="forumid"><g:message code="forum.title" /></label>
            <select class="form-control" id="forumid" name="forumid">
                <optgroup label="HELPDESK">
                    <option value="37">Helpdesk</option>
                </optgroup>
                <optgroup label="KNOWLEDGEBASE">
                    <option value="38">Knowledge base</option>
                </optgroup>
                <optgroup label="CHAT">
                    <option value="49572">Chat history</option>
                </optgroup>
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
        <button type="submit" class="btn btn-primary">Save changes</button>
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
