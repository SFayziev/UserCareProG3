
<div class="search-block panel panel-default">
    %{--<div class="panel-heading">--}%

    %{--</div>--}%
    <div class="panel-body">
        <form class="navbar-form" role="search">
            <div class="form-group">
                <label>Email address</label>
                <input type="text" class="form-control" placeholder="Search">
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="text" class="form-control" placeholder="Search">
            </div>

            <div class="form-group">
                <label>Filter</label>
                <select id="id_select_view_shortcut" class="form-control singleselect" onchange="onChangeShortcut();">
                    <optgroup label="Default filters">
                        <option value="needs_review" label="Needs review <a class='dropdown-action-link' href='http://feedback.userecho.com/topic/677295-status-needs-review/' target='_blank' title='What does it mean?'><i class='fa fa-question-circle details'></i></a>">Needs review</option>
                        <option selected="selected" value="all">All</option>
                        <option value="opened">Opened</option>
                        <option value="assigned_to_me">Assigned to me</option>
                        <option value="opened_and_assigned_to_me">Opened and assigned to me</option>
                        <option value="moderation">On moderation</option>
                    </optgroup>
                    <optgroup label="Additional filters">
                        <option value="custom" label="Configure <span class='dropdown-action-link'><i class='fa fa-gears'></i></span>">Configure</option>

                    </optgroup>
                </select>
                %{--<div class="btn-group"><button title="All" type="button" class="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown"><div style="margin-right:10px">All <b class="caret"></b></div></button><ul style="max-height: 281px; overflow-y: auto; overflow-x: hidden;" class="multiselect-container dropdown-menu"><li><label class="multiselect-group">Default filters</label></li><li><a href="javascript:void(0);"><label class="radio"><input style="display: none;" value="needs_review" type="radio"> Needs review <a class="dropdown-action-link" href="http://feedback.userecho.com/topic/677295-status-needs-review/" target="_blank" title="What does it mean?"><i class="fa fa-question-circle details"></i></a></label></a></li><li class="active"><a href="javascript:void(0);"><label class="radio"><input style="display: none;" value="all" type="radio"> All</label></a></li><li><a href="javascript:void(0);"><label class="radio"><input style="display: none;" value="opened" type="radio"> Opened</label></a></li><li><a href="javascript:void(0);"><label class="radio"><input style="display: none;" value="assigned_to_me" type="radio"> Assigned to me</label></a></li><li><a href="javascript:void(0);"><label class="radio"><input style="display: none;" value="opened_and_assigned_to_me" type="radio"> Opened and assigned to me</label></a></li><li><a href="javascript:void(0);"><label class="radio"><input style="display: none;" value="moderation" type="radio"> On moderation</label></a></li><li><label class="multiselect-group">Additional filters</label></li><li><a href="javascript:void(0);"><label class="radio"><input style="display: none;" value="custom" type="radio"> Configure <span class="dropdown-action-link"><i class="fa fa-gears"></i></span></label></a></li></ul></div>--}%

            </div>

            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
</div>