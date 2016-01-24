<g:if test="${flash.message}">
<div class="alert alert-warning fade in alert-dismissable">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <strong>Warning!</strong> <g:message code="${flash.message}" />
</div>
</g:if>

<g:if test="${flash.error}">
    <script language="JavaScript">
        $(document).ready(function() { showMassge('${flash.error}') });
    </script>
</g:if>