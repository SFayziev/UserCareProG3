<div class="col-sm-3 col-md-2 col-lg-2 col-xs-4">
    <div id="useravatar" data-userid="2">
        <div class="simple-block text-center">
            <g:render template="/file/imageByType" model="${[imgid: "userid${userDTO?.id}", imgclass: "media-object img-bordered  rounded-x", iconclass: 'icon-sm', img:userDTO?.imgDTO]}" />
            <br>
             <h4><g:link controller="user" action="topics" id="${userDTO.id}">${userDTO?.name}</g:link> </h4>
        </div>
    </div>
</div>