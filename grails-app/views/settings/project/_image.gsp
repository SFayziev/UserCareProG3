<div class="row">
    <div  class="col-md-4">
        <h2><g:message code="setting.project.design.logo"/></h2>
        <div  class="img_logo  thumbnail-style  text-center">
            <g:render template="/file/imageByType" model="${[imgid: "imglogo", imgclass: "img-responsive", iconclass:'icon-slg' , img:UCproject.projectDesignDTO?.logoFileDTO ]}" />
        %{--<img  id="imglogo" class="img-responsive" src="UCproject:.projectDesignDTO?.logoFileDTO?.svalue?.originalFilename }" alt="">--}%

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
            <img  id="imgbg" class="img-responsive" src="UCproject:.projectDesignDTO?.bgimageFileDTO?.svalue?.originalFilename }" alt="">

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
            <img  id="imgicon" class="img-responsive" src="UCproject:.projectDesignDTO?.faviconFileDTO?.svalue?.originalFilename }" alt="">

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

<script>

    function changeProjectImg(type){

        var modal =$("#ucmodal");
        var url= '/file/projectImageSelector/?type=' +type;
        if (type=='logo'){url=url+'&withicon=1'}

        modal.removeData('bs.modal');
        modal.modal({remote: url });
        modal.modal('show');
        return false;
    }



</script>