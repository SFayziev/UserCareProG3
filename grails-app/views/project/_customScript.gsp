<g:if test="${customize}">
    ${module?.params?.scriptcode?.value}
</g:if>
<g:else>
    ${module?.params?.scriptcode?.value.encodeAsRaw()}
</g:else>
