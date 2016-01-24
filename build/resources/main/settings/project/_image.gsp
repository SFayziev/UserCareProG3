<div class="row">
    <div  class="col-md-4">
        <h2><g:message code="setting.project.design.logo"/></h2>
        <div  class="img_logo  thumbnail-style  text-center">
            <g:render template="/article/imageByType" model="${[imgid: "imglogo", imgclass: "img-responsive", iconclass:'icon-slg' , img:project.projectDesignDTO?.logoFileDTO ]}" />
        %{--<img  id="imglogo" class="img-responsive" src="${project.projectDesignDTO?.logoFileDTO?.svalue?.originalFilename }" alt="">--}%

        </div>
        <span class="btn btn-success fileinput-button">
            <i class="fa fa-plus"></i>
            <span><g:message code="button.change" /></span>
            <!-- The file input field used as target for the file upload widget -->
            <input onclick="changeProjectImg('logo')" >
        </span>

        <br>
    </div>


    <div  class="col-md-4">
        <h2><g:message code="setting.project.design.bgimage"/></h2>
        <div  class="img_logo  thumbnail-style">
            <img  id="imgbg" class="img-responsive" src="${project.projectDesignDTO?.bgimageFileDTO?.svalue?.originalFilename }" alt="">

        </div>
        <span class="btn btn-success fileinput-button">
            <i class="fa fa-plus"></i>
            <span><g:message code="button.change" /></span>
            <!-- The file input field used as target for the file upload widget -->
            <input  onclick="changeProjectImg('bg')">
        </span>

        <br>
    </div>

    <div  class="col-md-4">
        <h2><g:message code="setting.project.design.favicon"/></h2>
        <div  class="img_logo  thumbnail-style  text-center">
            <img  id="imgicon" class="img-responsive" src="${project.projectDesignDTO?.faviconFileDTO?.svalue?.originalFilename }" alt="">

        </div>
        <span class="btn btn-success fileinput-button">
            <i class="fa fa-plus"></i>
            <span><g:message code="button.change" /></span>
            <!-- The file input field used as target for the file upload widget -->
              <input  onclick="changeProjectImg('icon')">
        </span>
        <br>
    </div>

    <div id="progress" class="progress">
        <div class="progress-bar progress-bar-success"></div>
    </div>

</div>

<div id="imageSelector"  class="modal fade" id="" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

            </div>
            Loading ...
        </div><!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>



<script>

    function changeProjectImg(type){

        var modal =$("#imageSelector");
        var url= '/file/projectImageSelector/?type=' +type;
        if (type=='logo'){url=url+'&withicon=1'}

        modal.removeData('bs.modal');
        modal.modal({remote: url });
        modal.modal('show');
        return false;
    }



</script>