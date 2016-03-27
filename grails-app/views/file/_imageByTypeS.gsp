<g:if test="${img?.paramType==1}">
    <i id="${imgid}" class=" fa ${img.svalue}"  style="color: ${img.ovalue}" > </i>
</g:if>
<g:elseif test="${img?.paramType==3}" >
    <img  id="${imgid}" style="width:14px;height:9px;" height="9" width="14"  src="${img?.svalue?.originalFilename}" >
</g:elseif>
