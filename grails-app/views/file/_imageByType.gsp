<g:if test="${img?.paramType==1}">
    <i id="${imgid}" class="icon-custom icon-bg-u ${iconclass} rounded-x  fa ${img.svalue}" style="background: ${img.ovalue} " > </i>
</g:if>
<g:elseif test="${img?.paramType==3}" >
    <img  id="${imgid}" class="${imgclass} " src="${img?.svalue?.originalFilename}" alt="">
</g:elseif>