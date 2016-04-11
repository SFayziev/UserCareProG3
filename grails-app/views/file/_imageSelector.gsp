
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

    <h4 class="modal-title"><g:message code="module.imageSelector.title" /></h4>
</div>
<div class="modal-body">
    <div class="tab-v1">
        <ul class="nav nav-tabs">
            <g:if test="${withicon}"><li ><a aria-expanded="false" href="#home" data-toggle="tab"><i class="fa fa-flag"></i> <g:message code="module.imageSelector.fa.class" /></a></li></g:if>
            <li class="active"> <a aria-expanded="true" href="#profile" data-toggle="tab"><i class="fa fa-picture-o"></i> <g:message code="module.imageSelector.uploadimg" /></a></li>
        </ul>
        <div class="tab-content">
        <g:if test="${withicon}">
            <div class="tab-pane fade " id="home" >
                <form class="form-horizontal">
                <div class="row">
                    <div class="col col-1 margin-bottom-10">
                        <i class="icon-custom rounded-x icon-bg-u fa  "  id="selIcon"></i>
                        <input type="hidden" id="selIconName"  />

                    </div>
                    <div class="col col-4 input-group demo2">
                        <input type="text" id="selIconColor" value="#00aabb" class="form-control" />


                        <span class="input-group-addon"><i></i></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12" style="height: 200px; overflow-y: scroll;">
                       <g:each in="${faclass}" var="fa">
                           <i class="icon-custom rounded-x  icon-bg-blue icon-color-u fa ${fa.ovalue}" onclick="onFaClassSelect('${fa.ovalue}')"></i>
                       </g:each>
                    </div>
                </div>
                </form>
            </div>
        </g:if>
            <div class="tab-pane fade active in" id="profile">
                <div class="row">
                <div  class="col-md-12">
                    <blockquote class="hero hero-dark text-center bq-text-lg" style="height: 150px" >
                        <p><g:message code="module.imageSelector.drop.here" /></p>

                    </blockquote>

                    <div id="progress" class="progress">
                        <div class="progress-bar progress-bar-success"></div>
                    </div>
                    <br>
                    <span class="btn btn-block btn-success fileinput-button">
                        <span><g:message code="button.select.image" /></span>
                        <input id="fileupload"  type="file" name="files" multiple>
                        %{--<button type="file"  class="btn-u btn-u-lg btn-block btn-u-blue" type="button">Block level button</button>--}%
                    </span>

                </div>
                </div>
            </div>

        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal"><g:message code="button.cancel" /></button>
        <button  id="saveOkBut"  class="btn btn-primary" onclick="saveIcon(); return false; "><g:message code="button.save" /></button>
    </div>


<asset:javascript src="jquery.ui.widget.js"/>
<asset:javascript src="jquery.fileupload.js"/>
%{--<asset:javascript src="jquery.xdr-transport.js"/>--}%
<asset:stylesheet href="jquery.fileupload.css"/>

<script>
    var url ="${uploadUrl.encodeAsRaw()}";
<g:if test="${withicon}">

    function saveIcon(){
        var iconcollor=$('#selIconColor').val();
        var iconname=$('#selIconName').val();
        var data={'iconcollor':iconcollor ,'iconname':iconname , 'imgtype':1};
        $.ajax({  dataType: "json", data:data, url: url })
                .done(function( data ) {
                    var modal =$("#ucmodal");
                    if (data.status=='success') {
                        $( "#"+data.objid).replaceWith( data.value);
                    }
                    modal.modal('hide');
                    $(".modal-backdrop").remove()
                });
        return false;


    }
    $('.demo2').colorpicker({format:'hex'}).on('changeColor.colorpicker', function(event){
        $("#selIcon").attr("style", "background: "  +  event.color.toHex() );

    });

    $(document).ready(function() {  $("#selIcon").attr("style", "background: "  +  $('#selIconColor').val() ) });

    function onFaClassSelect(className){
        $("#selIcon").attr("class", "icon-custom rounded-x icon-bg-u fa " +  className );
        $('#selIconName').val(className)
    }

    </g:if>

    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 2048000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadprocessalways', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
                'width',
                progress + '%'
        );

    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
                'width',
                progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $( "#"+data.result.objid).replaceWith( data.result.value);
        var modal =$("#ucmodal");
        modal.modal('hide');
        $(".modal-backdrop").remove()
    }).on('fileuploadfail', function (e, data) {

    }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');

</script>
</div>