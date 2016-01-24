<div  id="useravatar"  data-userid="${user?.id}" >
    <div class="simple-block text-center">
        %{--<img class="img-responsive" src="${project.projectDesignDTO?.logoFileDTO?.svalue?.originalFilename }" alt="">--}%
        <g:render template="/article/imageByType" model="${[imgid: "userLogo${user?.id}", imgclass: "img-responsive rounded-x",iconclass:'icon-slg',  img:user?.imgDTO ]}" />
        <br>
        <a class="btn btn-primary" href="#" onclick="changeUserAvatar(${user?.id} )"> Change Avatar</a>
        <h3> ${user?.name}</h3>
        <h3> <i class="fa fa-star"></i> <g:formatNumber number="${user?.raitings}" format="#.00"></g:formatNumber> </h3>


    </div>
</div>