<div class="module-body" data-moduleid="${module?.id}">
    <div class="simple-block text-center">
        <g:render template="/file/imageByType" model="${[imgid: "userLogo${user?.id}", imgclass: "img-responsive rounded-x",iconclass:'icon-slg',  img:user?.imgDTO ]}" />
        <br>
        <g:if test="${canchangeavatar}">
            <a class="btn btn-primary" href="#" onclick="changeUserAvatar(${user?.id} )"> Change Avatar</a>
        </g:if>
        <h3> ${user?.name}</h3>
        <h3> <i class="fa fa-star"></i> <g:formatNumber number="${user?.raitings}" format="#.00"></g:formatNumber> </h3>
    </div>
</div>