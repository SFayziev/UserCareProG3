<div class="form-group">

    <label>Source</label>
    <select class="form-control"  id="id_select_forums" multiple="multiple">
        <g:each in="${forums}" var="forum">
            <option value="${forum.id}" data-content="<em class='fa fa-book'></em>"><g:message code="forum.type${forum.type.ordinal()}" /> : <locale:message  proj="${UCproject}" code="forum.title.${forum.id}" default="${forum.name}" /> </option>
        </g:each>
    </select>
</div>