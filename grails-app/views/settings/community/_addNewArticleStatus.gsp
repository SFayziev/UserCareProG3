<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${forumStatus?.id}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="default.button.add.label" /></g:else>
    </h4>
</div>
<g:form controller="${params.controller}" action="${params.action}"  id="${params.id}" class="sky-form" style="border: none;" >
    <div class="modal-body">
        <input type="hidden" name="forumStatus" value="${params.forumStatus}">
        <section>
            <label class="label"><g:message code="setting.name" /></label>
            <label class="input state-success">
                <g:if test="${forumStatus?.id}"><i class="icon-append fa fa-globe" onclick="translationArticSatus('article.status.name',${params.id},   ${forumStatus?.articleStatusDTO?.id});"></i></g:if>
                <input name="articleStatus.name" class="form-control" value="${forumStatus?.articleStatusDTO?.name}" required  type="text">
            </label>
        </section>

        <section>
            <label class="label"><g:message code="article.type" /></label>
            <label class="select state-success">
                %{--<label for="firstreplystatus" class="select state-success">--}%
                <g:select name="articleStatus.logicalgroup" from="${['0', '1' ]}" value="${forumStatus?.articleStatusDTO?.logicalgroup }"
                          valueMessagePrefix="setting.community.status.logical.group.type" />
                <i></i>

            </label>

        </section>

        <section>
            <label class="label"><g:message code="setting.community.status.collor" /></label>
            <label class="input state-success">
                <input name="articleStatus.color" id="selColor" class="form-control" value="${forumStatus?.articleStatusDTO?.color}" required  type="text">
            </label>
        </section>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
    </div>
</g:form>
<script>
$('#selCollor').colorpicker({format:'hex'}).on('changeColor.colorpicker', function(event){
      $("#selCollor").attr("style", "color: white ; background: "  +  event.color.toHex() );

  });

  $(document).ready(function() {  $("#selCollor").attr("style", "color: white ; background: "  +  $('#selCollor').val() ) });


</script>