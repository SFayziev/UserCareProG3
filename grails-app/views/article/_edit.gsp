
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">Submit new feedback </h4>
</div>			<!-- /modal-header -->
<g:form controller="article" action="create" method="post" id="${article?.id}" params="${[forumid:forumid]}" >
<div class="modal-body">
    <div class="form-group">
        <label for="headertext">Header*</label>
        <input class="form-control" name="title" value="${article?.title}" id="headertext" placeholder="Short description of your feedback" type="text" required>
    </div>
    <div class="form-group">
        <label >Descriptiont</label>
        <textarea   class="form-control" rows="4" id="articleDesc" name="description">${article?.text}</textarea>
    </div>
    <div class="form-group">
        <label >Post in*</label>
    <select name="postType" class="form-control" required>
        <g:each in="${forumTypes}" var="forumTypeDTO"><option value="${forumTypeDTO.id}" <g:if test="${forumTypeDTO.id==article?.type?.id}"> selected </g:if> >
            <locale:message  proj="${project}" code="topictype.name.$forumTypeDTO.id" default="${forumTypeDTO?.articleTypeDTO?.name}" />
            %{--<g:message code="${forumTypeDTO.i18nvalues}" default="${forumTypeDTO?.alias}"/>--}%
        </option></g:each>
    </select>
    </div>


</div>			<!-- /modal-body -->
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary">Save changes</button>
</div>			<!-- /modal-footer -->
</g:form>
<g:javascript>
    $(document).ready(function() {
        $('#articleDesc').summernote({
            height: 150,
            minHeight: null,
            maxHeight: null,
            focus: true,
            toolbar: [
                ['style', ['style',  'bold', 'italic', 'underline']],
               ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol']],
                ['insert', ['link', 'picture', 'video' , 'table' , 'hr']],
                ['misc', ['codeview', 'fullscreen']]
            ]
        });
    });
</g:javascript>
