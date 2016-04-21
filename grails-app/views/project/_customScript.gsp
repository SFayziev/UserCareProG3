<g:if test="${customize}">
    <pre>${module?.params?.scriptcode?.value}</pre>
</g:if>
<g:else>
    ${module?.params?.scriptcode?.value.encodeAsRaw()}
</g:else>
