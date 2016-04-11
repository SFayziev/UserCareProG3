<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h4 class="modal-title">
        <g:if test="${topicStatus?.id}"><g:message code="default.button.edit.label" /> </g:if>
        <g:else><g:message code="default.button.add.label" /></g:else>
    </h4>
</div>
<g:form controller="${params.controller}" action="${params.action}"  id="${params.id}"  class="form-horizontal" role="form" data-toggle="validator" novalidate="novalidate" >
    <div class="modal-body">
        <input type="hidden" name="topicStatus" value="${topicStatus.id}">
        <input type="hidden" name="topictype" value="${params.topictype}">
         <div class="form-group">
            <label class="col-lg-3 control-label"><g:message code="setting.name" /></label>
             <div class="col-lg-8">
                 <div class="input-group m-b">
                     <span class="input-group-btn">
                         <g:if test="${topicStatus?.id}">
                             <button type="button" onclick="translationArticSatus('article.status.name',${params.id},   ${topicStatus?.articleStatusDTO?.id});" class="btn btn-default"><i class="icon-append fa fa-globe" ></i></button>
                         </g:if>
                     </span>
                     <input name="articleStatus.name" class="form-control" value="${topicStatus?.articleStatusDTO?.name}" required  type="text">
                 </div>
             </div>
        </div>

        <div class="form-group">
           <label class="col-lg-3 control-label"><g:message code="article.type" /></label>
            <div class="col-lg-8">
                <g:select class="form-control" name="articleStatus.logicalgroup" from="${['0', '1' ]}" value="${topicStatus?.articleStatusDTO?.logicalgroup }"
                          valueMessagePrefix="setting.community.status.logical.group.type" />
            </div>
        </div>

        <div class="form-group">
           <label class="col-lg-3 control-label"><g:message code="setting.community.status.collor" /></label>
            <div class="col-lg-8">
                <input class="form-control" name="articleStatus.color" id="selColor"  value="${topicStatus?.articleStatusDTO?.color}" required  type="text">
            </div>
        </div>

    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  type="submit"  name="submit" value="save" class="btn btn-primary"><g:message code="button.save" /></button>
    </div>
</g:form>
<script language="JavaScript">
$('#selColor').colorpicker({format:'hex'}).on('changeColor.colorpicker', function(event){
      $("#selColor").attr("style", "color: white ; background: "  +  event.color.toHex() );

  });

  $(document).ready(function() {  $("#selColor").attr("style", "color: white ; background: "  +  $('#selColor').val() ) });


</script>