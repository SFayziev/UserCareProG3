<g:if test="${userDTO?.imgDTO}">
    <g:link controller="user"  action="topics" id="${userDTO?.id}">
        %{--<g:render template="/file/imageByType" model="${[imgid: "userid${userDTO?.id}", imgclass: "avatar  rounded-x", iconclass: 'icon-sm', img:userDTO?.imgDTO]}" />--}%
        <img  id="${imgid}" data-placement="bottom"   data-trigger="hover"  tabindex="0" role="button" data-poload="/user/popoverinfo/${userDTO?.id}" class="avatar  rounded-x" src="${userDTO?.imgDTO?.svalue?.originalFilename}" alt="">
    </g:link>
</g:if>
<g:else>
    <a  href="#"> <asset:image src="noavatar.jpg" class="avatar  rounded-x"  /></a>
</g:else>