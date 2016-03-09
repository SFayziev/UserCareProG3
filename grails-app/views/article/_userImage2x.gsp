<g:if test="${userDTO?.imgDTO}">
    <g:link controller="user" data-placement="bottom"  class="pull-left avatar2x" data-trigger="hover"  tabindex="0" role="button" data-poload="/user/popoverinfo/${userDTO?.id}" action="topics" id="${userDTO?.id}">
        <g:render template="/article/imageByType" model="${[imgid: "userid${userDTO?.id}", imgclass: "avatar2x media-object img-bordered  rounded-x", iconclass: 'icon-sm', img:userDTO?.imgDTO]}" />
    </g:link>
</g:if>
<g:else>
    <a class="pull-left avatar2x" href="#"> <asset:image src="noavatar.jpg" class="avatar media-object img-bordered  rounded-x"  /></a>
</g:else>