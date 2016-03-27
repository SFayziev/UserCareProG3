<div  id="linksForm"  data-moduleid="${module?.id}" >
    <div class="simple-block text-center">
        %{--<img class="img-responsive" src="UCproject:.projectDesignDTO?.logoFileDTO?.svalue?.originalFilename }" alt="">--}%
        <g:render template="/file/imageByType" model="${[imgid: "prjlogo", imgclass: "img-responsive",iconclass:'icon-slg',  img:UCproject.projectDesignDTO?.logoFileDTO ]}" />

    </div>
</div>