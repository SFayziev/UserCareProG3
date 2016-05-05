<div class="form-group">
    <label >Filter</label>
    <div class="btn-group">
        <select id="filterid" class="form-control singleselect" onchange="onChangeFilter(16);">
            <optgroup label="Default filters">
                <g:each in="${filters}" var="filter">
                    <g:if test="${filter.projid==0}">
                        <option value="${filter.value}" >${filter.filtername}</option>
                    </g:if>
                </g:each>
                    %{--<option value="needs_review" >Needs review</option>--}%
                %{--<option selected="selected" value="all">All</option>--}%
                %{--<option value="opened">Opened</option>--}%
                %{--<option value="assigned_to_me">Assigned to me</option>--}%
                %{--<option value="opened_and_assigned_to_me">Opened and assigned to me</option>--}%
                %{--<option value="moderation">On moderation</option>--}%
            </optgroup>
            <optgroup label="Additional filters">
                <option value="custom" label="Configure <span class='dropdown-action-link'><i class='fa fa-gears'></i></span>">Configure</option>
                <g:each in="${filters}" var="filter">
                    <g:if test="${filter.projid!=0}">
                        <option value="agetn-${filter.id}" >${filter.filtername}</option>
                    </g:if>
                </g:each>

            </optgroup>
        </select>
    </div>
</div>