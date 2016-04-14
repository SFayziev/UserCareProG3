<g:if test="${customize}">
    ${module?.params?.scriptcode?.value.encodeAsRaw()}
</g:if>
<g:else>
    ${module?.params?.scriptcode?.value}
</g:else>
