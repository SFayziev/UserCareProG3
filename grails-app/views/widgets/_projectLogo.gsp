<div  id="linksForm"  data-moduleid="${module?.id}" >
    <div class="simple-block text-center">
        %{--<img class="img-responsive" src="${project.projectDesignDTO?.logoFileDTO?.svalue?.originalFilename }" alt="">--}%
        <g:render template="/article/imageByType" model="${[imgid: "prjlogo", imgclass: "img-responsive",iconclass:'icon-slg',  img:project.projectDesignDTO?.logoFileDTO ]}" />

    </div>
</div>