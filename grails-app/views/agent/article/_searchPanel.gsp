
<div class="search-block panel panel-default">
    %{--<div class="panel-heading">--}%

    %{--</div>--}%
    <div class="panel-body">
        <form class="navbar-form" role="search">
            <div class="form-group">
                <label >Filter</label>
                <div class="btn-group">
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
                </div>
            </div>

            <agent:forumList params="${[project:UCproject,  params:params]}"/>
            <agent:sortBy params="${[project:UCproject,  params:params]}"/>


            <div class="form-group">
                <label>Search</label>
                <div class="btn-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-search"></i></div>
                        <input class="form-control add-clear-button" id="id_input_search" placeholder="Search text or ticket ID" value="" type="text">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>&nbsp;</label>
                <div class="btn-group">
                    <button id="id_button_update" type="submit" class="form-control btn btn-primary" onclick="getArticleList(16,0,0,0 );return false;"><i class="fa fa-refresh"></i> Refresh</button>
                </div>
            </div>

        </form>
    </div>
</div>




<!-- Initialize the plugin: -->
<script type="text/javascript">
    $(document).ready(function() {
        $('#id_select_forums').multiselect();
        getArticleList(16,0,0,0 );
    });
</script>

