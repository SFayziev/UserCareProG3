
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title"><g:message code="article.action.MoveTo.title" /></h4>
</div>			<!-- /modal-header -->
<g:form controller="article" action="create" method="post" id="${article?.id}" params="${[forumid:forumid]}" >
    <div class="modal-body">
        <div class="form-group">
            <label><g:message code="forum.title" /></label>
            <select class="form-control" id="forumid" name="forumid">
                <optgroup label="HELPDESK">
                    <option value="48000">Helpdesk</option>
                </optgroup>
                <optgroup label="KNOWLEDGEBASE">
                    <option value="47999">Knowledge base</option>
                </optgroup>
                <optgroup label="CHAT">
                    <option value="49572">Chat history</option>
                </optgroup>
            </select>
        </div>
        <div class="form-group">
            <label ><g:message code="setting.community.topic.type.name" /> </label>
            <textarea   class="form-control" rows="4" id="articleDesc" name="description">${article?.text}</textarea>
        </div>
        <div class="form-group">
            <label ><g:message code="setting.community.category" /></label>

        </div>


    </div>			<!-- /modal-body -->
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
    </div>			<!-- /modal-footer -->
</g:form>
<g:javascript>

</g:javascript>
